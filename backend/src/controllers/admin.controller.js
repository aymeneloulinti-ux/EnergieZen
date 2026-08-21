import {
    getDashboardStats as getDashboardStatsService,
    getAdminClients as getAdminClientsService,
    getAdminPractitioners as getAdminPractitionersService,
    getAdminAppointments as getAdminAppointmentsService,
    updateAdminAppointmentStatus as updateAdminAppointmentStatusService,
    moveAdminAppointment as moveAdminAppointmentService,
    deleteAdminAppointment as deleteAdminAppointmentService
} from "../services/admin.service.js";

export const getDashboardStats = async (req, res) => {

    try {

        const stats = await getDashboardStatsService();

        return res.json(stats);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Impossible de récupérer les statistiques"
        });
    }
};

export const getAdminClients = async (req, res) => {
    try {
        const clients = await getAdminClientsService();
        return res.json(clients);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Impossible de récupérer les clients"
        });
    }
};

export const getAdminPractitioners = async (req, res) => {
    try {
        const practitioners = await getAdminPractitionersService();
        return res.json(practitioners);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Impossible de récupérer les praticiens"
        });
    }
};

export const getAdminAppointments = async (req, res) => {
    try {
        const appointments = await getAdminAppointmentsService({
            status: req.query.status,
            practitionerId: req.query.practitionerId,
            from: req.query.from,
            to: req.query.to,
            includeCancelled: req.query.includeCancelled !== "false"
        });
        return res.json(appointments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Impossible de récupérer les rendez-vous"
        });
    }
};

export const moveAdminAppointment = async (req, res) => {
    try {
        const appointment = await moveAdminAppointmentService({
            appointmentId: req.params.id,
            startAt: req.body.startAt
        });
        return res.json(appointment);
    } catch (error) {
        console.error(error);

        switch (error.message) {
            case "START_AT_REQUIRED":
            case "INVALID_START_AT":
                return res.status(400).json({ error: "La date et l'heure du rendez-vous sont invalides" });
            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({ error: "Rendez-vous introuvable" });
            case "APPOINTMENT_CANNOT_BE_UPDATED":
            case "PAST_DATE":
            case "PAST_TIME":
                return res.status(400).json({ error: "Ce rendez-vous ne peut pas être déplacé vers cette date" });
            case "TIME_SLOT_UNAVAILABLE":
                return res.status(409).json({ error: "Ce créneau n'est pas disponible" });
            default:
                return res.status(500).json({ error: "Impossible de déplacer le rendez-vous" });
        }
    }
};

export const deleteAdminAppointment = async (req, res) => {
    try {
        await deleteAdminAppointmentService(req.params.id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);

        switch (error.message) {
            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({ error: "Rendez-vous introuvable" });
            case "APPOINTMENT_NOT_CANCELLED":
                return res.status(409).json({ error: "Seuls les rendez-vous annulés peuvent être supprimés" });
            default:
                return res.status(500).json({ error: "Impossible de supprimer le rendez-vous" });
        }
    }
};

export const updateAdminAppointmentStatus = async (req, res) => {
    try {
        const appointment = await updateAdminAppointmentStatusService({
            appointmentId: req.params.id,
            status: req.body.status,
            cancellationReason: req.body.cancellationReason
        });
        return res.json(appointment);
    } catch (error) {
        console.error(error);

        switch (error.message) {
            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({ error: "Rendez-vous introuvable" });
            case "INVALID_STATUS":
            case "INVALID_APPOINTMENT_STATUS":
                return res.status(400).json({ error: "Ce rendez-vous ne peut pas changer vers ce statut" });
            default:
                return res.status(500).json({ error: "Impossible de modifier le rendez-vous" });
        }
    }
};