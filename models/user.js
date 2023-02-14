'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate (models) {
      models.role.hasMany(user, {
        foreignKey: {
          name: 'role_id'
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
          name: 'user_id'
        }
      });
    }
  }
  user.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role_name: DataTypes.UUID,
    discount: DataTypes.FLOAT,
    currency: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {}
  });
  return user;
};
