const { manufacturer } = require('../models');
const crudController = require('./crudController');

exports.getManufacturer = async (req, res) => {
  await crudController.findModel(manufacturer, req, res);
};

exports.getAllManufacturer = async (req, res) => {
  await crudController.findAllModel(manufacturer, req, res);
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
