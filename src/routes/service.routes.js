import {Router} from "express"
import { getServices, getService } from "../controllers/service.controller.js"

const serviceRoutes = Router();

serviceRoutes.get("/", getServices);
serviceRoutes.get("/:slug", getService)

export default serviceRoutes;