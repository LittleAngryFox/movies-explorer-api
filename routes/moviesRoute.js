const router = require('express').Router();
const { validatorObjectId, validatorMovieBody } = require('../middlewares/validators');

const {
  getMovies,
  postMovie,
  deleteCard,
} = require('../controllers/movies');

//получение сохраненных фильмов
router.get('/', getMovies);

//сохранение фильма
router.post('/', validatorMovieBody, postMovie);

//удаление карточки по индентификатору
router.delete('/:movieId', validatorObjectId, deleteCard);

module.exports = router;
