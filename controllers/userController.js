const { user } = require('..db/models');
const crudController = require('./crudController');

exports.getUser = async (res, req) => {
  crudController.getUser(user, res, req);
};

exports.getAllUsers = async (res, req) => {
  crudController.getAllUsers(user, res, req);
};

exports.updateUser = async (res, req) => {
  crudController.updateUser(user, res, req);
};

exports.deleteUser = async (res, req) => {
  crudController.deleteUser(user, res, req);
};

exports.createUser = async (res, req) => {
  crudController.createUser(user, res, req);
};
