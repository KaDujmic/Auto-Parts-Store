const joiSchemaList = require('../utils/joiSchemaList');
const { ValidationError } = require('../utils/errors');

exports.bodyValidator = async (req, res, next) => {
  let schema = null;
  const schemaName = req.baseUrl.slice(1) + 'Schema';

  schema = joiSchemaList[schemaName].tailor(req.method.toLowerCase());

  const { error } = schema.validate(req.body);
  // TODO: Expect possible multiple error messages that should be bundled into one readable list
  if (error) next(new ValidationError(error.details[0].message));

  next();
};
