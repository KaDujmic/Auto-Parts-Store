'use strict';
const { createUUID } = require('../utils/hooks');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      models.Role.hasMany(User, {
        foreignKey: {
          name: 'role_id'
        }
      });
      User.belongsTo(models.Role, {
        foreignKey: {
          name: 'id'
        }
      });
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
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeCreate: (user, options) => {
        createUUID(user, options);
      }
    }
  });
  return User;
};
