import { Router } from "express";

import {
    createAppointment,
    getMyAppointments,
    cancelAppointment,
    getAppointment
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

// Récupérer un rendez-vous
router.get(
    "/:id",
    requireRole("CLIENT"),
    getAppointment
);

// Annuler un rendez-vous
router.patch(
    "/:id/cancel",
    requireRole("CLIENT"),
    cancelAppointment
);

export default router;