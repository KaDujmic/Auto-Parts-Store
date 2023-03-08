const { settings } = require('../db/models');
const { NotFoundError } = require('../validators/errors');
const { verifySettings, setSettings } = require('../services/settingsService');
const crudController = require('./crudController');

exports.getManySetting = async (req, res) => {
  const query = { order: [['key', 'ASC']] };
  await crudController.findManyModel(settings, query, req, res);
};

exports.getSettings = async (req, res) => {
  const query = { where: { key: req.params.id } };
  await crudController.findModel(settings, query, req, res);
};

exports.updateSettings = async (req, res) => {
  await verifySettings(req);
  const [model] = await settings.upsert(req.body, {
    where: { key: req.params.id },
    returning: true
  });

  // Refresh current cache state on db update/create
  setSettings();

  res.status(200).json(model);
};
exports.deleteSettings = async (req, res) => {
  const deletedSettings = await settings.update({ deleted: true }, {
    where: { key: req.params.id }
  });
  if (deletedSettings[0] === 0) throw new NotFoundError();
  res.status(204).json();
};
