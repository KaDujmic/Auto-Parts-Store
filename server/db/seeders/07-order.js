'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('order', [
      {
        id: 'a1e679a5-f5a6-4070-8f3d-91ea156bcc1b',
        user_id: '20c1297e-58f6-4587-842b-231ff6583086',
        order_status: 'pending_confirmation',
        order_date: new Date().toISOString().split('T')[0],
        item_list: [
          { id: 'f0d0ea4d-0e40-4987-866e-154da59552c5', quantity: 2 },
          { id: '0d7c9848-2a69-407e-bfcf-9b1079fc1121', quantity: 51 }
        ],
        currency: 'EUR',
        full_price: 153,
        final_price: 140,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: '5de49635-dbd9-4ecd-9705-53731f42033b',
        user_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        order_status: 'pending_confirmation',
        order_date: new Date().toISOString().split('T')[0],
        item_list: [
          { id: 'f0d0ea4d-0e40-4987-866e-154da59552c5', quantity: 5 },
          { id: '0d7c9848-2a69-407e-bfcf-9b1079fc1121', quantity: 50 }
        ],
        currency: 'USD',
        full_price: 201,
        final_price: 190,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: 'fdc0d18f-55f9-48be-b42e-9979da9d69f2',
        user_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        order_status: 'ready_for_pickup',
        order_date: new Date().toISOString().split('T')[0],
        item_list: [
          { id: 'f0d0ea4d-0e40-4987-866e-154da59552c5', quantity: 5 },
          { id: '0d7c9848-2a69-407e-bfcf-9b1079fc1121', quantity: 50 }
        ],
        currency: 'USD',
        full_price: 100,
        final_price: 50,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: '501f51c5-e288-4771-a415-d26c9e4b63b7',
        user_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        order_status: 'pending_confirmation',
        order_date: new Date().toISOString().split('T')[0],
        item_list: [
          { id: 'f0d0ea4d-0e40-4987-866e-154da59552c5', quantity: 5 },
          { id: '0d7c9848-2a69-407e-bfcf-9b1079fc1121', quantity: 50 }
        ],
        currency: 'USD',
        full_price: 303,
        final_price: 280,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: '331bdd11-040f-467a-84f5-32e78606f5e9',
        user_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        order_status: 'pending_delivery',
        order_date: new Date().toISOString().split('T')[0],
        item_list: [
          { id: 'f0d0ea4d-0e40-4987-866e-154da59552c5', quantity: 5 },
          { id: '0d7c9848-2a69-407e-bfcf-9b1079fc1121', quantity: 50 }
        ],
        currency: 'USD',
        full_price: 122,
        final_price: 99,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      }, {
        id: '94aa7d75-08fa-495a-84ef-b077edbe5e3a',
        user_id: '20c1297e-58f6-4587-842b-231ff6583086',
        order_status: 'pending_confirmation',
        order_date: new Date().toISOString().split('T')[0],
        item_list: [
          { id: 'f0d0ea4d-0e40-4987-866e-154da59552c5', quantity: 5 },
          { id: '0d7c9848-2a69-407e-bfcf-9b1079fc1121', quantity: 50 }
        ],
        currency: 'USD',
        full_price: 1000,
        final_price: 970,
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      }
    ], {}, { item_list: { type: new Sequelize.JSONB() } });
  },

  async down (queryInterface, Sequelize) {}
};
