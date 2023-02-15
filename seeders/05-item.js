'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('item', [
      {
        id: 'f0d0ea4d-0e40-4987-866e-154da59552c5',
        name: 'stabilizator',
        serial_number: 'M001',
        price: 122,
        category_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
        manufacturer_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
        quantity: 200,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea',
        name: 'exhaust system',
        serial_number: 'BMW001',
        price: 15,
        category_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
        manufacturer_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
        quantity: 50,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
