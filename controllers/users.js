const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwt');
const User = require('../models/user');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const { NotFoundError } = require('../errors/NotFoundError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const {
  BAD_REQUEST_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_USERDATA_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  CONFLICT_USER_MESSAGE,
  SUCCESS_STATUS_CODE,
  SUCCESS_CREATION_STATUS_CODE,
} = require('../utils/errorMessages');

const SALT_ROUNDS = 10;

module.exports.getUserInfo = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(user);
  try {
    if (!user) {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    }
    return res.status(SUCCESS_STATUS_CODE).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(INVALID_USERDATA_MESSAGE));
    }
    return next(error);
  }
};

// создаёт пользователя с переданными в теле email, password и name
module.exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(String(password), SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    return res.status(SUCCESS_STATUS_CREATION_CODE).send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(BAD_REQUEST_MESSAGE));
    } if (err.code === 11000) {
      return next(new ConflictError(CONFLICT_USER_MESSAGE));
    }

    return next(err);
  }
};

// проверяет переданные в теле почту и пароль и возвращает JWT
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
    }
    const isValidPassword = await bcrypt.compare(String(password), user.password);
    if (!isValidPassword) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
    }
    const token = generateToken({ id: user._id });
    res.cookie('jwt', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: true });
    return res.status(SUCCESS_STATUS_CODE).send({ token, email });
  } catch (error) {
    return next(error);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      about
    }, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    }
    return res.status(SUCCESS_STATUS_CODE).json(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(INVALID_USERDATA_MESSAGE));
    }
    return next(error);
  }
};
