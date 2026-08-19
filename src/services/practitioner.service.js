import prisma from "../config/prisma.js";

const practitionerUserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    phone: true
};

const serviceSelect = {
    id: true,
    name: true,
    slug: true,
    description: true,
    duration: true,
    price: true
};


// ============================================================
// GET ALL PRACTITIONERS
// ============================================================

export const getAllPractitioners = async () => {

    return prisma.practitioner.findMany({
        where: {
            user: {
                active: true,
                role: "PRACTITIONER"
            }
        },

        select: {
            id: true,

            user: {
                select: practitionerUserSelect
            },

            services: {
                where: {
                    active: true
                },
                select: serviceSelect,
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


// ============================================================
// GET PRACTITIONER BY ID
// ============================================================

export const getPractitionerById = async (practitionerId) => {

    const practitioner = await prisma.practitioner.findUnique({

        where: {
            id: practitionerId
        },

        select: {
            id: true,

            user: {
                select: practitionerUserSelect
            },

            services: {
                where: {
                    active: true
                },
                select: serviceSelect,
                orderBy: {
                    name: "asc"
                }
            }
        }
    });

    if (
        !practitioner ||
        !practitioner.user
    ) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    if (
        !practitioner.user
    ) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    return practitioner;
};


export const addServiceToPractitioner = async ({
    practitionerId,
    serviceId
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            id: practitionerId
        },
        include: {
            user: true
        }
    });

    if (
        !practitioner ||
        !practitioner.user ||
        !practitioner.user.active ||
        practitioner.user.role !== "PRACTITIONER"
    ) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    if (!service.active) {
        throw new Error("SERVICE_INACTIVE");
    }

    const alreadyAssociated =
        await prisma.practitioner.findFirst({
            where: {
                id: practitionerId,
                services: {
                    some: {
                        id: serviceId
                    }
                }
            }
        });

    if (alreadyAssociated) {
        throw new Error("SERVICE_ALREADY_ASSOCIATED");
    }

    return prisma.practitioner.update({
        where: {
            id: practitionerId
        },
        data: {
            services: {
                connect: {
                    id: serviceId
                }
            }
        },

        select: {
            id: true,

            user: {
                select: practitionerUserSelect
            },

            services: {
                where: {
                    active: true
                },
                select: serviceSelect,
                orderBy: {
                    name: "asc"
                }
            }
        }
    });
};


export const removeServiceFromPractitioner = async ({
    practitionerId,
    serviceId
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            id: practitionerId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    const associated =
        await prisma.practitioner.findFirst({
            where: {
                id: practitionerId,
                services: {
                    some: {
                        id: serviceId
                    }
                }
            }
        });

    if (!associated) {
        throw new Error("SERVICE_NOT_ASSOCIATED");
    }

    return prisma.practitioner.update({
        where: {
            id: practitionerId
        },
        data: {
            services: {
                disconnect: {
                    id: serviceId
                }
            }
        },

        select: {
            id: true,

            user: {
                select: practitionerUserSelect
            },

            services: {
                where: {
                    active: true
                },
                select: serviceSelect,
                orderBy: {
                    name: "asc"
                }
            }
        }
    });
};