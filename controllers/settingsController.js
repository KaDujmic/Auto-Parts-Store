const { settings } = require('../db/models');
const { verifySettings, setSettings } = require('../services/settingsService');

exports.getAllSettings = async (req, res) => {
  const foundSettings = await settings.findAll({ where: { deleted: false } });
  res.status(200).json(foundSettings);
};

exports.getSettings = async (req, res) => {
  const foundSetting = await settings.findOne({
    where: { key: req.params.id, deleted: false },
    hooks: true
  });
  res.status(200).json(foundSetting);
};

exports.updateSettings = async (req, res) => {
  await verifySettings(req);
  const [model] = await settings.update(req.body, {
    where: { key: req.params.id },
    returning: true
  });

  // Refresh current cache state on db update/create
  setSettings();

  res.status(200).json(model);
};
