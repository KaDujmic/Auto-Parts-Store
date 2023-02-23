const { settings } = require('../models');
const { verifySettings, setSettings } = require('../utils/settingsService');

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
