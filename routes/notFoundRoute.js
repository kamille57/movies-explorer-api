const express = require('express');
const { NotFoundError } = require('../errors/NotFoundError');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

const router = express.Router();

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

module.exports = router;
