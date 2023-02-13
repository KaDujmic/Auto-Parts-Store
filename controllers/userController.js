const { user } = require('../models');
const crudController = require('./crudController');

exports.getUser = async (res, req) => {
  crudController.findModel(user, res, req);
};

exports.getAllUser = async (res, req) => {
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
