import {
    createException as createAvailabilityException,
    getExceptions as getAvailabilityExceptions,
    updateException as updateAvailabilityException,
    deleteException as deleteAvailabilityException
} from "../services/availability.service.js";

export const createException = async (req, res) => {
    try {
        const exception = await createAvailabilityException({
            ...req.body,
            userId: req.user.id
        });

        res.status(201).json(exception);

    } catch (error) {
        console.error(error);

        switch (error.message) {
            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "DATE_REQUIRED":
                return res.status(400).json({
                    error: "La date est obligatoire"
                });

            case "INVALID_EXCEPTION_TYPE":
                return res.status(400).json({
                    error: "Type d'exception invalide"
                });

            case "TIME_REQUIRED":
                return res.status(400).json({
                    error: "Les horaires sont obligatoires"
                });

            case "INVALID_TIME_FORMAT":
                return res.status(400).json({
                    error: "Format horaire invalide"
                });

            case "INVALID_TIME_RANGE":
                return res.status(400).json({
                    error: "L'heure de fin doit être après l'heure de début"
                });

            case "CLOSED_CANNOT_HAVE_HOURS":
                return res.status(400).json({
                    error: "Une fermeture ne peut pas avoir d'horaires"
                });

            case "EXCEPTION_ALREADY_EXISTS":
                return res.status(409).json({
                    error: "Une exception existe déjà pour cette date"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de créer l'exception"
                });
        }
    }
};


export const getExceptions = async (req, res) => {
    try {

        const exceptions = await getAvailabilityExceptions(
            req.user.id
        );

        res.json(exceptions);

    } catch (error) {
        console.error(error);

        if (error.message === "PRACTITIONER_NOT_FOUND") {
            return res.status(404).json({
                error: "Praticien introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de récupérer les exceptions"
        });
    }
};


export const deleteException = async (req, res) => {
    try {

        const { id } = req.params;

        await deleteAvailabilityException({
            userId: req.user.id,
            exceptionId: id
        });

        res.status(204).send();

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

        return res.status(500).json({
            error: "Impossible de supprimer l'exception"
        });
    }
};

export const updateException = async (req, res) => {
    try {
        const { id } = req.params;

        const exception = await updateAvailabilityException({
            ...req.body,
            userId: req.user.id,
            exceptionId: id
        });

        res.json(exception);

    } catch (error) {
        console.error(error);

        switch (error.message) {
            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "EXCEPTION_NOT_FOUND":
                return res.status(404).json({
                    error: "Exception introuvable"
                });

            case "DATE_REQUIRED":
                return res.status(400).json({
                    error: "La date est obligatoire"
                });

            case "INVALID_EXCEPTION_TYPE":
                return res.status(400).json({
                    error: "Type d'exception invalide"
                });

            case "TIME_REQUIRED":
                return res.status(400).json({
                    error: "Les horaires sont obligatoires"
                });

            case "INVALID_TIME_FORMAT":
                return res.status(400).json({
                    error: "Format horaire invalide"
                });

            case "INVALID_TIME_RANGE":
                return res.status(400).json({
                    error: "L'heure de fin doit être après l'heure de début"
                });

            case "CLOSED_CANNOT_HAVE_HOURS":
                return res.status(400).json({
                    error: "Une fermeture ne peut pas avoir d'horaires"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier l'exception"
                });
        }
    }
};