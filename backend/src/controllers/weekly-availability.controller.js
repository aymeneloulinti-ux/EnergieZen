import {
    getWeeklyAvailability,
    updateWeeklyAvailability,
    getWeeklyAvailabilityByPractitionerId
} from "../services/weekly-availability.service.js";


export const getWeekly = async (req, res) => {

    try {

        const availability =
            await getWeeklyAvailability(req.user.id);

        res.json(availability);

    } catch (error) {

        console.error(error);

        if (error.message === "PRACTITIONER_NOT_FOUND") {
            return res.status(404).json({
                error: "Praticien introuvable"
            });
        }

        res.status(500).json({
            error: "Impossible de récupérer les horaires"
        });
    }
};


export const updateWeekly = async (req, res) => {

    try {

        const availability =
            await updateWeeklyAvailability({
                userId: req.user.id,
                availabilities: req.body.availabilities
            });

        res.json(availability);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "INVALID_AVAILABILITIES":
                return res.status(400).json({
                    error: "availabilities doit être un tableau"
                });

            case "INVALID_DAY":
                return res.status(400).json({
                    error: "Jour de la semaine invalide"
                });

            case "INVALID_TIME_FORMAT":
                return res.status(400).json({
                    error: "Format d'heure invalide"
                });

            case "INVALID_TIME_RANGE":
                return res.status(400).json({
                    error: "Plage horaire invalide"
                });

            case "OVERLAPPING_HOURS":
                return res.status(400).json({
                    error: "Les horaires se chevauchent"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier les horaires"
                });
        }
    }
};

export const getWeeklyForAdmin = async (req, res) => {
    try {
        const availability = await getWeeklyAvailabilityByPractitionerId(req.params.practitionerId);
        res.json(availability);
    } catch (error) {
        console.error(error);
        res.status(error.message === "PRACTITIONER_NOT_FOUND" ? 404 : 500).json({
            error: error.message === "PRACTITIONER_NOT_FOUND" ? "Praticienne introuvable" : "Impossible de récupérer les horaires"
        });
    }
};

export const updateWeeklyForAdmin = async (req, res) => {
    try {
        const availability = await updateWeeklyAvailability({
            practitionerId: req.params.practitionerId,
            availabilities: req.body.availabilities
        });
        res.json(availability);
    } catch (error) {
        console.error(error);
        const status = ["INVALID_AVAILABILITIES", "INVALID_DAY", "INVALID_TIME_FORMAT", "INVALID_TIME_RANGE", "OVERLAPPING_HOURS"].includes(error.message) ? 400 : error.message === "PRACTITIONER_NOT_FOUND" ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};