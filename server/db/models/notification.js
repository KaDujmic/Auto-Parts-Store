'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate (models) {
      notification.belongsTo(models.user, {
        foreignKey: 'userId'
      });
      notification.belongsTo(models.order, {
        foreignKey: 'orderId'
      });
    }
  }
  notification.init({
    userId: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    orderId: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    lastSent: DataTypes.DATEONLY,
    sentHistory: {
      type: DataTypes.ARRAY(DataTypes.DATEONLY),
      defaultValue: []
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'notification'
  });
  return notification;
};
