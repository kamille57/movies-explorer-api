/* eslint-disable no-console */
/* eslint-disable consistent-return */
const Movie = require('../models/movie');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/Forbidden');
const {
  INVALID_MOVIEDATA_MESSAGE,
  BAD_REQUEST_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
  SUCCESS_DELETE_MOVIE_MESSAGE,
  SUCCESS_STATUS_CODE,
  SUCCESS_CREATION_STATUS_CODE,
} = require('../utils/errorMessages');

// Получить все карточки
module.exports.getMovies = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const movies = await Movie.find({ owner: userId });
    if (!movies) {
      throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
    }
    res.status(SUCCESS_STATUS_CODE).send(movies);
  } catch (error) {
    next(error);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user.id,
    });
    return res.status(SUCCESS_CREATION_STATUS_CODE).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(BAD_REQUEST_MESSAGE));
    }
    return next(err);
  }
};

// Удалить фильм
module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    console.log(req.params);
    const movie = await Movie.findById(movieId);
    console.log(movie);
    if (!movie) {
      throw new NotFoundError(INVALID_MOVIEDATA_MESSAGE);
    }

    if (movie.owner.toString() !== req.user.id) {
      throw new ForbiddenError(MOVIE_FORBIDDEN_MESSAGE);
    }

    await Movie.findByIdAndDelete(movieId);
    return res.status(SUCCESS_STATUS_CODE).json(SUCCESS_DELETE_MOVIE_MESSAGE);
  } catch (error) {
    next(error);
  }
};
