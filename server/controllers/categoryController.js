const { category } = require('../db/models');
const crudController = require('./crudController');

exports.getCategory = async (req, res) => {
  await crudController.findModel(category, req, res);
};

exports.getManyCategory = async (req, res) => {
  await crudController.findManyModel(category, null, req, res);
};

exports.updateCategory = async (req, res) => {
  await crudController.updateModel(category, req, res);
};

exports.deleteCategory = async (req, res) => {
  await crudController.deleteModel(category, req, res);
};

exports.createCategory = async (req, res) => {
  await crudController.createModel(category, req, res);
};
