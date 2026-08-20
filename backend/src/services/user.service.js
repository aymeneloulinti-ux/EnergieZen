import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

const userSelect = {
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

export const getMyProfile = async (userId) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: userSelect
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user;
};


export const updateMyProfile = async ({
    userId,
    firstName,
    lastName,
    phone
}) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            firstName,
            lastName,
            phone
        },
        select: userSelect
    });
};

export const changePassword = async ({
    userId,
    currentPassword,
    newPassword
}) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    if (!currentPassword || !newPassword) {
        throw new Error("PASSWORD_REQUIRED");
    }

    const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isCurrentPasswordValid) {
        throw new Error("INVALID_CURRENT_PASSWORD");
    }

    if (newPassword.length < 8) {
        throw new Error("WEAK_PASSWORD");
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        12
    );

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: hashedPassword
        }
    });

    return {
        success: true
    };
};



export const getUsers = async () => {

    return prisma.user.findMany({
        select: userSelect,
        orderBy: {
            createdAt: "desc"
        }
    });
};


export const getUserById = async (userId) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: userSelect
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user;
};


export const updateUser = async ({
    userId,
    email,
    firstName,
    lastName,
    phone
}) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // Vérifier que le nouvel email n'est pas déjà utilisé
    if (email && email !== user.email) {

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
    }

    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...(email !== undefined && {
                email
            }),
            ...(firstName !== undefined && {
                firstName
            }),
            ...(lastName !== undefined && {
                lastName
            }),
            ...(phone !== undefined && {
                phone
            })
        },
        select: userSelect
    });
};

export const updateUserRole = async ({
    userId,
    role
}) => {

    const allowedRoles = [
        "CLIENT",
        "PRACTITIONER",
        "ADMIN"
    ];

    if (!allowedRoles.includes(role)) {
        throw new Error("INVALID_ROLE");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    if (user.role === role) {
        return prisma.user.findUnique({
            where: {
                id: userId
            },
            select: userSelect
        });
    }

    return prisma.$transaction(async (tx) => {

        // CLIENT → PRACTITIONER
        if (
            role === "PRACTITIONER" &&
            user.role !== "PRACTITIONER"
        ) {

            await tx.practitioner.upsert({
                where: {
                    userId
                },
                update: {},
                create: {
                    userId
                }
            });
        }

        // PRACTITIONER → CLIENT / ADMIN
        if (
            user.role === "PRACTITIONER" &&
            role !== "PRACTITIONER"
        ) {

            await tx.practitioner.deleteMany({
                where: {
                    userId
                }
            });
        }

        const updatedUser = await tx.user.update({
            where: {
                id: userId
            },
            data: {
                role
            },
            select: userSelect
        });

        return updatedUser;
    });
};

export const updateUserStatus = async ({
    userId,
    active
}) => {

    if (typeof active !== "boolean") {
        throw new Error("INVALID_STATUS");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            active
        },
        select: userSelect
    });
};