import { Router } from "express";

import {
    getDashboardStats,
    getAdminClients,
    getAdminPractitioners,
    getAdminAppointments,
    updateAdminAppointmentStatus
} from "../controllers/admin.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(authenticate);
router.use(requireRole("ADMIN"));

router.get(
    "/dashboard",
    getDashboardStats
);

router.get(
    "/clients",
    getAdminClients
);

router.get(
    "/practitioners",
    getAdminPractitioners
);

router.get(
    "/appointments",
    getAdminAppointments
);

router.patch(
    "/appointments/:id/status",
    updateAdminAppointmentStatus
);

export default router;