const { manufacturer } = require('../db/models');
const crudController = require('./crudController');

exports.getManufacturer = async (req, res) => {
  await crudController.findModel(manufacturer, null, req, res);
};

exports.getManyManufacturer = async (req, res) => {
  await crudController.findManyModel(manufacturer, null, req, res);
};

exports.updateManufacturer = async (req, res) => {
  await crudController.updateModel(manufacturer, req, res);
};

exports.deleteManufacturer = async (req, res) => {
  await crudController.deleteModel(manufacturer, req, res);
};

exports.createManufacturer = async (req, res) => {
  await crudController.createModel(manufacturer, req, res);
};
