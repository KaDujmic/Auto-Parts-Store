const { ValidationError } = require('sequelize');

exports.verifyKey = async (model, req, res) => {
  const receivedKey = req.body.key;
  const dbKey = await model.findAll({
    where: {
      key: receivedKey
    }
  });
  if (!dbKey.length) {
    throw new ValidationError('Bad Request');
  }
};
