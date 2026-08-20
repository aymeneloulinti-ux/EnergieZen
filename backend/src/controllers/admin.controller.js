import {
    getDashboardStats as getDashboardStatsService
} from "../services/admin.service.js";

export const getDashboardStats = async (req, res) => {

    try {

        const stats = await getDashboardStatsService();

        return res.json(stats);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Impossible de récupérer les statistiques"
        });
    }
};