import prisma from "../config/prisma.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {

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

        const user = await prisma.user.findUnique({
            where: {
                id: payload.sub
            },
            select: {
                id: true,
                role: true,
                active: true
            }
        });

        if (!user) {
            return res.status(401).json({
                error: "Utilisateur introuvable"
            });
        }

        if (!user.active) {
            return res.status(403).json({
                error: "Compte désactivé"
            });
        }

        req.user = {
            id: user.id,
            role: user.role
        };

        next();

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            error: "Token invalide ou expiré"
        });
    }
};