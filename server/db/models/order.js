'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate (models) {
      models.user.hasMany(order, {
        foreignKey: {
          name: 'id'
        }
      });
      order.belongsTo(models.user, {
        foreignKey: {
          name: 'userId'
        }
      });

      order.belongsToMany(models.item, {
        through: models.order_item,
        foreignKey: {
          name: 'orderId'
        }
      });

      order.belongsToMany(models.user, {
        through: models.notification,
        foreignKey: {
          name: 'orderId'
        }
      });
    }
  }
  order.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    userId: DataTypes.UUID,
    deliveryAddress: DataTypes.STRING,
    orderDate: DataTypes.DATEONLY,
    orderStatus: DataTypes.STRING,
    itemList: DataTypes.JSONB,
    finalPrice: DataTypes.FLOAT,
    fullPrice: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'order'
  });
  return order;
};
