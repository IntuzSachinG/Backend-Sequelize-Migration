"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:Sequelize.UUIDV4,
      },
      title: { type: Sequelize.STRING, allowNull: false },
      description: Sequelize.TEXT,
      priority: {
        type: Sequelize.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },
      status: {
        type: Sequelize.ENUM("todo", "in_progress", "done"),
        defaultValue: "todo",
      },
      assigned_to: Sequelize.STRING,
      
      project_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "projects", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tasks");
  },
};
