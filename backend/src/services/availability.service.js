import prisma from "../config/prisma.js";
import {
    APP_TIMEZONE,
    zonedDateTimeToUTC
} from "../utils/date.js";
import { formatInTimeZone } from "date-fns-tz";


// ============================================================
// HELPERS
// ============================================================

const DAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
];

const DAY_NAMES = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
];

const isValidTime = (time) => {
    return typeof time === "string" && /^\d{2}:\d{2}$/.test(time);
};

const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
};

const toMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
};

const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const validateTimeRange = (startTime, endTime) => {

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
        throw new Error("INVALID_TIME_FORMAT");
    }

    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
        throw new Error("INVALID_TIME_RANGE");
    }
};

const getPractitioner = async (userId) => {

    const practitioner = await prisma.practitioner.findUnique({
        where: {
            userId
        }
    });

    if (!practitioner) {
        throw new Error("PRACTITIONER_NOT_FOUND");
    }

    return practitioner;
};

const getPractitionerById = async (practitionerId) => {
    const practitioner = await prisma.practitioner.findUnique({ where: { id: practitionerId } });
    if (!practitioner) throw new Error("PRACTITIONER_NOT_FOUND");
    return practitioner;
};

const resolvePractitioner = async ({ userId, practitionerId }) =>
    practitionerId ? getPractitionerById(practitionerId) : getPractitioner(userId);


// ============================================================
// AVAILABLE SLOTS
// ============================================================

export const getAvailableSlots = async ({
    practitionerId,
    serviceId,
    date
}) => {

    const targetDate = new Date(`${date}T12:00:00Z`);

    if (Number.isNaN(targetDate.getTime())) {
        throw new Error("INVALID_DATE");
    }

    // -------------------------
    // Service
    // -------------------------

    const service = await prisma.service.findUnique({
        where: {
            id: serviceId
        }
    });

    if (!service || !service.active) {
        throw new Error("SERVICE_NOT_FOUND");
    }

    // -------------------------
    // Jour de la semaine
    // -------------------------

    const dayOfWeek = DAY_NAMES[targetDate.getDay()];

    // -------------------------
    // Début / fin de journée
    // -------------------------

    const startOfDay = zonedDateTimeToUTC(
        date,
        "00:00"
    );

    const endOfDay = zonedDateTimeToUTC(
        date,
        "23:59"
    );
    const currentLocalDate = formatInTimeZone(new Date(), APP_TIMEZONE, "yyyy-MM-dd");
    const currentLocalTime = formatInTimeZone(new Date(), APP_TIMEZONE, "HH:mm");
    const isPastDate = date < currentLocalDate;
    const isToday = date === currentLocalDate;

    // -------------------------
    // Exception
    // -------------------------

    const exception = await prisma.availabilityException.findFirst({
        where: {
            practitionerId,
            date: {
                gte: startOfDay,
                lt: endOfDay
            }
        }
    });

    // -------------------------
    // Horaires
    // -------------------------

    let availability;

    const weeklyAvailability = await prisma.weeklyAvailability.findMany({
        where: {
            practitionerId,
            dayOfWeek,
            active: true
        },
        orderBy: {
            startTime: "asc"
        }
    });

    if (exception?.type === "CUSTOM_HOURS" &&
        (!exception.startTime || !exception.endTime)) {
        throw new Error("INVALID_EXCEPTION");
    }

    availability = weeklyAvailability;

    if (!availability.length && exception?.type === "CUSTOM_HOURS") {
        availability = [{
            startTime: exception.startTime,
            endTime: exception.endTime
        }];
    }

    if (!availability.length) {
        return [];
    }

    // -------------------------
    // Rendez-vous existants
    // -------------------------

    const appointments = await prisma.appointment.findMany({
        where: {
            practitionerId,
            status: {
                not: "CANCELLED"
            },
            startAt: {
                lt: endOfDay
            },
            endAt: {
                gt: startOfDay
            }
        }
    });

    // -------------------------
    // Génération des créneaux
    // -------------------------

    const SLOT_INTERVAL = 30;
    const duration = service.duration;

    const slots = [];

    for (const period of availability) {

        const periodStart = toMinutes(period.startTime);
        const periodEnd = toMinutes(period.endTime);

        for (
            let current = periodStart;
            current + duration <= periodEnd;
            current += SLOT_INTERVAL
        ) {

            const slotStart = zonedDateTimeToUTC(
                date,
                formatTime(current)
            );

            const slotEnd = zonedDateTimeToUTC(
                date,
                formatTime(current + duration)
            );

            const isOccupied = appointments.some((appointment) => {

                return (
                    slotStart < appointment.endAt &&
                    slotEnd > appointment.startAt
                );

            });

            const insideCustomHours = exception?.type !== "CUSTOM_HOURS" || (
                current >= timeToMinutes(exception.startTime) &&
                current + duration <= timeToMinutes(exception.endTime)
            );
            const isPastSlot = isPastDate || (isToday && formatTime(current) <= currentLocalTime);

            slots.push({
                startAt: slotStart,
                endAt: slotEnd,
                time: formatTime(current),
                state: exception?.type === "CLOSED" || !insideCustomHours || isPastSlot
                    ? "unavailable"
                    : isOccupied
                        ? "booked"
                        : "available",
                reason: exception?.type === "CLOSED"
                    ? "blocked"
                    : !insideCustomHours
                        ? "unavailable"
                        : isPastSlot
                            ? "unavailable"
                            : null
            });
        }
    }

    return slots;
};


