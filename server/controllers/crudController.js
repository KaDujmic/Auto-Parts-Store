const { NotFoundError } = require('../validators/errors');
const EXCLUDE_LIST = ['createdAt', 'updatedAt', 'password', 'deleted'];

exports.findManyModel = async (Model, customQuery, req, res) => {
  // Default query used by all requests
  const query = {
    order: [['id', 'ASC']],
    where: [{ deleted: false }],
    attributes: { exclude: EXCLUDE_LIST }
  };

  // Addition of any custom query parameters forwarded to this function
  if (customQuery) {
    for (const property in customQuery) {
      query[property].push(customQuery[property]);
    }
  }

  // If the request is asking for a specific page, do not query/return the entire entity
  if (req.query.page) {
    query.offset = process.env.DEFAULT_LIMIT * (Number(req.query.page) - 1);
    query.limit = Number(process.env.DEFAULT_LIMIT);
  }

  const models = await Model.findAll(query);
  res.status(200).json(models);
};

exports.findModel = async (Model, req, res) => {
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

exports.findNumberOfPages = async (Model, query, req, res) => {
  const rowCount = await Model.count(query);
  const pageCount = Math.ceil(rowCount / process.env.DEFAULT_LIMIT);

  if (pageCount > 0) {
    res.status(200).json(pageCount);
  } else {
    throw new NotFoundError('Requested resource could not be found. Please review the submitted parameters.');
  }
};
