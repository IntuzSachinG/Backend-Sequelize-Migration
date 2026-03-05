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
    
    await queryInterface.sequelize.query(`

      update projects set end_date = now()
      where end_date is null
      
      `)
    await queryInterface.changeColumn("projects", "start_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("projects", "end_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("projects", "status", {
      type: Sequelize.ENUM("planned", "active", "completed"),
      defaultValue: "planned",
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
    await queryInterface.changeColumn("projects", "start_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("projects", "end_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn("projects", "status", {
      type: Sequelize.ENUM("planned", "active", "completed"),
      defaultValue: "planned",
      allowNull: false,
    });
  },
};
