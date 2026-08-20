import { Router } from "express";

import {
    getDashboardStats
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

export default router;