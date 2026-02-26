"use strict";
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

    await queryInterface.bulkInsert("tasks", [
      {
        id: "33333333-3333-3333-3333-333333333333",
        title: "Design Homepage",
        description: "Create UI for homepage",
        priority: "high",
        status: "in_progress",
        assigned_to: "Sachin",
        project_id: "11111111-1111-1111-1111-111111111111",
        created_at: now,
        updated_at: now,
      },
      {
        id: "44444444-4444-4444-4444-444444444444",
        title: "Setup Backend",
        description: "Create API structure",
        priority: "medium",
        status: "todo",
        assigned_to: "Rahul",
        project_id: "22222222-2222-2222-2222-222222222222",
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

    await queryInterface.bulkDelete("tasks", null, {});
  },
};
