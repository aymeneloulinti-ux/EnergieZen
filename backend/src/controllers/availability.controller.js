import {
    getAvailableSlots,
    getExceptions,
    createException,
    updateException,
    deleteException,
    getExceptionsByPractitionerId
} from "../services/availability.service.js";


export const getSlots = async (req, res) => {
    try {
        const {
            practitionerId,
            serviceId,
            date
        } = req.query;

        if (!practitionerId || !serviceId || !date) {
            return res.status(400).json({
                error: "practitionerId, serviceId et date sont requis"
            });
        }

        const slots = await getAvailableSlots({
            practitionerId,
            serviceId,
            date
        });

        res.json(slots);

    } catch (error) {
        console.error(error);

        switch (error.message) {
            case "INVALID_DATE":
                return res.status(400).json({
                    error: "Date invalide"
                });

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable ou inactif"
                });

            case "INVALID_EXCEPTION":
                return res.status(500).json({
                    error: "Exception de disponibilité invalide"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de récupérer les créneaux"
                });
        }
    }
};


export const getAvailabilityExceptions = async (req, res) => {

    try {

        const exceptions =
            await getExceptions(req.user.id);

        res.json(exceptions);

    } catch (error) {

        console.error(error);

        if (error.message === "PRACTITIONER_NOT_FOUND") {
            return res.status(404).json({
                error: "Praticien introuvable"
            });
        }

        res.status(500).json({
            error: "Impossible de récupérer les exceptions"
        });
    }
};


export const createAvailabilityException = async (req, res) => {

    try {

        const exception =
            await createException({
                userId: req.user.id,
                ...req.body
            });

        res.status(201).json(exception);

    } catch (error) {

        console.error(error);

        const errors = {
            PRACTITIONER_NOT_FOUND: [
                404,
                "Praticien introuvable"
            ],

            DATE_REQUIRED: [
                400,
                "La date est obligatoire"
            ],

            INVALID_EXCEPTION_TYPE: [
                400,
                "Type d'exception invalide"
            ],

            TIME_REQUIRED: [
                400,
                "Les heures sont obligatoires"
            ],

            INVALID_TIME_FORMAT: [
                400,
                "Format d'heure invalide"
            ],

            INVALID_TIME_RANGE: [
                400,
                "Plage horaire invalide"
            ],

            CLOSED_CANNOT_HAVE_HOURS: [
                400,
                "Une fermeture ne peut pas avoir d'horaires"
            ],

            EXCEPTION_ALREADY_EXISTS: [
                409,
                "Une exception existe déjà pour cette date"
            ]
        };

        const response = errors[error.message];

        if (response) {
            return res.status(response[0]).json({
                error: response[1]
            });
        }

        res.status(500).json({
            error: "Impossible de créer l'exception"
        });
    }
};


export const updateAvailabilityException = async (req, res) => {

    try {

        const exception =
            await updateException({
                userId: req.user.id,
                exceptionId: req.params.id,
                ...req.body
            });

        res.json(exception);

    } catch (error) {

        console.error(error);

        const errors = {
            PRACTITIONER_NOT_FOUND: [
                404,
                "Praticien introuvable"
            ],

            EXCEPTION_NOT_FOUND: [
                404,
                "Exception introuvable"
            ],

            INVALID_EXCEPTION_TYPE: [
                400,
                "Type d'exception invalide"
            ],

            TIME_REQUIRED: [
                400,
                "Les heures sont obligatoires"
            ],

            INVALID_TIME_FORMAT: [
                400,
                "Format d'heure invalide"
            ],

            INVALID_TIME_RANGE: [
                400,
                "Plage horaire invalide"
            ],

            CLOSED_CANNOT_HAVE_HOURS: [
                400,
                "Une fermeture ne peut pas avoir d'horaires"
            ]
        };

        const response = errors[error.message];

        if (response) {
            return res.status(response[0]).json({
                error: response[1]
            });
        }

        res.status(500).json({
            error: "Impossible de modifier l'exception"
        });
    }
};


export const deleteAvailabilityException = async (req, res) => {

    try {

        const result =
            await deleteException({
                userId: req.user.id,
                exceptionId: req.params.id
            });

        res.json(result);

    } catch (error) {

        console.error(error);

        if (error.message === "PRACTITIONER_NOT_FOUND") {
            return res.status(404).json({
                error: "Praticien introuvable"
            });
        }

        if (error.message === "EXCEPTION_NOT_FOUND") {
            return res.status(404).json({
                error: "Exception introuvable"
            });
        }

        res.status(500).json({
            error: "Impossible de supprimer l'exception"
        });
    }
};

export const getAdminAvailabilityExceptions = async (req, res) => {
    try {
        res.json(await getExceptionsByPractitionerId(req.params.practitionerId));
    } catch (error) {
        console.error(error);
        res.status(error.message === "PRACTITIONER_NOT_FOUND" ? 404 : 500).json({ error: "Impossible de récupérer les congés" });
    }
};

export const createAdminAvailabilityException = async (req, res) => {
    try {
        const exception = await createException({ practitionerId: req.params.practitionerId, ...req.body });
        res.status(201).json(exception);
    } catch (error) {
        console.error(error);
        const badRequest = ["DATE_REQUIRED", "INVALID_EXCEPTION_TYPE", "TIME_REQUIRED", "INVALID_TIME_FORMAT", "INVALID_TIME_RANGE", "CLOSED_CANNOT_HAVE_HOURS", "EXCEPTION_ALREADY_EXISTS"].includes(error.message);
        res.status(error.message === "PRACTITIONER_NOT_FOUND" ? 404 : badRequest ? 400 : 500).json({ error: error.message });
    }
};

export const updateAdminAvailabilityException = async (req, res) => {
    try {
        res.json(await updateException({ practitionerId: req.params.practitionerId, exceptionId: req.params.id, ...req.body }));
    } catch (error) {
        console.error(error);
        const badRequest = ["INVALID_EXCEPTION_TYPE", "TIME_REQUIRED", "INVALID_TIME_FORMAT", "INVALID_TIME_RANGE", "CLOSED_CANNOT_HAVE_HOURS"].includes(error.message);
        res.status(error.message === "PRACTITIONER_NOT_FOUND" || error.message === "EXCEPTION_NOT_FOUND" ? 404 : badRequest ? 400 : 500).json({ error: error.message });
    }
};

export const deleteAdminAvailabilityException = async (req, res) => {
    try {
        res.json(await deleteException({ practitionerId: req.params.practitionerId, exceptionId: req.params.id }));
    } catch (error) {
        console.error(error);
        res.status(error.message === "PRACTITIONER_NOT_FOUND" || error.message === "EXCEPTION_NOT_FOUND" ? 404 : 500).json({ error: error.message });
    }
};