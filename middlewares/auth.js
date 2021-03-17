const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/unauthorized-err');

//защита авторизацией
module.exports = (req, res, next) => {
  //заголовок
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new UnAuthorizedError('Необходима авторизация');
    next(err);
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    //Вернём пейлоуд, если тот прошёл jwt.verify(token, secretOrPublicKey, [options, callback])
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new UnAuthorizedError('Необходима авторизация');
    next(err);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
