'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
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
    modelName: 'item'
  });
  return Item;
};
