const { Sequelize } = require('../models');
const Op = Sequelize.Op;
const { NotFoundError } = require('./errors');

function onlyUnique (value, index, array) {
  return array.indexOf(value) === index;
}

exports.checkAllElements = async (model, req, res) => {
  const idList = req.body.itemList.map(el => el.id);
  const uniqueIdList = idList.filter(onlyUnique);
  const items = await model.findAndCountAll({
    where: {
      id: { [Op.or]: uniqueIdList }
    }
  });
  if (items.count !== uniqueIdList.length) throw new NotFoundError();
};
