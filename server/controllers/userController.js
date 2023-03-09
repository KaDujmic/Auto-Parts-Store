const { user } = require('../db/models');
const crudController = require('./crudController');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
  await crudController.findModel(user, null, req, res);
};

exports.getManyUser = async (req, res) => {
  await crudController.findManyModel(user, null, req, res);
};

exports.updateUser = async (req, res) => {
  await crudController.updateModel(user, req, res);
};

exports.deleteUser = async (req, res) => {
  await crudController.deleteModel(user, req, res);
};

exports.createUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 2);
  await crudController.createModel(user, req, res);
};
