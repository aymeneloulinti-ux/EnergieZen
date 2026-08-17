import prisma from "../config/prisma.js";

export const createAvailabilityException = async ({
    userId,
    date,
    type,
    startTime,
    endTime,
    reason
}) => {

    // Vérifier le praticien
    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    const practitionerId = practitioner.id;

    // Validation du type
    if (!["CLOSED", "CUSTOM_HOURS"].includes(type)) {
        throw new Error("INVALID_EXCEPTION_TYPE");
    }

    // Une fermeture n'a pas besoin d'horaires
    if (type === "CLOSED") {
        startTime = null;
        endTime = null;
    }

    // Des horaires personnalisés sont obligatoires
    if (type === "CUSTOM_HOURS") {

        if (!startTime || !endTime) {
            throw new Error("INVALID_CUSTOM_HOURS");
        }

        if (startTime >= endTime) {
            throw new Error("INVALID_TIME_RANGE");
        }
    }

    // Vérifier qu'il n'existe pas déjà une exception ce jour-là
    const existingException =
        await prisma.availabilityException.findFirst({
            where: {
                practitionerId,
                date: new Date(date)
            }
        });

    if (existingException) {
        throw new Error("EXCEPTION_ALREADY_EXISTS");
    }

    return prisma.availabilityException.create({
        data: {
            practitionerId,
            date: new Date(date),
            type,
            startTime,
            endTime,
            reason
        }
    });
};


export const getAvailabilityExceptions = async ({
    practitionerId,
    from,
    to
}) => {

    return prisma.availabilityException.findMany({
        where: {
            practitionerId,

            ...(from && {
                date: {
                    gte: new Date(from)
                }
            }),

            ...(to && {
                date: {
                    ...(from
                        ? {
                            lte: new Date(to)
                        }
                        : {
                            lte: new Date(to)
                        })
                }
            })
        },

        orderBy: {
            date: "asc"
        }
    });
};


export const deleteAvailabilityException = async ({
    practitionerId,
    id
}) => {

    const exception =
        await prisma.availabilityException.findFirst({
            where: {
                id,
                practitionerId
            }
        });

    if (!exception) {
        throw new Error("EXCEPTION_NOT_FOUND");
    }

    return prisma.availabilityException.delete({
        where: {
            id
        }
    });
};