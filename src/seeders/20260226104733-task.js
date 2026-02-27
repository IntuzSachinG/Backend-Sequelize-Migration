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
        id: "9363e1c9-d325-46dd-8a1a-9b08b3b53b7b",
        title: "Design Homepage",
        description: "Create UI for homepage",
        priority: "high",
        status: "in_progress",
        assigned_to: "Sachin",
        due_date: now,
        project_id: "7113c952-39b2-41e5-a0d8-4360f2520476",
        created_at: now,
        updated_at: now,
      },
      {
        id: "8a0b7c3e-8097-4dc2-8cc5-21d7a8ad1891",
        title: "Setup Backend6",
        description: "Create API structure",
        priority: "medium",
        status: "todo",
        assigned_to: "Rahul",
        due_date: now,
        project_id: "acad8f2b-ae40-4256-9fe9-071ce056fe3b",
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
