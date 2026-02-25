import { Router } from "express";
import {
  createTask,
  updateTaskStatus,
  filterTasks,
  getTasks,
} from "../controllers/taskController";

const router = Router();

router.post("/", createTask);
router.patch("/:id/status", updateTaskStatus);
router.get("/", filterTasks);
router.get("/", getTasks);

export default router;
