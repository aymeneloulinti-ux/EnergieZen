import { Router } from "express";

import {
    getServices,
    getService,
    getServiceBySlug,
    createService,
    updateService,
    updateServiceStatus
} from "../controllers/service.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();


// ============================================================
// PUBLIC
// ============================================================

// Liste des services actifs
router.get(
    "/",
    getServices
);

// Service par ID
router.get(
    "/:id",
    getService
);

// Service par slug
router.get(
    "/slug/:slug",
    getServiceBySlug
);


// ============================================================
// ADMIN
// ============================================================

// Créer un service
router.post(
    "/",
    authenticate,
    requireRole("ADMIN"),
    createService
);

// Modifier un service
router.patch(
    "/:id",
    authenticate,
    requireRole("ADMIN"),
    updateService
);

// Activer / désactiver un service
router.patch(
    "/:id/status",
    authenticate,
    requireRole("ADMIN"),
    updateServiceStatus
);

export default router;