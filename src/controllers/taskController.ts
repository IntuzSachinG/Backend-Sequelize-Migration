import { Request, Response } from "express";
import { Task } from "../models/taskModel";
import { Op } from "sequelize";
import { Project } from "../models";

// !! Create Task
export const createTask = async (req: Request, res: Response) => {
  const task = await Task.create({
    ...req.body,
  });
  res.status(201).json(task);
};



// !! Update Task Status
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.update({ status: req.body.status });

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
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
    const offset = (pageNumber - 1) * limitNumber;

    const whereCondition: any = {
      deleted_at: null,
    };

    //!! Filtering
    if (priority) {
      whereCondition.priority = priority;
    }

    if (status) {
      whereCondition.status = status;
    }

    if (project_id) {
      whereCondition.project_id = project_id;
    }

    //!! Search (title & assigned_to)
    if (search) {
      whereCondition[Op.or] = [
        {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          assigned_to: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    const { count, rows } = await Task.findAndCountAll({
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
