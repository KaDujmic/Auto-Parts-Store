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
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('currency', { cascade: true });
  }
};
