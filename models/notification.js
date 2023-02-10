'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
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
    createdAt: 'created_at'
  });
  return notification;
};
