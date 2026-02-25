
import { Request, Response } from "express";
import { Project } from "../models/projectModel";
// import { Task } from "../models/taskModel";
import { v4 as uuidv4 } from "uuid";

export const createProject = async (req: Request, res: Response) => {
  const project = await Project.create({
    id: uuidv4(),
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  });
  res.status(201).json(project);
};

export const listProjects = async (_: Request, res: Response) => {
  const projects = await Project.findAll();
  res.json(projects);
};



// export const getProjectTasks = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const project = await Project.findByPk(id, {
//       include: [
//         {
//           model: Task,
//           as: "tasks",
//           where: { deleted_at: null },
//           required: false,
//         },
//       ],
//     });

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     res.json(project.tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };