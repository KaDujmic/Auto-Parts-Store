'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    static associate (models) {
      models.category.hasMany(item, {
        foreignKey: {
          name: 'categoryId'
        }
      });
      item.belongsTo(models.category, {
        foreignKey: {
          name: 'id'
        }
      });
      models.manufacturer.hasMany(item, {
        foreignKey: {
          name: 'manufacturerId'
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
          name: 'itemId'
        }
      });
    }
  }
  item.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    price: DataTypes.FLOAT,
    categoryId: DataTypes.UUID,
    manufacturerId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
    hooks: {}
  });
  return item;
};
