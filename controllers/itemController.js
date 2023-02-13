const { item } = require('..db/models');
const crudController = require('./crudController');

exports.getUser = async (res, req) => {
  crudController.getUser(item, res, req);
};

exports.getAllUsers = async (res, req) => {
  crudController.getAllUsers(item, res, req);
};

exports.updateUser = async (res, req) => {
  crudController.updateUser(item, res, req);
};

exports.deleteUser = async (res, req) => {
  crudController.deleteUser(item, res, req);
};

exports.createUser = async (res, req) => {
  crudController.createUser(item, res, req);
};
