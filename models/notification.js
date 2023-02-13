'use strict';
const { createUUID } = require('../utils/hooks');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate (models) {
      models.User.hasMany(Notification, {
        foreignKey: {
          name: 'user_id'
        }
      });
      Notification.belongsTo(models.User, {
        foreignKey: {
          name: 'id'
        }
      });
      models.Order.hasMany(Notification, {
        foreignKey: {
          name: 'order_id'
        }
      });
      Notification.belongsTo(models.Order, {
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
