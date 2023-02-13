'use strict';
const { createUUID } = require('../utils/hooks');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate (models) {
      models.Category.hasMany(Item, {
        foreignKey: {
          name: 'category_id'
        }
      });
      Item.belongsTo(models.Category, {
        foreignKey: {
          name: 'id'
        }
      });
      models.Manufacturer.hasMany(Item, {
        foreignKey: {
          name: 'manufacturer_id'
        }
      });
      Item.belongsTo(models.Manufacturer, {
        foreignKey: {
          name: 'id'
        }
      });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category_id: DataTypes.UUID,
    manufacturer_id: DataTypes.UUID,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
      beforeCreate: (item, options) => {
        createUUID(item, options);
      }
    }
  });
  return Item;
};
