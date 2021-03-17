const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-fount-err');
const ValidationError = require('../errors/validation-err');

const { NODE_ENV, JWT_SECRET = 'devKey' } = process.env;

//GET/users/me (получение email и имя)
const getUser = (req, res, next) => {
  //id текущего пользователя
  const id = req.user._id;

  User.findById({ _id: id })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((item) => res.send(item))
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new ValidationError('Данные некорректны');
        next(err);
      }
      next(e.message);
    });
};

//POST/signup создание пользователя при регистрации
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id, name: user.name, email: user.email,
    }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new ValidationError('Данные некорректны');
        next(err);
      }
      if (e.code === 11000) {
        const err = new ValidationError(`Почтовый адрес ${email} не уникальный`);
        err.statusCode = 409;
        next(err);
      }
      next(e.message);
    });
};

//обновить информацию о пользователе
const patchUser = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { email, name },
    { new: true, runValidators: true, omitUndefined: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new ValidationError('Данные некорректны');
        next(err);
      }
      if (e.code === 11000) {
        const err = new ValidationError(`Почтовый адрес ${email} не уникальный`);
        err.statusCode = 409;
        next(err);
      }
      next(e.message);
    });
};

//залогиниться
const login = (req, res, next) => {
  //получаем данные, которые ввел пользователь при залогировании
  const { email, password } = req.body;

  //используем собственный метод, поиск в схеме по email и сравнение паролей
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь - user
      // создадим токен: jwt.sign(payload, secretOrPrivateKey, [options, callback])
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  patchUser,
  login,
};
