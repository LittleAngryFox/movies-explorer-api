const winston = require('winston');
const expressWinston = require('express-winston');

//Создание логгера запросов
const requestLogger = expressWinston.logger({
  //transports отвечает за то, куда нужно писать лог
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  //format отвечает за формат записи логов
  format: winston.format.json(),
});

// Создание логгера ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
