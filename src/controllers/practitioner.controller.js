import {
    getAllPractitioners as getAllPractitionersService,
    getPractitionerById as getPractitionerByIdService,
    addServiceToPractitioner as addServiceToPractitionerService,
    removeServiceFromPractitioner as removeServiceFromPractitionerService
} from "../services/practitioner.service.js";


// ============================================================
// GET ALL PRACTITIONERS
// ============================================================

export const getPractitioners = async (req, res) => {

    try {

        const practitioners =
            await getAllPractitionersService();

        return res.json(practitioners);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Impossible de récupérer les praticiens"
        });
    }
};


// ============================================================
// GET PRACTITIONER BY ID
// ============================================================

export const getPractitioner = async (req, res) => {

    try {

        const practitioner =
            await getPractitionerByIdService(
                req.params.id
            );

        return res.json(practitioner);

    } catch (error) {

        console.error(error);

        if (
            error.message === "PRACTITIONER_NOT_FOUND"
        ) {
            return res.status(404).json({
                error: "Praticien introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de récupérer le praticien"
        });
    }
};

export const addServiceToPractitioner = async (req, res) => {

    try {

        const practitioner =
            await addServiceToPractitionerService({
                practitionerId: req.params.practitionerId,
                serviceId: req.params.serviceId
            });

        return res.json(practitioner);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable"
                });

            case "SERVICE_INACTIVE":
                return res.status(400).json({
                    error: "Le service est désactivé"
                });

            case "SERVICE_ALREADY_ASSOCIATED":
                return res.status(409).json({
                    error: "Le service est déjà associé à ce praticien"
                });

            default:
                return res.status(500).json({
                    error: "Impossible d'associer le service au praticien"
                });
        }
    }
};


export const removeServiceFromPractitioner = async (req, res) => {

    try {

        const practitioner =
            await removeServiceFromPractitionerService({
                practitionerId: req.params.practitionerId,
                serviceId: req.params.serviceId
            });

        return res.json(practitioner);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable"
                });

            case "SERVICE_NOT_ASSOCIATED":
                return res.status(404).json({
                    error: "Ce service n'est pas associé à ce praticien"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de retirer le service du praticien"
                });
        }
    }
};