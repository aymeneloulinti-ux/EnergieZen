import prisma from "../config/prisma.js";

export const createAppointment = async ({
    clientId,
    practitionerId,
    serviceId,
    startAt
}) => {

    // 1. Vérifier que le service existe
    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service || !service.active) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    // 2. Vérifier que le praticien existe
    const practitioner = await prisma.practitioner.findUnique({
        where: {
            id: practitionerId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    // 3. Vérifier que le client existe
    const client = await prisma.user.findUnique({
        where: {
            id: clientId
        }
    });

    if (!client) {
        throw new Error("CLIENT_NOT_FOUND");
    }

    // 4. Calculer la fin du rendez-vous
    const start = new Date(startAt);

    const end = new Date(
        start.getTime() + service.duration * 60 * 1000
    );

    // 5. Vérifier les chevauchements
    const existingAppointment = await prisma.appointment.findFirst({
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

    // 6. Créer le rendez-vous
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