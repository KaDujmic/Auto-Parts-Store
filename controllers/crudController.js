exports.findAllModel = async (Model, req, res) => {
  const offset = process.env.DEFAULT_LIMIT * (Number(req.query.page) - 1) || 0;
  const limit = Number(process.env.DEFAULT_LIMIT);
  const models = await Model.findAll({
    order: [['id', 'ASC']],
    where: { deleted: false },
    offset,
    limit,
    hooks: true
  });
  res.status(200).json({ models });
};

exports.findModel = async (Model, req, res) => {
  const model = await Model.findOne({
    where: { id: req.params.id, deleted: false },
    hooks: true
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
  res.status(200).json(model);
};

exports.deleteModel = async (Model, req, res) => {
  const model = await Model.update({ deleted: true }, {
    where: { id: req.params.id }
  });
  res.status(204).json(model);
};
