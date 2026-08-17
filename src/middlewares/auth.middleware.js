import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            error: "Authentification requise"
        });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            error: "Token invalide"
        });
    }

    try {

        const payload = verifyToken(token);

        req.user = {
            id: payload.sub,
            role: payload.role
        };

        next();

    } catch (error) {

        return res.status(401).json({
            error: "Token invalide ou expiré"
        });
    }
};