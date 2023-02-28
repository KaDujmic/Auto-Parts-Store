const { NotFoundError } = require('../validators/errors');
const { user } = require('../db/models');

exports.findAllModel = async (Model, req, res) => {
  const offset = process.env.DEFAULT_LIMIT * (Number(req.query.page) - 1) || 0;
  const limit = Number(process.env.DEFAULT_LIMIT);
  const models = await Model.findAll({
    order: [['id', 'ASC']],
    include: user,
    where: { deleted: false },
    offset,
    limit,
    attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'deleted'] }
  });
  res.status(200).json({ models });
};

exports.findModel = async (Model, req, res) => {
  const model = await Model.findOne({
    where: { id: req.params.id, deleted: false },
    include: user,
    attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'deleted'] }
  });
  res.status(200).json(model);
};

exports.createModel = async (Model, req, res) => {
  const model = await Model.create(req.body);
  res.status(201).json(model);
};

exports.updateModel = async (Model, req, res) => {
  const model = await Model.update(req.body, {
    where: { id: req.params.id, deleted: false },
    returning: true
  });
  if (model[0] === 0) throw new NotFoundError('Requested resource could not be found. Please review the submitted parameters.');
  res.status(200).json(model);
};

exports.deleteModel = async (Model, req, res) => {
  const model = await Model.update({ deleted: true }, {
    where: { id: req.params.id },
    returning: true
  });
  if (model[0] === 0) throw new NotFoundError('Requested resource could not be found. Please review the submitted parameters.');
  res.status(204).json(model);
};
