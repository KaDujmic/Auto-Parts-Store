const joiSchemaList = require('../validators/joiSchemaList');
const { ValidationError } = require('../validators/errors');

exports.bodyValidator = async (req, res, next) => {
  let schema = null;
  const schemaName = req.baseUrl.slice(1) + 'Schema';

  // Accepted body properties depend on whether it is a PUT or POST Request
  schema = joiSchemaList[schemaName].tailor(req.method.toLowerCase());

  const { error } = schema.validate(req.body);
  if (error) next(new ValidationError(error.details[0].message));

  next();
};
