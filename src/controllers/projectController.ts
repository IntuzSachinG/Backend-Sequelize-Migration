import { Request, Response } from "express";
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";

export const createProject = async (req: Request, res: Response) => {
  const project = await Project.create({
    ...req.body,
  });
  res.status(201).json(project);
};

export const listProjects = async (req: Request, res: Response) => {
  const projects = await Project.findAll();
  res.json(projects);
};

export const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: Task,
          as: "tasks",
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project.tasks || []);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
