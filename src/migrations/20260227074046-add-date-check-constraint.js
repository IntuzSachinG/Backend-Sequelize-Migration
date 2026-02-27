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

     await queryInterface.addConstraint('projects', { 
      fields: ['start_date', 'end_date'],
      type: 'check',
      where: {
        end_date: {
          [Sequelize.Op.gt]: Sequelize.col('start_date')
        }
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('projects');
  }
};
