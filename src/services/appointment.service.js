import prisma from "../config/prisma.js";
import { getAvailableSlots } from "./availability.service.js";

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

    const localDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Brussels"
    }).format(start);

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
        include: {
            client: true,
            practitioner: true,
            service: true
        }
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

        include: {

            practitioner: {

                include: {

                    user: true

                }

            },

            service: true

        }

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
        include: {
            client: true,
            practitioner: true,
            service: true
        }
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
        include: {
            client: true,
            practitioner: {
                include: {
                    user: true
                }
            },
            service: true
        }
    });

    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }

    return appointment;
};