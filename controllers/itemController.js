const { item } = require('..db/models');
const crudController = require('./crudController');

exports.getItem = async (res, req) => {
  crudController.findModel(item, res, req);
};

exports.getAllItem = async (res, req) => {
  crudController.findAllModel(item, res, req);
};

exports.updateItem = async (res, req) => {
  crudController.updateModel(item, res, req);
};

exports.deleteItem = async (res, req) => {
  crudController.deleteModel(item, res, req);
};

exports.createItem = async (res, req) => {
  crudController.createModel(item, res, req);
};
