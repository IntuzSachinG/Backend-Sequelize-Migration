
import { Request, Response } from "express";
import {Task} from "../models/taskModel";

import { v4 as uuidv4 } from "uuid";

export const createTask = async (req: Request, res: Response) => {
  const task = await Task.create({
    id: uuidv4(),
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  });
  res.status(201).json(task);
};

// export const updateTaskStatus = async (req: Request, res: Response) => {
//   const task = await Task.findByPk(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });

//   await task.update({ status: req.body.status });
//   res.json(task);
// };

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

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

export const filterTasks = async (req: Request, res: Response) => {
  const { priority, status } = req.query;

  const tasks = await Task.findAll({
    where: {
      ...(priority && { priority }),
      ...(status && { status }),
    },
  });

  res.json(tasks);
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
