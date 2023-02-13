const { Sequelize } = require('../models');
const Op = Sequelize.Op;
const { NotFoundError } = require('./errors');

exports.checkAllElements = async (model, req, res) => {
  const model_id = req.body.model_list.map(el => el.id);
  const model_list = await model.findAndCountAll({
    where: {
      id: { [Op.or]: model_id }
    }
  });
  if (model_list !== model_id) throw new NotFoundError();
};
