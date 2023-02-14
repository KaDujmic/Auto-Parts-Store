'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      full_name: {
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      role_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.FLOAT
      },
      currency: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('user', { cascade: true });
  }
};
