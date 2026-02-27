import { DataTypes, Model, Optional, Association, ForeignKey } from "sequelize";
import { sequelize } from "../config/database";
import { Project } from "./projectModel";
import {
  TaskAttributes,
  TaskCreationAttributes,
} from "../interface/taskModel_interface";

export class Task
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  public id!: string;
  public title!: string;
  public description?: string;
  public priority?: string;
  public status?: string;
  public assigned_to?: string;
  public due_date?: Date;
  public project_id?: ForeignKey<Project["id"]>;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;

  public readonly project?: Project;

  public static associations: {
    project: Association<Task, Project>;
  };
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description:{ type: DataTypes.TEXT,allowNull: false },
    priority: {type:DataTypes.STRING,allowNull: false} ,
    status: {type:DataTypes.STRING,allowNull: false} ,
    assigned_to: {type:DataTypes.STRING,allowNull: false} ,
    due_date: {type:DataTypes.DATE,allowNull: false },
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

Project.hasMany(Task, {
  foreignKey: "project_id",
  as: "tasks",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});
