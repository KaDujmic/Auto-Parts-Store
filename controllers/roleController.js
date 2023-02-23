const { role } = require('../db/models');
const crudController = require('./crudController');

exports.getRole = async (req, res) => {
  const model = await role.findOne({
    where: { name: req.params.id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deleted'] }

  });
  res.status(200).json(model);
};

exports.getAllRole = async (req, res) => {
  await crudController.findAllModel(role, req, res);
};

exports.updateRole = async (req, res) => {
  const model = await role.update(req.body, {
    where: { name: req.params.id },
    returning: true
  });
  res.status(200).json(model);
};

exports.deleteRole = async (req, res) => {
  const model = await role.destroy({
    where: { name: req.params.id }
  });
  res.status(204).json(model);
};

exports.createRole = async (req, res) => {
  await crudController.createModel(role, req, res);
};
