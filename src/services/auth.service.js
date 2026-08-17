import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";

export const register = async ({
    email,
    password,
    firstName,
    lastName,
    phone,
    role = "CLIENT"
}) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            role
        }
    });

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role
        },
        token
    };
};


export const login = async ({
    email,
    password
}) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user || !user.password) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const passwordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordValid) {
        throw new Error("INVALID_CREDENTIALS");
    }

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role
        },
        token
    };
};