import express from "express";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

export default app;
