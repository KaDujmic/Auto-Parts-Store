'use strict';
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
    key: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    value: DataTypes.JSONB
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'settings',
    timestamps: false,
    hooks: {}
  });
  return settings;
};
