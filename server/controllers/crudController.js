const { NotFoundError } = require('../validators/errors');
const EXCLUDE_LIST = ['createdAt', 'updatedAt', 'password', 'deleted'];

exports.findAllModel = async (Model, query, req, res) => {
  const offset = process.env.DEFAULT_LIMIT * (Number(req.query.page) - 1) || 0;
  const limit = Number(process.env.DEFAULT_LIMIT);
  const models = await Model.findAll({
    order: [['id', 'ASC']],
    where: { deleted: false },
    offset,
    limit,
    attributes: { exclude: EXCLUDE_LIST }
  });
  res.status(200).json({ models });
};

exports.findModel = async (Model, query, req, res) => {
  const model = await Model.findOne({
    where: { id: req.params.id, deleted: false },
    attributes: { exclude: EXCLUDE_LIST }
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

exports.getNumberOfPages = async (Model, req, res) => {
  const rowCount = await Model.count();
  const pageCount = rowCount / process.env.DEFAULT_LIMIT;

  if (pageCount > 0) {
    res.status(200).json(Math.ceil(pageCount));
  } else {
    throw new NotFoundError('Requested resource could not be found. Please review the submitted parameters.');
  }
};
