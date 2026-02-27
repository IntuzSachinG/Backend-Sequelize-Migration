import { Optional } from "sequelize";

export interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  assigned_to?: string;
  due_date?: Date;
  project_id?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}


export interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id"> {}

