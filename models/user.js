'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate (models) {
      models.role.hasMany(user, {
        foreignKey: {
          name: 'roleName'
        }
      });
      user.belongsTo(models.role, {
        foreignKey: {
          name: 'id'
        }
      });

      user.belongsToMany(models.order, {
        through: models.notification,
        foreignKey: {
          name: 'userId'
        }
      });
    }
  }
  user.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    roleName: DataTypes.STRING,
    discount: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    hooks: {}
  });
  return user;
};
