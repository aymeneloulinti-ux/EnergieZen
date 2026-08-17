import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import {
    createException,
    getExceptions,
    updateException,
    deleteException
} from "../controllers/availability-exception.controller.js";

const availabilityExceptionRoutes = Router();

availabilityExceptionRoutes.post(
    "/",
    authenticate,
    requireRole("PRACTITIONER", "ADMIN"),
    createException
);

availabilityExceptionRoutes.get(
    "/",
    authenticate,
    requireRole("PRACTITIONER", "ADMIN"),
    getExceptions
);

availabilityExceptionRoutes.put(
    "/:id",
    authenticate,
    requireRole("PRACTITIONER", "ADMIN"),
    updateException
);

availabilityExceptionRoutes.delete(
    "/:id",
    authenticate,
    requireRole("PRACTITIONER", "ADMIN"),
    deleteException
);

export default availabilityExceptionRoutes;