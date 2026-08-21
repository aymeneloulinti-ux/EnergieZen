import { Router } from "express";

import {
    getServices,
    getService,
    getServiceBySlug,
    createService,
    updateService,
    updateServiceStatus,
    deleteService
} from "../controllers/service.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { uploadServiceImage } from "../utils/upload.js";

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
    uploadServiceImage.single("image"),
    createService
);

// Modifier un service
router.patch(
    "/:id",
    authenticate,
    requireRole("ADMIN"),
    updateService
);

router.delete(
    "/:id",
    authenticate,
    requireRole("ADMIN"),
    deleteService
);

// Activer / désactiver un service
router.patch(
    "/:id/status",
    authenticate,
    requireRole("ADMIN"),
    updateServiceStatus
);

export default router;