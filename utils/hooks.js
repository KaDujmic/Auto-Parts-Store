const { v4: uuidv4 } = require('uuid');

// UUID creation
exports.createUUID = (data, options) => {
  data.id = uuidv4();
};
