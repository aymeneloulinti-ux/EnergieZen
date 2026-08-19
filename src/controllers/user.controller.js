import {
    getMyProfile as getMyProfileService,
    updateMyProfile as updateMyProfileService,
    changePassword as changePasswordService,
    getUsers as getUsersService,
    getUserById as getUserByIdService,
    updateUser as updateUserService,
    updateUserRole as updateUserRoleService,
    updateUserStatus as updateUserStatusService
} from "../services/user.service.js";


export const getMyProfile = async (req, res) => {

    try {

        const user = await getMyProfileService(req.user.id);

        return res.json(user);

    } catch (error) {

        console.error(error);

        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                error: "Utilisateur introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de récupérer le profil"
        });
    }
};


export const updateMyProfile = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            phone
        } = req.body;

        const user = await updateMyProfileService({
            userId: req.user.id,
            firstName,
            lastName,
            phone
        });

        return res.json(user);

    } catch (error) {

        console.error(error);

        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                error: "Utilisateur introuvable"
            });
        }

        return res.status(500).json({
            error: "Impossible de modifier le profil"
        });
    }
};

export const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        const result = await changePasswordService({
            userId: req.user.id,
            currentPassword,
            newPassword
        });

        return res.json(result);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "USER_NOT_FOUND":
                return res.status(404).json({
                    error: "Utilisateur introuvable"
                });

            case "PASSWORD_REQUIRED":
                return res.status(400).json({
                    error: "L'ancien et le nouveau mot de passe sont obligatoires"
                });

            case "INVALID_CURRENT_PASSWORD":
                return res.status(401).json({
                    error: "Mot de passe actuel incorrect"
                });

            case "WEAK_PASSWORD":
                return res.status(400).json({
                    error: "Le nouveau mot de passe doit contenir au moins 8 caractères"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier le mot de passe"
                });
        }
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Impossible de récupérer les utilisateurs"
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(
            req.params.id
        );
        return res.json(user);

    } catch (error) {
        console.error(error);
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                error: "Utilisateur introuvable"
            });
        }
        return res.status(500).json({
            error: "Impossible de récupérer l'utilisateur"
        });
    }
};


export const updateUser = async (req, res) => {

    try {

        const {
            email,
            firstName,
            lastName,
            phone
        } = req.body;

        const user = await updateUserService({
            userId: req.params.id,
            email,
            firstName,
            lastName,
            phone
        });

        return res.json(user);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "USER_NOT_FOUND":
                return res.status(404).json({
                    error: "Utilisateur introuvable"
                });

            case "EMAIL_ALREADY_EXISTS":
                return res.status(409).json({
                    error: "Cette adresse email est déjà utilisée"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier l'utilisateur"
                });
        }
    }
};


export const updateUserRole = async (req, res) => {

    try {

        const user = await updateUserRoleService({
            userId: req.params.id,
            role: req.body.role
        });

        return res.json(user);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "USER_NOT_FOUND":
                return res.status(404).json({
                    error: "Utilisateur introuvable"
                });

            case "INVALID_ROLE":
                return res.status(400).json({
                    error: "Rôle invalide"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier le rôle"
                });
        }
    }
};


export const updateUserStatus = async (req, res) => {

    try {

        const user = await updateUserStatusService({
            userId: req.params.id,
            active: req.body.active
        });

        return res.json(user);

    } catch (error) {

        console.error(error);

        switch (error.message) {

            case "USER_NOT_FOUND":
                return res.status(404).json({
                    error: "Utilisateur introuvable"
                });

            case "INVALID_STATUS":
                return res.status(400).json({
                    error: "active doit être un booléen"
                });

            default:
                return res.status(500).json({
                    error: "Impossible de modifier le statut de l'utilisateur"
                });
        }
    }
};