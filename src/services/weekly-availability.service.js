import prisma from "../config/prisma.js";

const DAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
];

const isValidTime = (time) => {
    return /^\d{2}:\d{2}$/.test(time);
};

const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const validateAvailability = (availability) => {

    const {
        dayOfWeek,
        startTime,
        endTime
    } = availability;

    if (!DAYS.includes(dayOfWeek)) {
        throw new Error("INVALID_DAY");
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
        throw new Error("INVALID_TIME_FORMAT");
    }

    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);

    if (start >= end) {
        throw new Error("INVALID_TIME_RANGE");
    }

    if (start < 0 || end > 24 * 60) {
        throw new Error("INVALID_TIME_RANGE");
    }
};


export const getWeeklyAvailability = async (userId) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    return prisma.weeklyAvailability.findMany({
        where: {
            practitionerId: practitioner.id
        },
        orderBy: [
            {
                dayOfWeek: "asc"
            },
            {
                startTime: "asc"
            }
        ]
    });
};


export const updateWeeklyAvailability = async ({
    userId,
    availabilities
}) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    if (!Array.isArray(availabilities)) {
        throw new Error("INVALID_AVAILABILITIES");
    }

    // Validation
    for (const availability of availabilities) {
        validateAvailability(availability);
    }

    // Vérification des chevauchements
    const byDay = {};

    for (const availability of availabilities) {

        if (!byDay[availability.dayOfWeek]) {
            byDay[availability.dayOfWeek] = [];
        }

        byDay[availability.dayOfWeek].push(availability);
    }

    for (const day of Object.keys(byDay)) {

        const ranges = byDay[day]
            .map((availability) => ({
                start: timeToMinutes(availability.startTime),
                end: timeToMinutes(availability.endTime)
            }))
            .sort((a, b) => a.start - b.start);

        for (let i = 1; i < ranges.length; i++) {

            const previous = ranges[i - 1];
            const current = ranges[i];

            if (current.start < previous.end) {
                throw new Error("OVERLAPPING_HOURS");
            }
        }
    }

    // Remplacement complet des horaires
    return prisma.$transaction(async (tx) => {

        await tx.weeklyAvailability.deleteMany({
            where: {
                practitionerId: practitioner.id
            }
        });

        if (availabilities.length === 0) {
            return [];
        }

        await tx.weeklyAvailability.createMany({
            data: availabilities.map((availability) => ({
                practitionerId: practitioner.id,
                dayOfWeek: availability.dayOfWeek,
                startTime: availability.startTime,
                endTime: availability.endTime,
                active: true
            }))
        });

        return tx.weeklyAvailability.findMany({
            where: {
                practitionerId: practitioner.id
            },
            orderBy: [
                {
                    dayOfWeek: "asc"
                },
                {
                    startTime: "asc"
                }
            ]
        });
    });
};