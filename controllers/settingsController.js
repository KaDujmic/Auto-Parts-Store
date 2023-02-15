const { settings } = require('../models');
const crudController = require('../controllers/crudController');
const { verifyKey } = require('../utils/verifySettingsKey');

exports.getAllSettings = async (req, res) => {
  await crudController.findAllModel(settings, req, res);
};
exports.getSettings = async (req, res) => {
  await crudController.findOne(settings, req, res);
};
exports.createSettings = async (req, res) => {
  await verifyKey(settings, req, res);
  await crudController.createModel(settings, req, res);
};
