const { item } = require('../models');
const crudController = require('./crudController');

exports.getItem = async (res, req) => {
  await crudController.findModel(item, res, req);
};

exports.getAllItem = async (res, req) => {
  await crudController.findAllModel(item, res, req);
};

exports.updateItem = async (res, req) => {
  await crudController.updateModel(item, res, req);
};

exports.deleteItem = async (res, req) => {
  await crudController.deleteModel(item, res, req);
};

exports.createItem = async (res, req) => {
  await crudController.createModel(item, res, req);
};
