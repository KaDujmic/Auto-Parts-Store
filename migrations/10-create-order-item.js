'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order_item', {
      order_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      item_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      delivery_date: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
        enum: ['pending', 'delivered']
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_item', {});
  }
};
