import prisma from "../config/prisma.js";

const serviceSelect = {
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
};


// ============================================================
// GET ALL
// ============================================================

export const getAllServices = async ({
    includeInactive = false
} = {}) => {

    return prisma.service.findMany({
        where: includeInactive
            ? {}
            : {
                active: true
            },
        select: serviceSelect,
        orderBy: {
            name: "asc"
        }
    });
};


// ============================================================
// GET BY ID
// ============================================================

export const getServiceById = async (serviceId) => {

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        },
        select: serviceSelect
    });

    if (!service) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    return service;
};


// ============================================================
// GET BY SLUG
// ============================================================

export const getServiceBySlug = async (slug) => {

    const service = await prisma.service.findUnique({
        where: {
            slug
        },
        select: serviceSelect
    });

    if (!service) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    return service;
};


// ============================================================
// CREATE
// ============================================================

export const createService = async ({
    name,
    slug,
    description,
    imageUrl,
    benefits,
    steps,
    faq,
    duration,
    price
}) => {

    if (!name || !slug) {
        throw new Error("NAME_AND_SLUG_REQUIRED");
    }

    if (
        !Number.isInteger(duration) ||
        duration <= 0
    ) {
        throw new Error("INVALID_DURATION");
    }

    if (
        price === undefined ||
        price === null ||
        Number(price) < 0
    ) {
        throw new Error("INVALID_PRICE");
    }

    const existingService = await prisma.service.findUnique({
        where: {
            slug
        }
    });

    if (existingService) {
        throw new Error("SLUG_ALREADY_EXISTS");
    }

    return prisma.service.create({
        data: {
            name,
            slug,
            description: description || null,
            imageUrl: imageUrl || null,
            benefits: benefits || [],
            steps: steps || [],
            faq: faq || [],
            duration,
            price
        },
        select: serviceSelect
    });
};


// ============================================================
// UPDATE
// ============================================================

export const updateService = async ({
    serviceId,
    name,
    slug,
    description,
    imageUrl,
    benefits,
    steps,
    faq,
    duration,
    price
}) => {

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    if (slug && slug !== service.slug) {

        const existingService = await prisma.service.findUnique({
            where: {
                slug
            }
        });

        if (existingService) {
            throw new Error("SLUG_ALREADY_EXISTS");
        }
    }

    if (
        duration !== undefined &&
        (
            !Number.isInteger(duration) ||
            duration <= 0
        )
    ) {
        throw new Error("INVALID_DURATION");
    }

    if (
        price !== undefined &&
        (
            price === null ||
            Number(price) < 0
        )
    ) {
        throw new Error("INVALID_PRICE");
    }

    return prisma.service.update({
        where: {
            id: serviceId
        },
        data: {
            ...(name !== undefined && {
                name
            }),
            ...(slug !== undefined && {
                slug
            }),
            ...(description !== undefined && {
                description
            }),
            ...(imageUrl !== undefined && {
                imageUrl
            }),
            ...(benefits !== undefined && {
                benefits
            }),
            ...(steps !== undefined && {
                steps
            }),
            ...(faq !== undefined && {
                faq
            }),
            ...(duration !== undefined && {
                duration
            }),
            ...(price !== undefined && {
                price
            })
        },
        select: serviceSelect
    });
};


// ============================================================
// UPDATE STATUS
// ============================================================

export const updateServiceStatus = async ({
    serviceId,
    active
}) => {

    if (typeof active !== "boolean") {
        throw new Error("INVALID_STATUS");
    }

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    return prisma.service.update({
        where: {
            id: serviceId
        },
        data: {
            active
        },
        select: serviceSelect
    });
};