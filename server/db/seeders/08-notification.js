'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notification', [
      {
        user_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        order_id: 'fdc0d18f-55f9-48be-b42e-9979da9d69f2',
        last_sent: new Date().toISOString().split('T')[0],
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {}
};
