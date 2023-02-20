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
    status: DataTypes.STRING,
    last_sent: DataTypes.DATE,
    sent_history: DataTypes.JSONB,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'notification',
    hooks: {}
  });
  return notification;
};
