const mongoose = require('mongoose'); //БД
const validator = require('validator');

//Схема сохраненного фильма
const movieSchema = new mongoose.Schema({
  //Страна создания фильма - обязательное поле, строка
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  //Режиссёр фильма - обязательное поле, строка
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  //Длительность фильма - обязательное поле, число.
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  //Год выпуска фильма - обязательное поле, строка.
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  //Описание фильма - обязательное поле, строка.
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  //Ссылка на постер к фильму - обязательное поле, строка, URL
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле image должно быть валидным url-адресом',
    },
  },
  //Ссылка на трейлер фильма - обязательное поле, строка, URL
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле image должно быть валидным url-адресом',
    },
  },
  //Миниатюрное изображение постера к фильму - обязательное поле, строка, URL
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле image должно быть валидным url-адресом',
    },
  },
  //_id пользователя, который сохранил статью - обязательное поле
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  //id фильма, который содержится в ответе сервиса MoviesExplorer - обязательное поле.
  movieId: {
    type: String,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  //Название фильма на русском языке - обязательное поле, строка.
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  //Название фильма на английском языке - обязательное поле, строка.
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
