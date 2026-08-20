import {
    getAllServices,
    getServiceById,
    getServiceBySlug as getServiceBySlugService,
    createService as createServiceService,
    updateService as updateServiceService,
    updateServiceStatus as updateServiceStatusService
} from "../services/service.service.js";


// ============================================================
// GET ALL
// ============================================================

export const getServices = async (req, res) => {

    try {

        const includeInactive =
            req.user?.role === "ADMIN";

        const services = await getAllServices({
            includeInactive
        });

        return res.json(services);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Impossible de récupérer les services"
        });
    }
};


// ============================================================
// GET BY ID
// ============================================================

export const getService = async (req, res) => {

    try {

        const service = await getServiceById(
            req.params.id
        );

        if (
            !service.active &&
            req.user?.role !== "ADMIN"
        ) {
            return res.status(404).json({
                error: "Service introuvable"
            });
        }

        return res.json(service);

    } catch (error) {

        console.error(error);

        if (error.message === "SERVICE_NOT_FOUND") {
            return res.status(404).json({
                error: "Service introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de récupérer le service"
        });
    }
};


// ============================================================
// GET BY SLUG
// ============================================================

export const getServiceBySlug = async (req, res) => {

    try {

        const service = await getServiceBySlugService(
            req.params.slug
        );

        if (
            !service.active &&
            req.user?.role !== "ADMIN"
        ) {
            return res.status(404).json({
                error: "Service introuvable"
            });
        }

        return res.json(service);

    } catch (error) {

        console.error(error);

        if (error.message === "SERVICE_NOT_FOUND") {
            return res.status(404).json({
                error: "Service introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de récupérer le service"
        });
    }
};


// ============================================================
// CREATE
// ============================================================

export const createService = async (req, res) => {

    try {

        const {
            name,
            slug,
            description,
            imageUrl,
            benefits,
            steps,
            faq,
            duration,
            price
        } = req.body;

        const service = await createServiceService({
            name,
            slug,
            description,
            imageUrl,
            benefits,
            steps,
            faq,
            duration,
            price
        });

        return res.status(201).json(service);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "NAME_AND_SLUG_REQUIRED":
                return res.status(400).json({
                    error: "Le nom et le slug sont obligatoires"
                });

            case "INVALID_DURATION":
                return res.status(400).json({
                    error: "La durée doit être un entier positif"
                });

            case "INVALID_PRICE":
                return res.status(400).json({
                    error: "Le prix est invalide"
                });

            case "SLUG_ALREADY_EXISTS":
                return res.status(409).json({
                    error: "Ce slug est déjà utilisé"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de créer le service"
                });
        }
    }
};


// ============================================================
// UPDATE
// ============================================================

export const updateService = async (req, res) => {

    try {

        const {
            name,
            slug,
            description,
            imageUrl,
            benefits,
            steps,
            faq,
            duration,
            price
        } = req.body;

        const service = await updateServiceService({
            serviceId: req.params.id,
            name,
            slug,
            description,
            imageUrl,
            benefits,
            steps,
            faq,
            duration,
            price
        });

        return res.json(service);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable"
                });

            case "SLUG_ALREADY_EXISTS":
                return res.status(409).json({
                    error: "Ce slug est déjà utilisé"
                });

            case "INVALID_DURATION":
                return res.status(400).json({
                    error: "La durée est invalide"
                });

            case "INVALID_PRICE":
                return res.status(400).json({
                    error: "Le prix est invalide"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier le service"
                });
        }
    }
};


// ============================================================
// UPDATE STATUS
// ============================================================

export const updateServiceStatus = async (req, res) => {

    try {

        const service = await updateServiceStatusService({
            serviceId: req.params.id,
            active: req.body.active
        });

        return res.json(service);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable"
                });

            case "INVALID_STATUS":
                return res.status(400).json({
                    error: "active doit être un booléen"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier le statut du service"
                });
        }
    }
};