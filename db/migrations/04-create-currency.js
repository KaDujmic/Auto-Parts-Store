'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('currency', {
      date: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      rates: {
        type: Sequelize.JSONB
      },
      deleted: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('currency', { cascade: true });
  }
};
