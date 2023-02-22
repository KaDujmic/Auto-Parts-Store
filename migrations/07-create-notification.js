'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notification', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      order_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      last_sent: {
        type: Sequelize.DATEONLY
      },
      sent_history: {
        type: Sequelize.ARRAY(Sequelize.DATEONLY)
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
    await queryInterface.dropTable('notification', { cascade: true });
  }
};
