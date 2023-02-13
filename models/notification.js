'use strict';
const { createUUID } = require('../utils/hooks');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate (models) {
      models.user.hasMany(notification, {
        foreignKey: {
          name: 'user_id'
        }
      });
      notification.belongsTo(models.user, {
        foreignKey: {
          name: 'id'
        }
      });
      models.order.hasMany(notification, {
        foreignKey: {
          name: 'order_id'
        }
      });
      notification.belongsTo(models.order, {
        foreignKey: {
          name: 'id'
        }
      });
    }
  }
  notification.init({
    user_id: DataTypes.UUID,
    order_id: DataTypes.UUID,
    status: DataTypes.STRING,
    last_sent: DataTypes.DATE,
    sent_history: DataTypes.JSONB
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'notification',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeCreate: (notification, options) => {
        createUUID(notification, options);
      }
    }
  });
  return notification;
};
