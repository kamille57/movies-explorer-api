const MONGO_CONFLICT_MESSAGE = 'Данный ресурс уже существует на сервере.';
const BAD_REQUEST_MESSAGE = 'Ошибка запроса: все поля должны быть заполнены.';

const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден.';
const INVALID_USER_ID_MESSAGE = 'Неверный идентификатор пользователя.';
const INVALID_USERDATA_MESSAGE = 'Некорректные данные пользователя.';

const INVALID_MOVIEDATA_MESSAGE = 'Некорректные данные id фильма.';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм не найден.';
const MOVIE_FORBIDDEN_MESSAGE = 'Доступ к фильму запрещен.';
const SUCCESS_DELETE_MOVIE_MESSAGE = 'Фильм успешно удален.';

const LOGOUT_MESSAGE = 'Выход выполнен успешно.';

const SERVER_ERROR_MESSAGE = 'Ошибка сервера.';
const UNAUTHORIZED_ERROR_MESSAGE = 'Ошибка авторизации: Неправильная почта или пароль.';
const NOT_FOUND_MESSAGE = 'Путь не найден.';
const CONFLICT_USER_MESSAGE = 'Пользователь с таким email уже существует';

const SUCCESS_STATUS_CODE = 200;
const SUCCESS_CREATION_STATUS_CODE = 201;

module.exports = {
  MONGO_CONFLICT_MESSAGE,
  BAD_REQUEST_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  INVALID_USERDATA_MESSAGE,
  INVALID_MOVIEDATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
  SUCCESS_DELETE_MOVIE_MESSAGE,
  LOGOUT_MESSAGE,
  SERVER_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_USER_MESSAGE,
  SUCCESS_STATUS_CODE,
  SUCCESS_CREATION_STATUS_CODE,
};
