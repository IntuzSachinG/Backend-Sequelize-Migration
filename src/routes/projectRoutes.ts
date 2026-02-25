
import { Router } from "express";
import { createProject, listProjects } from "../controllers/projectController";

const router = Router();

router.post("/", createProject);
router.get("/", listProjects);

export default router;