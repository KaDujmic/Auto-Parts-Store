const { category } = require('../models');
const crudController = require('./crudController');

exports.getCategory = async (res, req) => {
  await crudController.findModel(category, res, req);
};

exports.getAllCategory = async (res, req) => {
  await crudController.findAllModel(category, res, req);
};

exports.updateCategory = async (res, req) => {
  await crudController.updateModel(category, res, req);
};

exports.deleteCategory = async (res, req) => {
  await crudController.deleteModel(category, res, req);
};

exports.createCategory = async (res, req) => {
  await crudController.createModel(category, res, req);
};
