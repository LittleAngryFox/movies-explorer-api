const router = require('express').Router();
const { validatorUserBody } = require('../middlewares/validators');

const {
  getUser,
  patchUser,
} = require('../controllers/users');

//GET/users/me получить информацию о себе
router.get('/me', getUser);
//PATCH/users/me обновление информации о себе
router.patch('/me', validatorUserBody, patchUser);

module.exports = router;
