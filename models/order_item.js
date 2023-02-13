'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_item extends Model {
    static associate (models) {
      order_item.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
      order_item.belongsTo(models.Item, {
        foreignKey: 'item_id'
      });
    }
  }
  order_item.init({
    order_id: DataTypes.UUID,
    item_id: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'order_item',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return order_item;
};