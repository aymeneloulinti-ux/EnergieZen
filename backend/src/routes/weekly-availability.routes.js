import { Router } from "express";

import {
    getWeekly,
    updateWeekly,
    getWeeklyForAdmin,
    updateWeeklyForAdmin
} from "../controllers/weekly-availability.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const weeklyAvailabilityRoutes = Router();

weeklyAvailabilityRoutes.get(
    "/",
    authenticate,
    requireRole("PRACTITIONER", "ADMIN"),
    getWeekly
);

weeklyAvailabilityRoutes.put(
    "/",
    authenticate,
    requireRole("PRACTITIONER", "ADMIN"),
    updateWeekly
);

weeklyAvailabilityRoutes.get(
    "/practitioner/:practitionerId",
    authenticate,
    requireRole("ADMIN"),
    getWeeklyForAdmin
);

weeklyAvailabilityRoutes.put(
    "/practitioner/:practitionerId",
    authenticate,
    requireRole("ADMIN"),
    updateWeeklyForAdmin
);

export default weeklyAvailabilityRoutes;