const { user } = require('..db/models');
const crudController = require('./crudController');

exports.getUser = async (res, req) => {
  crudController.findModel(user, res, req);
};

exports.getAllUsers = async (res, req) => {
  crudController.findAllModel(user, res, req);
};

exports.updateUser = async (res, req) => {
  crudController.updateModel(user, res, req);
};

exports.deleteUser = async (res, req) => {
  crudController.deleteModel(user, res, req);
};

exports.createUser = async (res, req) => {
  crudController.createModel(user, res, req);
};
