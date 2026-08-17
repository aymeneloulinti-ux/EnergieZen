import { fromZonedTime, formatInTimeZone } from "date-fns-tz";

export const APP_TIMEZONE = "Europe/Brussels";

export const zonedDateTimeToUTC = (date, time) => {
    return fromZonedTime(
        `${date} ${time}:00`,
        APP_TIMEZONE
    );
};

export const formatTimeInAppTimezone = (date) => {
    return formatInTimeZone(
        date,
        APP_TIMEZONE,
        "HH:mm"
    );
};