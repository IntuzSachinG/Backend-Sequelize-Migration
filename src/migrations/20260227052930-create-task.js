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

    await queryInterface.addIndex("tasks", {
      fields: ["project_id"],
    });

    await queryInterface.addIndex("tasks", {
      fields: ["status"],
    });

    await queryInterface.addIndex("tasks", {
      fields: ["priority"],
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeIndex("tasks", ["project_id"]);
    await queryInterface.removeIndex("tasks", ["status"]);
    await queryInterface.removeIndex("tasks", ["priority"]);
  },
};
