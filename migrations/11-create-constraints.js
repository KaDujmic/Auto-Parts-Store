'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('item', {
      fields: ['category_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'category',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('item', {
      fields: ['manufacturer_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'manufacturer',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('order', {
      fields: ['user_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      references: {
        table: 'user',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('user', {
      fields: ['role_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'role',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('notification', {
      fields: ['user_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'user',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('notification', {
      fields: ['order_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'order',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('order_item', {
      fields: ['order_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'order',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('order_item', {
      fields: ['item_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'item',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {}
};
