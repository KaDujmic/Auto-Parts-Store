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
        category_id: 'c97ede74-b9e2-4e22-8f75-601a4687906d',
        manufacturer_id: '4abedb72-1411-4844-a04a-58dbcd2b1a94',
        quantity: 200,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: 'c97ede74-b9e2-4e22-8f75-601a4687906d',
        name: 'piston',
        serial_number: 'BMW001',
        price: 15,
        category_id: 'c97ede74-b9e2-4e22-8f75-601a4687906d',
        manufacturer_id: '8e860a7d-e118-4e64-ba9d-0345e16994d0',
        quantity: 50,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: 'a4c9bd4a-6b68-47da-9968-a3ff2ef0fb58',
        name: 'side mirror',
        serial_number: 'M001',
        price: 122,
        category_id: 'a4c9bd4a-6b68-47da-9968-a3ff2ef0fb58',
        manufacturer_id: '4abedb72-1411-4844-a04a-58dbcd2b1a94',
        quantity: 200,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea',
        name: 'exhaust system',
        serial_number: 'BMW001',
        price: 15,
        category_id: 'a4c9bd4a-6b68-47da-9968-a3ff2ef0fb58',
        manufacturer_id: '8e860a7d-e118-4e64-ba9d-0345e16994d0',
        quantity: 50,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
