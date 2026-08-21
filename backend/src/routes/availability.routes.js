import { Router } from "express";

import {
    getSlots,
    getAvailabilityExceptions,
    createAvailabilityException,
    updateAvailabilityException,
    deleteAvailabilityException,
    getAdminAvailabilityExceptions,
    createAdminAvailabilityException,
    updateAdminAvailabilityException,
    deleteAdminAvailabilityException
} from "../controllers/availability.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
    "/slots",
    getSlots
);

router.use(
    authenticate,
    requireRole("PRACTITIONER", "ADMIN")
);

router.get(
    "/exceptions",
    getAvailabilityExceptions
);

router.post(
    "/exceptions",
    createAvailabilityException
);

router.put(
    "/exceptions/:id",
    updateAvailabilityException
);

router.delete(
    "/exceptions/:id",
    deleteAvailabilityException
);

router.get("/admin/:practitionerId/exceptions", getAdminAvailabilityExceptions);
router.post("/admin/:practitionerId/exceptions", createAdminAvailabilityException);
router.put("/admin/:practitionerId/exceptions/:id", updateAdminAvailabilityException);
router.delete("/admin/:practitionerId/exceptions/:id", deleteAdminAvailabilityException);

export default router;