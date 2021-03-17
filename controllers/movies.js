const Movie = require('../models/movie'); //модель сохраненных фильмов
//ошибки
const NotFoundError = require('../errors/not-fount-err');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-err');

//GET/movies получение списка всех карточек
const getMovies = (req, res, next) => {
  Movie.find({})
    .populate({ path: 'owner' }) //пользователь, который сохранил фильм
    .then((item) => res.send(item))
    .catch(next);
};

//POST/movies добавить карточку
const postMovie = (req, res, next) => {
  //получение данных о фильме
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;

  //(сохранение) добавление фильма
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((item) => {
      //вывод сохраненного фильма + информации кто сохранил фильм
      Movie.findById({ _id: item._id })
        .populate({ path: 'owner' })
        .then((card) => res.send(card));
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new ValidationError('Данные некорректны');
        next(err);
      }
      next(e.message);
    });
};

//удаление найденой карточки
const deleteOneCard = (res, cardId) => {
  Movie.findByIdAndRemove({ _id: cardId })
    .populate({ path: 'owner' })
    .orFail(new NotFoundError('Сохраненный фильм не найден'))
    .then((item) => res.send(item));
};

//DELETE/movies/movieId удаление фильма (своего)
const deleteCard = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById({ _id: movieId })
    .orFail(new NotFoundError('Сохраненный фильм не найден'))
    .then((item) => {
      if (!(JSON.stringify(item.owner._id) === JSON.stringify(req.user._id))) {
        throw new ForbiddenError('Нет прав на удаление данной записи');
      }
      return deleteOneCard(res, movieId);
    })
    .catch((e) => {
      if (e.statusCode) {
        next(e);
      }
      if (e.name === 'CastError') {
        const err = new ValidationError('Данные некорректны');
        next(err);
      }
      next(e.message);
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteCard,
};
