'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('manufacturer', [
      {
        id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
        brand: 'Mercedes',
        model: 'E class',
        deleted: false
      },
      {
        id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
        brand: 'BMW',
        model: '3 series',
        deleted: false
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
