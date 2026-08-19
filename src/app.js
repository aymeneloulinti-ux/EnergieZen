import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js"
import serviceRoutes from "./routes/service.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import weeklyAvailabilityRoutes from "./routes/weekly-availability.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import userRoutes from "./routes/user.routes.js";
import practitionerRoutes from "./routes/practitioner.routes.js"
import adminRoutes from "./routes/admin.routes.js"


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/availability/weekly", weeklyAvailabilityRoutes);
app.use("/api/availability", availabilityRoutes)
app.use("/api/users", userRoutes)
app.use("/api/practitioners", practitionerRoutes)
app.use("/api/admin", adminRoutes)
export default app;