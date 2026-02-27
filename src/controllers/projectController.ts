import { Request, Response } from "express";
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";

// !! Create Project
export const createProject = async (req: Request, res: Response) => {
  const project = await Project.create({
    ...req.body,
  });
  res.status(201).json(project);
};

// export const createProject = async (req: Request, res: Response) => {
//   try {
//     const project = await Project.create({
//       ...req.body,
//       status: req.body.status || 'active' // Default status if not provided
//     });
//     return res.status(201).json(project);
//   } catch (error) {
//     return res.status(500).json({ message: "Failed to create project" });
//   }
// };


// !! Filtering , Sorting, pagination
export const listProjects = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      status,
      sort_by = "created_at",
      order = "desc",
    } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const offset = (pageNumber - 1) * limitNumber;

    const whereCondition: any = {
      deleted_at: null,
    };

    if (status) {
      whereCondition.status = status;
    }

    const { count, rows } = await Project.findAndCountAll({
      where: whereCondition,
      limit: limitNumber,
      offset,
      order: [[sort_by as string, order as string]],
    });

    return res.json({
      total: count,
      page: pageNumber,
      totalPages: Math.ceil(count / limitNumber),
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// !! Get Project
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
