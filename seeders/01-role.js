'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('role', [
      {
        name: 'Salesperson',
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        name: 'Customer',
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
