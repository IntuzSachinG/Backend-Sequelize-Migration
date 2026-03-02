import express from "express";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

export default app;
