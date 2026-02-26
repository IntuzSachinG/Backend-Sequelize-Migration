import { Router } from "express";
import {
  createProject,
  listProjects,
  getProjectTasks,
} from "../controllers/projectController";

const router = Router();

router.post("/", createProject);
router.get("/", listProjects);
router.get("/:id/tasks", getProjectTasks);

export default router;