// ============================================================
// AVAILABILITY EXCEPTIONS
// ============================================================

// GET
export const getExceptions = async (userId) => {

    const practitioner = await getPractitioner(userId);

    return prisma.availabilityException.findMany({
        where: {
            practitionerId: practitioner.id
        },
        orderBy: {
            date: "asc"
        }
    });
};

export const getExceptionsByPractitionerId = async (practitionerId) => {
    await getPractitionerById(practitionerId);
    return prisma.availabilityException.findMany({
        where: { practitionerId },
        orderBy: { date: "asc" }
    });
};


// CREATE
export const createException = async ({
    userId,
    practitionerId,
    date,
    type,
    startTime,
    endTime,
    reason
}) => {

    const practitioner = await resolvePractitioner({ userId, practitionerId });

    if (!date) {
        throw new Error("DATE_REQUIRED");
    }

    if (!["CLOSED", "CUSTOM_HOURS"].includes(type)) {
        throw new Error("INVALID_EXCEPTION_TYPE");
    }

    if (type === "CUSTOM_HOURS") {

        if (!startTime || !endTime) {
            throw new Error("TIME_REQUIRED");
        }

        validateTimeRange(startTime, endTime);
    }

    if (type === "CLOSED" && (startTime || endTime)) {
        throw new Error("CLOSED_CANNOT_HAVE_HOURS");
    }

    const existing = await prisma.availabilityException.findFirst({
        where: {
            practitionerId: practitioner.id,
            date: new Date(date)
        }
    });

    if (existing) {
        throw new Error("EXCEPTION_ALREADY_EXISTS");
    }

    return prisma.availabilityException.create({
        data: {
            practitionerId: practitioner.id,
            date: new Date(date),
            type,
            startTime: type === "CUSTOM_HOURS"
                ? startTime
                : null,
            endTime: type === "CUSTOM_HOURS"
                ? endTime
                : null,
            reason: reason || null
        }
    });
};


// UPDATE
export const updateException = async ({
    userId,
    practitionerId,
    exceptionId,
    date,
    type,
    startTime,
    endTime,
    reason
}) => {

    const practitioner = await resolvePractitioner({ userId, practitionerId });

    const exception =
        await prisma.availabilityException.findFirst({
            where: {
                id: exceptionId,
                practitionerId: practitioner.id
            }
        });

    if (!exception) {
        throw new Error("EXCEPTION_NOT_FOUND");
    }

    if (!["CLOSED", "CUSTOM_HOURS"].includes(type)) {
        throw new Error("INVALID_EXCEPTION_TYPE");
    }

    if (type === "CUSTOM_HOURS") {

        if (!startTime || !endTime) {
            throw new Error("TIME_REQUIRED");
        }

        validateTimeRange(startTime, endTime);
    }

    if (type === "CLOSED" && (startTime || endTime)) {
        throw new Error("CLOSED_CANNOT_HAVE_HOURS");
    }

    return prisma.availabilityException.update({
        where: {
            id: exceptionId
        },
        data: {
            date: new Date(date),
            type,
            startTime: type === "CUSTOM_HOURS"
                ? startTime
                : null,
            endTime: type === "CUSTOM_HOURS"
                ? endTime
                : null,
            reason: reason || null
        }
    });
};


// DELETE
export const deleteException = async ({
    userId,
    practitionerId,
    exceptionId
}) => {

    const practitioner = await resolvePractitioner({ userId, practitionerId });

    const exception =
        await prisma.availabilityException.findFirst({
            where: {
                id: exceptionId,
                practitionerId: practitioner.id
            }
        });

    if (!exception) {
        throw new Error("EXCEPTION_NOT_FOUND");
    }

    await prisma.availabilityException.delete({
        where: {
            id: exceptionId
        }
    });

    return {
        success: true
    };
};