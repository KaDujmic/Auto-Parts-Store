'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID
      },
      delivery_address: {
        type: Sequelize.STRING
      },
      delivery_date: {
        type: Sequelize.DATEONLY
      },
      order_date: {
        type: Sequelize.DATEONLY
      },
      order_status: {
        type: Sequelize.STRING
      },
      items: {
        type: Sequelize.JSONB
      },
      final_price: {
        type: Sequelize.FLOAT
      },
      full_price: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order', { cascade: true });
  }
};
