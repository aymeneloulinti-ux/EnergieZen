import { Router } from "express";

import {
    createAppointment,
    getMyAppointments,
    cancelAppointment,
    updateAppointment,
    getAppointment,
    getPractitionerAppointments,
    confirmAppointment,
    cancelAppointmentByPractitioner,
    completeAppointment,
    markAppointmentAsNoShow
} from "../controllers/appointment.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(authenticate);

// Récupérer mes rendez-vous
router.get(
    "/my",
    requireRole("CLIENT"),
    getMyAppointments
);

// Créer un rendez-vous
router.post(
    "/",
    requireRole("CLIENT"),
    createAppointment
);

// Récupérer les rendez-vous du practicien
router.get(
    "/practitioner",
    requireRole("PRACTITIONER", "ADMIN"),
    getPractitionerAppointments
);

// Confirmer un rendez vous (coté practicien)
router.patch(
    "/:id/confirm",
    requireRole("PRACTITIONER", "ADMIN"),
    confirmAppointment
);

// Annuler un rendez-vous (coté practicien)
router.patch(
    "/:id/cancel-by-practitioner",
    requireRole("PRACTITIONER", "ADMIN"),
    cancelAppointmentByPractitioner
);

// Statut de rendez-vous complété
router.patch(
    "/:id/complete",
    requireRole("PRACTITIONER", "ADMIN"),
    completeAppointment
);

// Statut de rendez-vous "NO_SHOW"
router.patch(
    "/:id/no-show",
    requireRole("PRACTITIONER", "ADMIN"),
    markAppointmentAsNoShow
);

// Annuler un rendez-vous
router.patch(
    "/:id/cancel",
    requireRole("CLIENT"),
    cancelAppointment
);

// Mettre à jour un rendez-vous client (déplacement)
router.patch(
    "/:id",
    requireRole("CLIENT"),
    updateAppointment
);

// Récupérer un rendez-vous
router.get(
    "/:id",
    requireRole("CLIENT"),
    getAppointment
);

export default router;