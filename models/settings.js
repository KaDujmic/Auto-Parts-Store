'use strict';
const { createUUID } = require('../utils/hooks');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  settings.init({
    key: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'settings',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeCreate: (settings, options) => {
        createUUID(settings, options);
      }
    }
  });
  return settings;
};
