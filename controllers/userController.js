const { user } = require('../models');
const crudController = require('./crudController');

exports.getUser = async (res, req) => {
  await crudController.findModel(user, res, req);
};

exports.getAllUser = async (res, req) => {
  await crudController.findAllModel(user, res, req);
};

exports.updateUser = async (res, req) => {
  await crudController.updateModel(user, res, req);
};

exports.deleteUser = async (res, req) => {
  await crudController.deleteModel(user, res, req);
};

exports.createUser = async (res, req) => {
  await crudController.createModel(user, res, req);
};
