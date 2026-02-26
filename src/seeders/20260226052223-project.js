"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
        id: "11111111-1111-1111-1111-111111111111",
        name: "Website Redesign",
        client_name: "ABC Company",
        start_date: now,
        end_date: null,
        status: "active",
        created_at: now,
        updated_at: now,
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        name: "Mobile App",
        client_name: "XYZ Pvt Ltd",
        start_date: now,
        end_date: null,
        status: "planned",
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("projects", null, {});
  },
};
