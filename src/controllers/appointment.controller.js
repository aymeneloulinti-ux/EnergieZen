import {
    createAppointment
} from "../services/appointment.service.js";
import {
    getAvailableSlots
} from "../services/availability.service.js";

export const createAppointmentController = async (req, res) => {
    try {

        const appointment = await createAppointment(req.body);

        res.status(201).json(appointment);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable"
                });

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "CLIENT_NOT_FOUND":
                return res.status(404).json({
                    error: "Client introuvable"
                });

            case "TIME_SLOT_UNAVAILABLE":
                return res.status(409).json({
                    error: "Ce créneau n'est plus disponible"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de créer le rendez-vous"
                });
        }
    }
};

export const getAvailability = async (req, res) => {

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

        if (error.message === "SERVICE_NOT_FOUND") {
            return res.status(404).json({
                error: "Service introuvable"
            });
        }

        if (error.message === "INVALID_DATE") {
            return res.status(400).json({
                error: "Date invalide"
            });
        }

        res.status(500).json({
            error: "Impossible de récupérer les disponibilités"
        });
    }
};