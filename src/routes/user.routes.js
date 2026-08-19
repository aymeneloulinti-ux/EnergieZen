import { Router } from "express";

import {
    getMyProfile,
    updateMyProfile,
    changePassword,
    getUsers,
    getUserById,
    updateUser,
    updateUserRole,
    updateUserStatus
} from "../controllers/user.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
    "/me",
    getMyProfile
);

router.patch(
    "/me",
    updateMyProfile
);

router.patch(
    "/me/password",
    changePassword
);

router.get(
    "/",
    requireRole("ADMIN"),
    getUsers
);

router.get(
    "/:id",
    requireRole("ADMIN"),
    getUserById
);

router.patch(
    "/:id/role",
    requireRole("ADMIN"),
    updateUserRole
);

router.patch(
    "/:id/status",
    requireRole("ADMIN"),
    updateUserStatus
);

router.patch(
    "/:id",
    requireRole("ADMIN"),
    updateUser
);

export default router;