const router = require('express').Router();

const {
  getUserInfo,
  updateProfile,
} = require('../controllers/users');

const {
  updateUserProfileSchema,
} = require('../models/validationSchemas');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', updateUserProfileSchema, updateProfile);

module.exports = router;
