import { Request, Response } from "express";
import { Task } from "../models/taskModel";

export const createTask = async (req: Request, res: Response) => {
  const task = await Task.create({
    ...req.body,
  });
  res.status(201).json(task);
};

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
    const { priority, status } = req.query;

    const whereCondition: any = {
      deleted_at: null,
    };

    if (priority) {
      whereCondition.priority = priority;
    }

    if (status) {
      whereCondition.status = status;
    }

    const tasks = await Task.findAll({
      where: whereCondition,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
