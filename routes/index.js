const router = require('express').Router();
const usersRouter = require('./usersRoute');
const moviesRouter = require('./moviesRoute');
const authRouter = require('./authRoute');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-fount-err');
const { routeNotFoundError } = require('../const');

//не существующий путь
const invalidLink = (req, res, next) => {
  const err = new NotFoundError(routeNotFoundError);
  next(err);
};

//signin и signup
router.use('/', authRouter);

//защита роутов
router.use(auth);

//запросы по пользователям
router.use('/users', usersRouter);
//запросы по фильмам
router.use('/movies', moviesRouter);

router.all('/*', invalidLink);

module.exports = router;
