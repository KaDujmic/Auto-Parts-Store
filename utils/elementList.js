const { Sequelize } = require('../models');
const Op = Sequelize.Op;
const { NotFoundError } = require('./errors');

exports.checkAllElements = async (model, req, res) => {
  const ids = req.body.items.map(el => el.id);
  const items = await model.findAndCountAll({
    where: {
      id: { [Op.or]: ids }
    }
  });
  if (items !== ids.length) throw new NotFoundError();
};
