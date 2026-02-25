 import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Project extends Model {}

Project.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
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
  }
);