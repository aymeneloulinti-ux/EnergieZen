import { Router } from "express";
import { createAppointmentController, getAvailability } from "../controllers/appointment.controller.js";

const appointmentRoutes = Router();

appointmentRoutes.post("/", createAppointmentController)
appointmentRoutes.get("/availability",getAvailability);

export default appointmentRoutes