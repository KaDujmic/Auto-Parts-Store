'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('category', [
      {
        id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
        name: 'Engine',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
        name: 'Exterior',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
