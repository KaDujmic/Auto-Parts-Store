'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    static associate (models) {
      models.category.hasMany(item, {
        foreignKey: {
          name: 'category_id'
        }
      });
      item.belongsTo(models.category, {
        foreignKey: {
          name: 'id'
        }
      });
      models.manufacturer.hasMany(item, {
        foreignKey: {
          name: 'manufacturer_id'
        }
      });
      item.belongsTo(models.manufacturer, {
        foreignKey: {
          name: 'id'
        }
      });

      item.belongsToMany(models.order, {
        through: models.order_item,
        foreignKey: {
          name: 'item_id'
        }
      });
    }
  }
  item.init({
    id: DataTypes.UUID,
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
    hooks: {}
  });
  return item;
};
