import {Router} from "express";
import prisma from "../config/prisma.js";

const healthRoutes = Router()

healthRoutes.get("/", async (req, res) => {
    try{
        const userCount = await prisma.user.count();

        res.json({
            status:"ok",
            database:"connected",
            users:userCount
        })
    }
    catch(error) {
        console.error(error);

        res.status(500).json({
            status:"error",
            database:"disconnected"
        })
    }
})

export default healthRoutes;