import { DataTypes, Model, Optional } from "sequelize";


export interface ProjectAttributes {
  id: string;
  name: string;
  client_name: string;
  start_date?: Date;
  end_date?: Date;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface ProjectCreationAttributes extends Optional<
  ProjectAttributes,
  "id"
> {}