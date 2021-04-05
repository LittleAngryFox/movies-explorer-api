const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    'Слишком много запросов с одного IP, пожалуйста, повторите попытку через 15 минут',
});

module.exports = apiLimiter;
