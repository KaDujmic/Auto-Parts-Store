const { role } = require('../db/models');
const { NotFoundError } = require('../validators/errors');
const crudController = require('./crudController');

exports.getRole = async (req, res) => {
  const query = { where: { name: req.params.id } };
  await crudController.findModel(role, query, req, res);
};

exports.getManyRole = async (req, res) => {
  const query = { order: [['name', 'ASC']] };
  await crudController.findManyModel(role, query, req, res);
};

exports.updateRole = async (req, res) => {
  const updatedRole = await role.update(req.body, {
    where: { name: req.params.id },
    returning: true
  });
  if (updatedRole[0] === 0) throw new NotFoundError();
  res.status(200).json(updatedRole[1]);
};

exports.deleteRole = async (req, res) => {
  const deletedRole = await role.update({ deleted: true }, {
    where: { name: req.params.id }
  });
  if (deletedRole[0] === 0) throw new NotFoundError();
  res.status(204).json();
};

exports.createRole = async (req, res) => {
  await crudController.createModel(role, req, res);
};
