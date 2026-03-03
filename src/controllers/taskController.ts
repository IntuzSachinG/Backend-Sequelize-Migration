import { Request, Response, NextFunction } from "express";
import { Task } from "../models/taskModel";
import { Op } from "sequelize";
import { Project } from "../models";

// Create Project
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { project_id } = req.body;

    const project = await Project.findByPk(project_id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot create task. Project is already completed",
      });
    }

    const task = await Task.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Update Task Status
export const updateTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = String(req.params.id);

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const project = await Project.findByPk(task.project_id);

    if (project?.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot update task. Project is completed",
      });
    }

    await task.update({ status: req.body.status });

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Pagination , filtering , searching , sorting
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      priority,
      status,
      project_id,
      search,
      page = "1",
      limit = "10",
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

    if (priority !== undefined) {
      if (!priority) {
        return res.status(400).json({
          success: false,
          message: "Priority Cannot be empty",
        });
      }
      whereCondition.priority = priority;
    }

    if (status !== undefined) {
      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status Cannot be empty",
        });
      }
      whereCondition.status = status;
    }

    if (project_id) whereCondition.project_id = project_id;

    if (search) {
      whereCondition[Op.or] = [
        {
          title: { [Op.like]: `%${search}%` },
        },
        {
          assigned_to: { [Op.like]: `%${search}%` },
        },
      ];
    }

    const allowedSortFields = ["created_at", "priority", "status"];

    const sortField = allowedSortFields.includes(sort_by as string)
      ? sort_by
      : "created_at";

    const { count, rows } = await Task.findAndCountAll({
      where: whereCondition,
      limit: limitNumber,
      offset,
      order: [[sortField as string, order as string]],
    });

    // !! Add this From Code Review Feedback
    if (project_id) {
      return res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        project_id,
        total: count,
        page: pageNumber,
        totalPages: Math.ceil(count / limitNumber),
        tasks: rows,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      total: count,
      page: pageNumber,
      totalPages: Math.ceil(count / limitNumber),
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};
