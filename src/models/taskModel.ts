import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Project } from "./projectModel";

export class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    priority: DataTypes.STRING,
    status: DataTypes.STRING,
    assigned_to: DataTypes.STRING,
    project_id: DataTypes.UUID,
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);

Project.hasMany(Task, { foreignKey: "project_id", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "project_id", as: "projects" });
