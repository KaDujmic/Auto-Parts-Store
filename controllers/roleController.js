const { role } = require('../models');
const crudController = require('./crudController');

exports.getRole = async (res, req) => {
  await crudController.findModel(role, res, req);
};

exports.getAllRole = async (res, req) => {
  await crudController.findAllModel(role, res, req);
};

exports.updateRole = async (res, req) => {
  await crudController.updateModel(role, res, req);
};

exports.deleteRole = async (res, req) => {
  await crudController.deleteModel(role, res, req);
};

exports.createRole = async (res, req) => {
  await crudController.createModel(role, res, req);
};
