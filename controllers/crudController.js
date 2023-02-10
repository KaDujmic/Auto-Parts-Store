exports.findAllModel = async (Model, req, res) => {
  const models = await Model.findAll({
    hooks: true
  });
  res.status(200).json({ models });
};

exports.findModel = async (Model, req, res) => {
  const model = await Model.findOne({
    where: { id: req.params.id },
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
    where: { id: req.params.id },
    returning: true
  });
  res.status(200).json(model);
};

exports.deleteModel = async (Model, req, res) => {
  const model = await Model.destroy({
    where: { id: req.params.id }
  });
  res.status(204).json(model);
};
