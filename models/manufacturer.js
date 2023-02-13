'use strict';
const { createUUID } = require('../utils/hooks');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Manufacturer.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Manufacturer',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeCreate: (manufacturer, options) => {
        createUUID(manufacturer, options);
      }
    }
  });
  return Manufacturer;
};
