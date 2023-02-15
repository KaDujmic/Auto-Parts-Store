const { manufacturer } = require('../models');
const crudController = require('./crudController');

exports.getManufacturer = async (res, req) => {
  await crudController.findModel(manufacturer, res, req);
};

exports.getAllManufacturer = async (res, req) => {
  await crudController.findAllModel(manufacturer, res, req);
};

exports.updateManufacturer = async (res, req) => {
  await crudController.updateModel(manufacturer, res, req);
};

exports.deleteManufacturer = async (res, req) => {
  await crudController.deleteModel(manufacturer, res, req);
};

exports.createManufacturer = async (res, req) => {
  await crudController.createModel(manufacturer, res, req);
};
