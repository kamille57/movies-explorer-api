require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { NotFoundError } = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NOT_FOUND_MESSAGE } = require('./utils/errorMessages');

const router = require('./routes');
const { errorsHandler } = require('./middlewares/errorsHandler');
const rateLimiterMiddleware = require('./middlewares/rateLimiter');

const { PORT, DB_ADRESS } = process.env;
const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'https://movie.nomoredomainsmonster.ru', 'https://api.movie.nomoredomainsmonster.ru'], credentials: true }));
mongoose.connect(DB_ADRESS, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(rateLimiterMiddleware);

app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
});

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
