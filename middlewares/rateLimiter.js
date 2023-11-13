const rateLimiter = require('express-rate-limit');

const rateLimiterMiddleware = rateLimiter({
  windowMs: 15 * 60 * 1000,
  // Интервал времени, в течение которого ограничение действует ( 15 минут)
  max: 100, // Максимальное количество запросов, разрешенное в течение этого интервала времени
});

module.exports = rateLimiterMiddleware;
