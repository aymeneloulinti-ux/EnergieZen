import prisma from "../config/prisma.js";

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
    to
} = {}) => {
    const where = {
        ...(status && { status }),
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