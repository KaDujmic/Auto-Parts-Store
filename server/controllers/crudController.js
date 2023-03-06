const { NotFoundError, ValidationError } = require('../validators/errors');
const EXCLUDE_LIST = ['createdAt', 'updatedAt', 'password', 'deleted'];

exports.findManyModel = async (Model, customQuery, req, res) => {
  // Default query used by all requests
  const query = {
    attributes: { exclude: EXCLUDE_LIST },
    where: [{ deleted: false }],
    order: [],
    include: []
  };
  // If customQuery is not handling ordering, use this default
  if (customQuery && !('order' in customQuery)) {
    query.order.push(['id', 'ASC']);
  }

  // Addition of any custom query parameters forwarded to this function
  if (customQuery) {
    for (const property in customQuery) {
      query[property].push(customQuery[property]);
    }
  }

  // If the request is asking for a specific page, do not return the entire entity
  // The specific page will be returned, and the total number of pages for frontend pagination purposes
  if (req.query.page) {
    if (isNaN(req.query.page) || req.query.page < 1) {
      throw new ValidationError('Page requested is not a valid number.');
    }

    query.offset = process.env.DEFAULT_LIMIT * (Number(req.query.page) - 1);
    query.limit = Number(process.env.DEFAULT_LIMIT);

    const pageCount = await findNumberOfPages(Model, query);

    res.set('Access-Control-Expose-Headers', 'X-Total-Pages');
    res.set('X-Total-Pages', pageCount);
  }

  const models = await Model.findAll(query);
  res.status(200).json(models);
};

exports.findModel = async (Model, customQuery, req, res) => {
  const query = {
    attributes: { exclude: EXCLUDE_LIST },
    where: [{ deleted: false }],
    include: []
  };
  // If customQuery does not exist OR it does but is not handling search by unique value, use this default
  if (!customQuery || (customQuery && !('where' in customQuery))) {
    query.where.push({ id: req.params.id });
  }

  // Addition of any custom query parameters forwarded to this function
  if (customQuery) {
    for (const property in customQuery) {
      query[property].push(customQuery[property]);
    }
  }

  const model = await Model.findOne(query);
  if (!model) throw new NotFoundError();
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
  if (model[0] === 0) throw new NotFoundError();
  res.status(200).json(model[1]);
};

exports.deleteModel = async (Model, req, res) => {
  const model = await Model.update({ deleted: true }, {
    where: { id: req.params.id },
    returning: true
  });
  if (model[0] === 0) throw new NotFoundError();
  res.status(204).json();
};

const findNumberOfPages = async (Model, query) => {
  const rowCount = await Model.count(query);
  const pageCount = Math.ceil(rowCount / process.env.DEFAULT_LIMIT);

  if (pageCount <= 0) {
    throw new NotFoundError();
  }

  return (pageCount);
};
