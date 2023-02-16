const express = require('express');
const router = express.Router({ mergeParams: true });
const config = require('../utils/settingsHelper');

router.route('/').get((req, res) => {
  res.status(200).json(config);
});

module.exports = router;
