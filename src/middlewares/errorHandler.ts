import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: err.errors[0].message,
    });
  }

  if (err.name === "SequelizeDatabaseError") {
    return res.status(400).json({
      success: false,
      message: "Database constraint failed",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
