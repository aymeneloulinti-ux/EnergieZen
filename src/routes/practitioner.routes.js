import { Router } from "express";

import {
    getPractitioners,
    getPractitioner,
    addServiceToPractitioner,
    removeServiceFromPractitioner
} from "../controllers/practitioner.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();


// ============================================================
// PUBLIC
// ============================================================

router.get(
    "/",
    getPractitioners
);

router.get(
    "/:id",
    getPractitioner
);


// ============================================================
// ADMIN
// ============================================================

router.post(
    "/:practitionerId/services/:serviceId",
    authenticate,
    requireRole("ADMIN"),
    addServiceToPractitioner
);

router.delete(
    "/:practitionerId/services/:serviceId",
    authenticate,
    requireRole("ADMIN"),
    removeServiceFromPractitioner
);

export default router;
