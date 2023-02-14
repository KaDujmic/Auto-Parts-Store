'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('manufacturer', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('manufacturer', { cascade: true });
  }
};
