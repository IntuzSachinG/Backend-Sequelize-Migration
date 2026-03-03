import { Request, Response, NextFunction } from "express";
import { Project } from "../models/projectModel";
import { Task } from "../models/taskModel";

// Create Project
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { start_date, end_date } = req.body;
    if (new Date(end_date) <= new Date(start_date)) {
      return res.status(400).json({
        success: false,
        message: "End date must be greater than start date",
      });
    }
    const project = await Project.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Pagination , sorting , filtering
export const listProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
   
    // Add this when wrong data pass
    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Page must be a number greater than 0",
      });
    }
    
    // Add this when wrong data pass
    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "limit must be a number greater than 0",
      });
    }

    const offset = (pageNumber - 1) * limitNumber;

    const whereCondition: any = {
      deleted_at: null,
    };

    if (status) {
      whereCondition.status = status;
    }

    const allowedSortFields = ["created_at", "name", "status"];
    const sortField = allowedSortFields.includes(sort_by as string)
      ? sort_by
      : "created_at";

    const { count, rows } = await Project.findAndCountAll({
      where: whereCondition,
      limit: limitNumber,
      offset,
      order: [[sortField as string, order as string]],
    });

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      total: count,
      page: pageNumber,
      totalPages: Math.ceil(count / limitNumber),
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get projects

export const getProjectTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    const project = await Project.findByPk(id, {
      include: [{ model: Task, as: "tasks" }],
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project with tasks fetched successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
