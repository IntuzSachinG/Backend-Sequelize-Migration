// import { DataTypes, Model } from "sequelize";
// import { sequelize } from "../config/database";
// import { Task } from "./taskModel";

// export class Project extends Model {
//   public readonly tasks?: Task[];
// }

// Project.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     name: { type: DataTypes.STRING, allowNull: false },
//     client_name: { type: DataTypes.STRING, allowNull: false },
//     start_date: DataTypes.DATE,
//     end_date: DataTypes.DATE,
//     status: DataTypes.STRING,
//   },
//   {
//     sequelize,
//     tableName: "projects",
//     timestamps: true,
//     paranoid: true,
//     createdAt: "created_at",
//     updatedAt: "updated_at",
//     deletedAt: "deleted_at",
//   },
// );

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { Task } from "./taskModel";


// export interface ProjectAttributes {
//   id: string;
//   name: string;
//   client_name: string;
//   start_date?: Date;
//   end_date?: Date;
//   status?: string;
//   created_at?: Date;
//   updated_at?: Date;
//   deleted_at?: Date | null;
// }

// export interface ProjectCreationAttributes extends Optional<
//   ProjectAttributes,
//   "id"
// > {}

export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: string;
  public name!: string;
  public client_name!: string;
  public start_date?: Date;
  public end_date?: Date;
  public status?: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;

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
