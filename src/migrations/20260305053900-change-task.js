"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("tasks", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.changeColumn("tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high"),
      defaultValue: "medium",
      allowNull: false,
    });

    await queryInterface.changeColumn("tasks", "status", {
      type: Sequelize.ENUM("todo", "in_progress", "done"),
      defaultValue: "todo",
      allowNull: false,
    });

    await queryInterface.changeColumn("tasks", "assigned_to", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn("tasks", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.changeColumn("tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high"),
      defaultValue: "medium",
      allowNull: false,
    });

    await queryInterface.changeColumn("tasks", "status", {
      type: Sequelize.ENUM("todo", "in_progress", "done"),
      defaultValue: "todo",
      allowNull: false,
    });

    await queryInterface.changeColumn("tasks", "assigned_to", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
