'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate (models) {
      models.user.hasMany(order, {
        foreignKey: {
          name: 'user_id'
        }
      });
      order.belongsTo(models.user, {
        foreignKey: {
          name: 'id'
        }
      });

      order.belongsToMany(models.item, {
        through: models.order_item,
        foreignKey: {
          name: 'order_id'
        }
      });

      order.belongsToMany(models.user, {
        through: models.notification,
        foreignKey: {
          name: 'order_id'
        }
      });
    }
  }
  order.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: DataTypes.UUID,
    delivery_address: DataTypes.STRING,
    delivery_date: DataTypes.DATEONLY,
    order_date: DataTypes.DATEONLY,
    order_status: DataTypes.STRING,
    item_list: DataTypes.JSONB,
    final_price: DataTypes.FLOAT,
    full_price: DataTypes.FLOAT
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'order',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {}
  });
  return order;
};
