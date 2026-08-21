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
            imageUrl: "/uploads/services/service-relaxation.jpg",
            benefits: [
                "Faire redescendre la pression rapidement",
                "Apprendre deux ou trois respirations simples",
                "Découvrir le cabinet en douceur",
                "S'offrir une pause réelle en milieu de semaine",
            ],
            steps: [
                "Installation : cinq minutes pour vous installer et déposer votre journée.",
                "Relaxation guidée : trente-cinq minutes de respiration guidée et de relâchement progressif.",
                "Départ : cinq minutes pour reprendre pied, à votre rythme.",
            ],
            faq: [
                { q: "C'est ma première fois, est-ce adapté ?", a: "Oui, c'est la séance que je conseille le plus souvent pour une découverte." },
                { q: "Puis-je venir sur ma pause déjeuner ?", a: "Bien sûr, des créneaux de 12h à 14h sont ouverts du mardi au vendredi." },
                { q: "Y a-t-il un vestiaire ?", a: "Oui, un espace calme est prévu pour déposer vos affaires." },
            ],
            duration: 30,
            price: 35,
        },
        {
            name: "Soin énergétique",
            slug: "soin-energetique",
            description:
                "Une séance complète de soin énergétique.",
            imageUrl: "/uploads/services/service-energetique.jpg",
            benefits: [
                "Favoriser un état de détente profonde",
                "Relâcher les tensions accumulées",
                "Retrouver un sommeil plus paisible",
                "Prendre un temps pour soi, sans attente de performance",
            ],
            steps: [
                "Accueil : dix minutes d'échange pour comprendre où vous en êtes aujourd'hui.",
                "Le soin : quarante minutes allongé·e, habillé·e, dans le silence ou avec une musique douce.",
                "Retour au calme : un temps de parole libre, une tisane, et quelques repères pour les jours suivants.",
            ],
            faq: [
                { q: "Dois-je me déshabiller ?", a: "Non. Le soin se déroule entièrement habillé·e, allongé·e sur une table confortable." },
                { q: "Est-ce un acte médical ?", a: "Non. Il s'agit d'une pratique de bien-être et de relaxation, qui ne remplace en aucun cas un suivi médical." },
                { q: "Combien de séances faut-il ?", a: "Une seule séance suffit souvent à faire une pause. Certaines personnes reviennent une fois par mois, à leur rythme." },
            ],
            duration: 60,
            price: 60,
        },
        {
            name: "Rééquilibrage énergétique",
            slug: "reequilibrage-energetique",
            description:
                "Une séance approfondie de rééquilibrage énergétique.",
            imageUrl: "/uploads/services/service-reequilibrage.jpg",
            benefits: [
                "Apaiser une période de surcharge mentale",
                "Accompagner une transition de vie",
                "Retrouver de la clarté et de la disponibilité",
                "Se sentir soutenu·e sur un temps long",
            ],
            steps: [
                "Écoute : vingt minutes pour poser ce qui pèse et définir une intention simple.",
                "Le soin : soixante minutes de travail énergétique complet, du bassin jusqu'à la nuque.",
                "Intégration : dix minutes pour revenir doucement, avec des pistes concrètes pour la semaine.",
            ],
            faq: [
                { q: "Quelle différence avec le soin d'une heure ?", a: "Le temps d'écoute est plus long et le travail couvre l'ensemble du corps, sans précipitation." },
                { q: "Puis-je venir enceinte ?", a: "Oui, la séance est adaptée. Signalez-le simplement lors de la réservation." },
                { q: "Faut-il prévoir quelque chose ?", a: "Une tenue confortable, et si possible pas de rendez-vous pressant juste après." },
            ],
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