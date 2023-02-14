'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    static associate (models) {
      notification.belongsTo(models.user, {
        foreignKey: 'user_id'
      });
      notification.belongsTo(models.order, {
        foreignKey: 'order_id'
      });
    }
  }
  notification.init({
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    order_id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
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
    hooks: {}
  });
  return notification;
};
