const router = require('express').Router();
const { LOGOUT_MESSAGE } = require('../utils/errorMessages');
const {
  login,
  createUser,
} = require('../controllers/users');

const {
  createUserSchema,
  loginSchema,
} = require('../models/validationSchemas');

// POST /создаёт пользователя с переданными в теле email, password и name
router.post('/signup', createUserSchema, createUser);

// POST /проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', loginSchema, login);

// POST /При запросе к роуту удалится JWT из куков пользователя
router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send(LOGOUT_MESSAGE);
});

module.exports = router;
