const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля - 2'],
    maxlength: [30, 'Максимальная длина поля - 30'],
  },
  director: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля - 2'],
    maxlength: [30, 'Максимальная длина поля - 30'],
  },
  duration: {
    type: Number,
    required: [true, 'Это поле должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля - 2'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
