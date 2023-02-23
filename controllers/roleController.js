const { role } = require('../models');
const crudController = require('./crudController');

exports.getRole = async (req, res) => {
  const foundRole = await role.findOne({
    where: { name: req.params.id },
    hooks: true
  });
  res.status(200).json(foundRole);
};

exports.getAllRole = async (req, res) => {
  const foundRoles = await role.findAll({ where: { deleted: false } });
  res.status(200).json(foundRoles);
};

exports.updateRole = async (req, res) => {
  const updatedRole = await role.update(req.body, {
    where: { name: req.params.id },
    returning: true
  });
  res.status(200).json(updatedRole);
};

exports.deleteRole = async (req, res) => {
  await role.update({ deleted: true }, {
    where: { name: req.params.id }
  });
  res.status(204).json();
};

exports.createRole = async (req, res) => {
  await crudController.createModel(role, req, res);
};
