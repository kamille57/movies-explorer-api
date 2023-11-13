const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieSchema,
  deleteMovieSchema,
} = require('../models/validationSchemas');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/movies', getMovies);

// создаёт фильм с переданными в теле country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', createMovieSchema, createMovie);

// удаляет сохранённый фильм по id
router.delete('/movies/:movieId', deleteMovieSchema, deleteMovie);

module.exports = router;
