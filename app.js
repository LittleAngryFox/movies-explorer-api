require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const apiLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const { DEV_PATH } = require('./config');

const { PORT = 3000, MONGO_BASE = DEV_PATH } = process.env;
const app = express();

//подключение базы данных
mongoose.connect(MONGO_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//логгер запросов
app.use(requestLogger);
app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(cors());

/* app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); */

app.use(apiLimiter);
app.use('/', routes);

//логер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

//обработчик остальных ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
