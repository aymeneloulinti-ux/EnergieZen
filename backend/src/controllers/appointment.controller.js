import {
    createAppointment as createAppointmentService,
    getClientAppointments,
    cancelAppointment as cancelAppointmentService,
    updateAppointment as updateAppointmentService,
    getAppointmentById,
    getPractitionerAppointments as getPractitionerAppointmentsService,
    confirmAppointment as confirmAppointmentService,
    cancelAppointmentByPractitioner as cancelAppointmentByPractitionerService,
    completeAppointment as completeAppointmentService,
    markAppointmentAsNoShow as markAppointmentAsNoShowService

} from "../services/appointment.service.js";


export const createAppointment = async (req, res) => {

    try {

        const {
            practitionerId,
            serviceId,
            startAt
        } = req.body;

        const appointment = await createAppointmentService({
            clientId: req.user.id,
            practitionerId,
            serviceId,
            startAt
        });

        return res.status(201).json(appointment);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "START_AT_REQUIRED":
                return res.status(400).json({
                    error: "La date et l'heure du rendez-vous sont obligatoires"
                });

            case "INVALID_START_AT":
                return res.status(400).json({
                    error: "La date et l'heure du rendez-vous sont invalides"
                });

            case "PAST_DATE":
                return res.status(400).json({
                    error: "Impossible de réserver une date passée"
                });

            case "PAST_TIME":
                return res.status(400).json({
                    error: "Ce créneau est déjà passé"
                });

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable ou inactif"
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
                    error: "Ce créneau n'est pas disponible"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de créer le rendez-vous"
                });
        }
    }
};

export const getMyAppointments = async (req, res) => {
    try {
        const appointments = await getClientAppointments(req.user.id);

        res.json(appointments);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Impossible de récupérer les rendez-vous"
        });
    }
};


export const cancelAppointment = async (req, res) => {

    try {

        const { id } = req.params;
        const { cancellationReason } = req.body;

        const appointment = await cancelAppointmentService({
            clientId: req.user.id,
            appointmentId: id,
            cancellationReason
        });

        return res.json(appointment);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({
                    error: "Rendez-vous introuvable"
                });

            case "APPOINTMENT_CANNOT_BE_CANCELLED":
                return res.status(400).json({
                    error: "Ce rendez-vous ne peut pas être annulé"
                });

            default:
                return res.status(500).json({
                    error: "Impossible d'annuler le rendez-vous"
                });
        }
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { startAt } = req.body;

        const appointment = await updateAppointmentService({
            clientId: req.user.id,
            appointmentId: id,
            startAt
        });

        return res.json(appointment);
    } catch (error) {
        console.error(error);

        switch (error.message) {
            case "START_AT_REQUIRED":
                return res.status(400).json({
                    error: "La date et l'heure du rendez-vous sont obligatoires"
                });

            case "INVALID_START_AT":
                return res.status(400).json({
                    error: "La date et l'heure du rendez-vous sont invalides"
                });

            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({
                    error: "Rendez-vous introuvable"
                });

            case "APPOINTMENT_CANNOT_BE_UPDATED":
                return res.status(400).json({
                    error: "Ce rendez-vous ne peut pas être déplacé"
                });

            case "PAST_DATE":
                return res.status(400).json({
                    error: "Impossible de déplacer vers une date passée"
                });

            case "PAST_TIME":
                return res.status(400).json({
                    error: "Ce créneau est déjà passé"
                });

            case "TIME_SLOT_UNAVAILABLE":
                return res.status(409).json({
                    error: "Ce créneau n'est pas disponible"
                });

            case "SERVICE_NOT_FOUND":
                return res.status(404).json({
                    error: "Service introuvable ou inactif"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de déplacer le rendez-vous"
                });
        }
    }
};

export const getAppointment = async (req, res) => {

    try {

        const { id } = req.params;

        const appointment = await getAppointmentById({
            appointmentId: id,
            clientId: req.user.id
        });

        return res.json(appointment);

    } catch (error) {

        console.error(error);

        if (error.message === "APPOINTMENT_NOT_FOUND") {
            return res.status(404).json({
                error: "Rendez-vous introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de récupérer le rendez-vous"
        });
    }
};

export const getPractitionerAppointments = async (req, res) => {

    try {

        const appointments = await getPractitionerAppointmentsService({
            userId: req.user.id
        });

        return res.json(appointments);

    } catch (error) {

        console.error(error);

        if (error.message === "PRACTITIONER_NOT_FOUND") {
            return res.status(404).json({
                error: "Praticien introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de récupérer les rendez-vous"
        });
    }
};


export const confirmAppointment = async (req, res) => {

    try {

        const { id } = req.params;

        const appointment = await confirmAppointmentService({
            userId: req.user.id,
            appointmentId: id
        });

        return res.json(appointment);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({
                    error: "Rendez-vous introuvable"
                });

            case "INVALID_APPOINTMENT_STATUS":
                return res.status(400).json({
                    error: "Ce rendez-vous ne peut pas être confirmé"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de confirmer le rendez-vous"
                });
        }
    }
};

export const cancelAppointmentByPractitioner = async (req, res) => {

    try {

        const { id } = req.params;
        const { cancellationReason } = req.body;

        const appointment =
            await cancelAppointmentByPractitionerService({
                userId: req.user.id,
                appointmentId: id,
                cancellationReason
            });

        return res.json(appointment);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({
                    error: "Rendez-vous introuvable"
                });

            case "CANCELLATION_REASON_REQUIRED":
                return res.status(400).json({
                    error: "Le motif d'annulation est obligatoire"
                });

            case "INVALID_APPOINTMENT_STATUS":
                return res.status(400).json({
                    error: "Ce rendez-vous ne peut pas être annulé"
                });

            default:
                return res.status(500).json({
                    error: "Impossible d'annuler le rendez-vous"
                });
        }
    }
};


export const completeAppointment = async (req, res) => {

    try {

        const { id } = req.params;

        const appointment =
            await completeAppointmentService({
                userId: req.user.id,
                appointmentId: id
            });

        return res.json(appointment);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({
                    error: "Rendez-vous introuvable"
                });

            case "INVALID_APPOINTMENT_STATUS":
                return res.status(400).json({
                    error: "Seul un rendez-vous confirmé peut être terminé"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de terminer le rendez-vous"
                });
        }
    }
};

export const markAppointmentAsNoShow = async (req, res) => {

    try {

        const { id } = req.params;

        const appointment =
            await markAppointmentAsNoShowService({
                userId: req.user.id,
                appointmentId: id
            });

        return res.json(appointment);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "PRACTITIONER_NOT_FOUND":
                return res.status(404).json({
                    error: "Praticien introuvable"
                });

            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({
                    error: "Rendez-vous introuvable"
                });

            case "INVALID_APPOINTMENT_STATUS":
                return res.status(400).json({
                    error: "Seul un rendez-vous confirmé peut être marqué comme absent"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de marquer le rendez-vous comme absent"
                });
        }
    }
};