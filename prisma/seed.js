import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("🌱 Seeding database...");

    // --------------------
    // Admin
    // --------------------

    const adminPassword = await bcrypt.hash(
        "Admin123!",
        12
    );

    await prisma.user.upsert({
        where: {
            email: "admin@energiezen.be"
        },
        update: {
            firstName: "Admin",
            lastName: "EnergieZen",
            phone: "+32 470 00 00 00",
            role: "ADMIN",
            password: adminPassword,
        },
        create: {
            email: "admin@energiezen.be",
            password: adminPassword,
            firstName: "Admin",
            lastName: "EnergieZen",
            phone: "+32 470 00 00 00",
            role: "ADMIN",
        },
    });

    // --------------------
    // Practitioner
    // --------------------

    const practitionerPassword = await bcrypt.hash(
        "ChangeMoi123!",
        12
    );

    const user = await prisma.user.upsert({
        where: {
            email: "maman@energiezen.be",
        },

        update: {
            firstName: "Hassna",
            lastName: "R'houni",
            phone: "+32 470 00 00 00",
            role: "PRACTITIONER",
            password: practitionerPassword,
        },

        create: {
            email: "maman@energiezen.be",
            password: practitionerPassword,
            firstName: "Hassna",
            lastName: "R'houni",
            phone: "+32 470 00 00 00",
            role: "PRACTITIONER",
        },
    });

    const practitioner = await prisma.practitioner.upsert({
        where: {
            userId: user.id,
        },
        update: {},
        create: {
            userId: user.id,
        },
    });

    const weeklyAvailabilities = [
        // Lundi
        {
            dayOfWeek: "MONDAY",
            startTime: "09:00",
            endTime: "12:00",
        },
        {
            dayOfWeek: "MONDAY",
            startTime: "14:00",
            endTime: "18:00",
        },

        // Mardi
        {
            dayOfWeek: "TUESDAY",
            startTime: "09:00",
            endTime: "12:00",
        },
        {
            dayOfWeek: "TUESDAY",
            startTime: "14:00",
            endTime: "18:00",
        },

        // Jeudi
        {
            dayOfWeek: "THURSDAY",
            startTime: "09:00",
            endTime: "12:00",
        },
        {
            dayOfWeek: "THURSDAY",
            startTime: "14:00",
            endTime: "19:00",
        },

        // Vendredi
        {
            dayOfWeek: "FRIDAY",
            startTime: "09:00",
            endTime: "16:00",
        },
    ];

    await prisma.weeklyAvailability.deleteMany({
        where: {
            practitionerId: practitioner.id,
        },
    });

    for (const availability of weeklyAvailabilities) {
        await prisma.weeklyAvailability.create({
            data: {
                practitionerId: practitioner.id,
                ...availability,
            },
        });
    }

    // --------------------
    // Services
    // --------------------
    const clientPassword = await bcrypt.hash(
        "Client123!",
        12
    );

    const client = await prisma.user.upsert({
        where: {
            email: "client@test.be"
        },
        update: {
            password: clientPassword,
        },
        create: {
            email: "client@test.be",
            password: clientPassword,
            firstName: "Jean",
            lastName: "Dupont",
            phone: "+32 470 11 22 33",
            role: "CLIENT"
        }
    });

    // --------------------
    // Services
    // --------------------

    const services = [
        {
            name: "Séance découverte",
            slug: "seance-decouverte",
            description:
                "Une première séance pour découvrir les soins énergétiques.",
            duration: 30,
            price: 35,
        },
        {
            name: "Soin énergétique",
            slug: "soin-energetique",
            description:
                "Une séance complète de soin énergétique.",
            duration: 60,
            price: 60,
        },
        {
            name: "Rééquilibrage énergétique",
            slug: "reequilibrage-energetique",
            description:
                "Une séance approfondie de rééquilibrage énergétique.",
            duration: 90,
            price: 90,
        },
    ];

    for (const serviceData of services) {
        await prisma.service.upsert({
            where: {
                slug: serviceData.slug,
            },
            update: serviceData,
            create: {
                ...serviceData,
                practitioners: {
                    connect: {
                        id: practitioner.id,
                    },
                },
            },
        });
    }

    console.log("✅ Database seeded!");
}

main()
    .catch((error) => {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });