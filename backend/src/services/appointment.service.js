import prisma from "../config/prisma.js";
import { getAvailableSlots } from "./availability.service.js";
import { APP_TIMEZONE } from "../utils/date.js";
import { formatInTimeZone } from "date-fns-tz";

export const createAppointment = async ({
    clientId,
    practitionerId,
    serviceId,
    startAt
}) => {

    // ============================================================
    // 1. Validation de startAt
    // ============================================================

    if (!startAt) {
        throw new Error("START_AT_REQUIRED");
    }

    const start = new Date(startAt);

    if (Number.isNaN(start.getTime())) {
        throw new Error("INVALID_START_AT");
    }

    // ============================================================
    // 1b. Validation de date passée
    // ============================================================

    const currentLocalDate = formatInTimeZone(new Date(), APP_TIMEZONE, "yyyy-MM-dd");
    const currentLocalTime = formatInTimeZone(new Date(), APP_TIMEZONE, "HH:mm");
    const appointmentLocalDate = formatInTimeZone(start, APP_TIMEZONE, "yyyy-MM-dd");
    const appointmentLocalTime = formatInTimeZone(start, APP_TIMEZONE, "HH:mm");

    if (appointmentLocalDate < currentLocalDate) {
        throw new Error("PAST_DATE");
    }

    if (appointmentLocalDate === currentLocalDate && appointmentLocalTime < currentLocalTime) {
        throw new Error("PAST_TIME");
    }

    // ============================================================
    // 2. Vérifier le service
    // ============================================================

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service || !service.active) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    // ============================================================
    // 3. Vérifier le praticien
    // ============================================================

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            id: practitionerId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    // ============================================================
    // 4. Vérifier le client
    // ============================================================

    const client = await prisma.user.findUnique({
        where: {
            id: clientId
        }
    });

    if (!client) {
        throw new Error("CLIENT_NOT_FOUND");
    }

    // ============================================================
    // 5. Calculer la fin du rendez-vous
    // ============================================================

    const end = new Date(
        start.getTime() + service.duration * 60 * 1000
    );

    // ============================================================
    // 6. Déterminer la date locale
    // ============================================================

    const localDate = appointmentLocalDate;

    // ============================================================
    // 7. Vérifier que le créneau est réellement disponible
    // ============================================================

    const availableSlots = await getAvailableSlots({
        practitionerId,
        serviceId,
        date: localDate
    });

    const matchingSlot = availableSlots.find((slot) => {

        return (
            slot.state === "available" &&
            slot.startAt.getTime() === start.getTime() &&
            slot.endAt.getTime() === end.getTime()
        );

    });

    if (!matchingSlot) {
        throw new Error("TIME_SLOT_UNAVAILABLE");
    }

    // ============================================================
    // 8. Double vérification des chevauchements
    // ============================================================

    const existingAppointment =
        await prisma.appointment.findFirst({
            where: {
                practitionerId,
                status: {
                    not: "CANCELLED"
                },
                startAt: {
                    lt: end
                },
                endAt: {
                    gt: start
                }
            }
        });

    if (existingAppointment) {
        throw new Error("TIME_SLOT_UNAVAILABLE");
    }

    // ============================================================
    // 9. Création du rendez-vous
    // ============================================================

    return prisma.appointment.create({
        data: {
            clientId,
            practitionerId,
            serviceId,
            startAt: start,
            endAt: end,
            status: "PENDING"
        },
        include: appointmentInclude
    });
};


export const getClientAppointments = async (clientId) => {

    return prisma.appointment.findMany({
        where: {
            clientId
        },
        orderBy: {
            startAt: "asc"
        },
        include: appointmentInclude
    });
};


export const cancelAppointment = async ({
    clientId,
    appointmentId,
    cancellationReason
}) => {

    // 1. Vérifier que le rendez-vous appartient au client
    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            clientId
        }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    // 2. Vérifier le statut actuel
    if (
        appointment.status !== "PENDING" &&
        appointment.status !== "CONFIRMED"
    ) {
        throw new Error("APPOINTMENT_CANNOT_BE_CANCELLED");
    }

    // 3. Annuler le rendez-vous
    return prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "CANCELLED",
            cancellationReason: cancellationReason || null
        },
        include: appointmentInclude
    });
};

export const getAppointmentById = async ({
    appointmentId,
    clientId
}) => {

    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            clientId
        },
        include: appointmentInclude
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    return appointment;
};


export const getPractitionerAppointments = async ({
    userId
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    return prisma.appointment.findMany({
        where: {
            practitionerId: practitioner.id
        },
        include: appointmentInclude,
        orderBy: {
            startAt: "asc"
        }
    });
};


export const confirmAppointment = async ({
    userId,
    appointmentId
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            practitionerId: practitioner.id
        }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    if (appointment.status !== "PENDING") {
        throw new Error("INVALID_APPOINTMENT_STATUS");
    }

    return prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "CONFIRMED"
        },
        include: appointmentInclude
    });
};

export const cancelAppointmentByPractitioner = async ({
    userId,
    appointmentId,
    cancellationReason
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            practitionerId: practitioner.id
        }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    if (
        appointment.status === "CANCELLED" ||
        appointment.status === "COMPLETED"
    ) {
        throw new Error("INVALID_APPOINTMENT_STATUS");
    }

    if (!cancellationReason) {
        throw new Error("CANCELLATION_REASON_REQUIRED");
    }

    return prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "CANCELLED",
            cancellationReason
        },
        include: appointmentInclude
    });
};


export const completeAppointment = async ({
    userId,
    appointmentId
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            practitionerId: practitioner.id
        }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    if (appointment.status !== "CONFIRMED") {
        throw new Error("INVALID_APPOINTMENT_STATUS");
    }

    return prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "COMPLETED"
        },
        include: appointmentInclude
    });
};


export const markAppointmentAsNoShow = async ({
    userId,
    appointmentId
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            practitionerId: practitioner.id
        }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    if (appointment.status !== "CONFIRMED") {
        throw new Error("INVALID_APPOINTMENT_STATUS");
    }

    return prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "NO_SHOW"
        },
        include: appointmentInclude
    });
};





// CONSTANTE PRISMA
const appointmentInclude = {
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
            createdAt: true,
            updatedAt: true,
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