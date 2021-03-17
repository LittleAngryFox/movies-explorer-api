const router = require('express').Router();
const { validatorAuthentication, validatorRegistration } = require('../middlewares/validators');

const {
  createUser,
  login,
} = require('../controllers/users');

//регистрация
router.post('/signup', validatorRegistration, createUser);

//залогиниться
router.post('/signin', validatorAuthentication, login);

module.exports = router;
