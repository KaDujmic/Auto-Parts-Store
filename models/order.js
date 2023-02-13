'use strict';
const { createUUID } = require('../utils/hooks');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate (models) {
      models.User.hasMany(Order, {
        foreignKey: {
          name: 'user_id'
        }
      });
      Order.belongsTo(models.User, {
        foreignKey: {
          name: 'id'
        }
      });
    }
  }
  Order.init({
    user_id: DataTypes.UUID,
    delivery_address: DataTypes.STRING,
    delivery_date: DataTypes.DATEONLY,
    order_date: DataTypes.DATEONLY,
    order_status: DataTypes.STRING,
    items: DataTypes.JSONB,
    final_price: DataTypes.FLOAT,
    full_price: DataTypes.FLOAT
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeCreate: (order, options) => {
        createUUID(order, options);
      }
    }
  });
  return Order;
};
