'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  role.init({
    name: {
      primaryKey: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'role',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {}
  });
  return role;
};
