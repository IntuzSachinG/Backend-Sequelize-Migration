'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      await queryInterface.changeColumn("tasks", "due_date", {
       type: Sequelize.DATE,
      after: 'assigned_to',
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      await queryInterface.changeColumn("tasks", "due_date", {
       type: Sequelize.DATE,
      after: 'assigned_to',
      allowNull: false,
    });

  }
};
