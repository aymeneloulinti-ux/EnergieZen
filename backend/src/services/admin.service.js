import prisma from "../config/prisma.js";
import { getAvailableSlots } from "./availability.service.js";
import { APP_TIMEZONE } from "../utils/date.js";
import { formatInTimeZone } from "date-fns-tz";

const adminAppointmentInclude = {
    client: {
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            role: true
        }
    },
    practitioner: {
        select: {
            id: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    role: true
                }
            }
        }
    },
    service: true
};

export const getDashboardStats = async () => {

    const [
        totalUsers,
        clients,
        practitioners,
        admins,

        totalServices,
        activeServices,

        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        noShowAppointments
    ] = await Promise.all([

        // --------------------
        // Users
        // --------------------

        prisma.user.count(),

        prisma.user.count({
            where: {
                role: "CLIENT"
            }
        }),

        prisma.user.count({
            where: {
                role: "PRACTITIONER"
            }
        }),

        prisma.user.count({
            where: {
                role: "ADMIN"
            }
        }),


        // --------------------
        // Services
        // --------------------

        prisma.service.count(),

        prisma.service.count({
            where: {
                active: true
            }
        }),


        // --------------------
        // Appointments
        // --------------------

        prisma.appointment.count(),

        prisma.appointment.count({
            where: {
                status: "PENDING"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "CONFIRMED"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "COMPLETED"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "CANCELLED"
            }
        }),

        prisma.appointment.count({
            where: {
                status: "NO_SHOW"
            }
        })
    ]);


    return {

        users: {
            total: totalUsers,
            clients,
            practitioners,
            admins
        },

        services: {
            total: totalServices,
            active: activeServices
        },

        appointments: {
            total: totalAppointments,
            pending: pendingAppointments,
            confirmed: confirmedAppointments,
            completed: completedAppointments,
            cancelled: cancelledAppointments,
            noShow: noShowAppointments
        }
    };
};

const adminUserSelect = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    role: true,
    active: true,
    createdAt: true,
    updatedAt: true
};

export const getAdminClients = async () => {
    return prisma.user.findMany({
        where: {
            role: "CLIENT"
        },
        select: adminUserSelect,
        orderBy: [
            { lastName: "asc" },
            { firstName: "asc" }
        ]
    });
};

export const getAdminPractitioners = async () => {
    return prisma.practitioner.findMany({
        where: {
            user: {
                role: "PRACTITIONER"
            }
        },
        select: {
            id: true,
            user: {
                select: adminUserSelect
            },
            services: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    description: true,
                    imageUrl: true,
                    benefits: true,
                    steps: true,
                    faq: true,
                    duration: true,
                    price: true,
                    active: true,
                    createdAt: true,
                    updatedAt: true
                },
                orderBy: {
                    name: "asc"
                }
            }
        },
        orderBy: {
            user: {
                lastName: "asc"
            }
        }
    });
};

export const getAdminAppointments = async ({
    status,
    practitionerId,
    from,
    to,
    includeCancelled = true
} = {}) => {
    const where = {
        ...(status
            ? { status }
            : !includeCancelled
                ? { status: { not: "CANCELLED" } }
                : {}),
        ...(practitionerId && { practitionerId }),
        ...((from || to) && {
            startAt: {
                ...(from && { gte: new Date(from) }),
                ...(to && { lte: new Date(to) })
            }
        })
    };

    return prisma.appointment.findMany({
        where,
        include: adminAppointmentInclude,
        orderBy: {
            startAt: "asc"
        }
    });
};

export const moveAdminAppointment = async ({
    appointmentId,
    startAt
}) => {
    if (!startAt) {
        throw new Error("START_AT_REQUIRED");
    }

    const start = new Date(startAt);
    if (Number.isNaN(start.getTime())) {
        throw new Error("INVALID_START_AT");
    }

    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: { service: true }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    if (!["PENDING", "CONFIRMED"].includes(appointment.status)) {
        throw new Error("APPOINTMENT_CANNOT_BE_UPDATED");
    }

    const currentLocalDate = formatInTimeZone(new Date(), APP_TIMEZONE, "yyyy-MM-dd");
    const currentLocalTime = formatInTimeZone(new Date(), APP_TIMEZONE, "HH:mm");
    const targetLocalDate = formatInTimeZone(start, APP_TIMEZONE, "yyyy-MM-dd");
    const targetLocalTime = formatInTimeZone(start, APP_TIMEZONE, "HH:mm");

    if (targetLocalDate < currentLocalDate) {
        throw new Error("PAST_DATE");
    }

    if (targetLocalDate === currentLocalDate && targetLocalTime <= currentLocalTime) {
        throw new Error("PAST_TIME");
    }

    const end = new Date(start.getTime() + appointment.service.duration * 60 * 1000);
    const availableSlots = await getAvailableSlots({
        practitionerId: appointment.practitionerId,
        serviceId: appointment.serviceId,
        date: targetLocalDate
    });

    const matchingSlot = availableSlots.find((slot) =>
        slot.state === "available" &&
        slot.startAt.getTime() === start.getTime() &&
        slot.endAt.getTime() === end.getTime()
    );

    if (!matchingSlot) {
        throw new Error("TIME_SLOT_UNAVAILABLE");
    }

    const overlappingAppointment = await prisma.appointment.findFirst({
        where: {
            practitionerId: appointment.practitionerId,
            status: { not: "CANCELLED" },
            id: { not: appointmentId },
            startAt: { lt: end },
            endAt: { gt: start }
        }
    });

    if (overlappingAppointment) {
        throw new Error("TIME_SLOT_UNAVAILABLE");
    }

    return prisma.appointment.update({
        where: { id: appointmentId },
        data: { startAt: start, endAt: end },
        include: adminAppointmentInclude
    });
};

export const deleteAdminAppointment = async (appointmentId) => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        select: { id: true, status: true }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    if (appointment.status !== "CANCELLED") {
        throw new Error("APPOINTMENT_NOT_CANCELLED");
    }

    await prisma.appointment.delete({
        where: { id: appointmentId }
    });
};

export const updateAdminAppointmentStatus = async ({
    appointmentId,
    status,
    cancellationReason
}) => {
    const allowedStatuses = ["CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"];

    if (!allowedStatuses.includes(status)) {
        throw new Error("INVALID_STATUS");
    }

    const appointment = await prisma.appointment.findUnique({
        where: {
            id: appointmentId
        }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    const validTransition =
        (status === "CONFIRMED" && appointment.status === "PENDING") ||
        (status === "CANCELLED" && ["PENDING", "CONFIRMED"].includes(appointment.status)) ||
        (status === "COMPLETED" && appointment.status === "CONFIRMED") ||
        (status === "NO_SHOW" && appointment.status === "CONFIRMED");

    if (!validTransition) {
        throw new Error("INVALID_APPOINTMENT_STATUS");
    }

    return prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status,
            ...(status === "CANCELLED" && {
                cancellationReason: cancellationReason || null
            })
        },
        include: adminAppointmentInclude
    });
};