'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("projects", [
      {
        id: "890196e3-574c-4a98-9584-ab3e591e9c80",
        name: "Add Scroll Effect",
        client_name: "Mr.RonitRoy",
        start_date: now,
        end_date: null,
        status: "completed",
        created_at: now,
        updated_at: now,
      },
      {
        id: "4b35ea3e-f4af-4e09-ba8b-92efa7d55299",
        name: "Add Logout Button",
        client_name: "Mr.Spider",
        start_date: now,
        end_date: null,
        status: "planned",
        created_at: now,
        updated_at: now,
      },
      {
        id: "d1043780-81b0-4f42-bb41-3853e1748f63",
        name: "Mobile Mini App",
        client_name: "Mr.Miller 360 Degree",
        start_date: now,
        end_date: null,
        status: "active",
        created_at: now,
        updated_at: now,
      }
    ]);


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("projects", null, {});
  }
};
