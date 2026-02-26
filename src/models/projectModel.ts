import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Task } from "./taskModel";

export class Project extends Model {
  public readonly tasks?: Task[];
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    client_name: { type: DataTypes.STRING, allowNull: false },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "projects",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
);
