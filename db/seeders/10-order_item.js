'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('order_item', [
      {
        order_id: 'a1e679a5-f5a6-4070-8f3d-91ea156bcc1b',
        item_id: 'a4c9bd4a-6b68-47da-9968-a3ff2ef0fb58',
        delivery_date: new Date().toISOString().split('T')[0],
        status: 'pending',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        order_id: 'a1e679a5-f5a6-4070-8f3d-91ea156bcc1b',
        item_id: 'f0d0ea4d-0e40-4987-866e-154da59552c5',
        delivery_date: new Date().toISOString().split('T')[0],
        status: 'pending',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        order_id: 'a1e679a5-f5a6-4070-8f3d-91ea156bcc1b',
        item_id: 'c97ede74-b9e2-4e22-8f75-601a4687906d',
        delivery_date: new Date().toISOString().split('T')[0],
        status: 'pending',
        deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {}
};
