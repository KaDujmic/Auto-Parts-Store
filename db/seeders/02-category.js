'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('category', [
      {
        id: 'c97ede74-b9e2-4e22-8f75-601a4687906d',
        name: 'Engine',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'a4c9bd4a-6b68-47da-9968-a3ff2ef0fb58',
        name: 'Exterior',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '6ed632dd-f323-43dd-b596-287c17c8a7ea',
        name: 'Interior',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
