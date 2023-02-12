'use strict';
const uuid = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role_id: DataTypes.UUID,
    discount: DataTypes.FLOAT,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  User.beforeCreate(user => { user.id = uuid.v4(); });
  return User;
};
