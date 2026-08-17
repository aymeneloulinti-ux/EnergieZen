import { Router } from "express";

import {
    getWeekly,
    updateWeekly
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

export default weeklyAvailabilityRoutes;