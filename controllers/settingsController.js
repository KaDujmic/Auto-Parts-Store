const { settings } = require('../models');
const crudController = require('../controllers/crudController');
const { verifySettings, setSettings } = require('../utils/settingsService');

exports.getAllSettings = async (req, res) => {
  await crudController.findAllModel(settings, req, res);
};
exports.getSettings = async (req, res) => {
  await crudController.findOne(settings, req, res);
};
exports.createSettings = async (req, res) => {
  await verifySettings(req);

  const [model] = await settings.upsert({
    key: req.body.key,
    value: req.body.value
  }, {
    returning: true
  });

  // Refresh current cache state on db update/create
  setSettings();

  res.status(200).json(model);
};
