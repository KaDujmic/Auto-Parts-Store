const { role } = require('../db/models');
const { NotFoundError } = require('../validators/errors');
const crudController = require('./crudController');

exports.getRole = async (req, res) => {
  const foundRole = await role.findOne({
    where: { name: req.params.id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deleted'] }

  });
  res.status(200).json(foundRole);
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
  res.status(200).json(updatedRole);
};

exports.deleteRole = async (req, res) => {
  const model = await role.update({ deleted: true }, {
    where: { name: req.params.id }
  });
  if (model[0] === 0) throw new NotFoundError('Requested resource could not be found. Please review the submitted parameters.');
  res.status(204).json();
};

exports.createRole = async (req, res) => {
  await crudController.createModel(role, req, res);
};
