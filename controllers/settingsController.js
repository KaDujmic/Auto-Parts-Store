const { settings } = require('../models');
const crudController = require('../controllers/crudController');
const { verifySettings } = require('../utils/settingsService');

exports.getAllSettings = async (req, res) => {
  await crudController.findAllModel(settings, req, res);
};
exports.getSettings = async (req, res) => {
  await crudController.findOne(settings, req, res);
};
exports.createSettings = async (req, res) => {
  await verifySettings(settings, req, res);
  // eslint-disable-next-line no-unused-vars
  const [model] = await settings.upsert({
    key: req.body.key,
    value: req.body.value,
    template: req.body.template
  }, {
    returning: true
  });
  res.status(200).json(model);
};
