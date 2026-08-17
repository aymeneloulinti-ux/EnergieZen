import {
    register,
    login
} from "../services/auth.service.js";


export const registerUser = async (req, res) => {

    try {

        const result = await register(req.body);

        res.status(201).json(result);

    } catch (error) {

        console.error(error);

        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                error: "Cette adresse email est déjà utilisée"
            });
        }

        res.status(500).json({
            error: "Impossible de créer le compte"
        });
    }
};


export const loginUser = async (req, res) => {

    try {

        const result = await login(req.body);

        res.json(result);

    } catch (error) {

        console.error(error);

        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                error: "Email ou mot de passe incorrect"
            });
        }

        res.status(500).json({
            error: "Impossible de se connecter"
        });
    }
};