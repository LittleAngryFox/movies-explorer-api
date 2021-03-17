const mongoose = require('mongoose'); //БД
const bcrypt = require('bcryptjs'); //закодировать пароль
const validator = require('validator'); //валидированние данных
const UnAuthorizedError = require('../errors/unauthorized-err'); //ошибка неавторизованного пользователя

//Схема пользователя
const userSchema = new mongoose.Schema({
  //почта пользователя- обязательное, уникальное.
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: [true, 'Поле "email" должно быть уникальным'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  //пароль пользователя - хеш, обязательный, строка, по умолчанию не возвращается
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    minlength: [8, 'Минимальная длина поля "password" - 8'],
    select: false,
  },
  //имя пользователя - строка, обязательное поле, от 2 до 30 символов
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    required: [true, 'Поле "name" должно быть заполнено'],
  },
}, { versionKey: false });

//Проверка почты и пароля. Возвращает объект пользователя или ошибку.
//Собственный метод - в свойство statics нужной схемы
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользовател по почте
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new UnAuthorizedError('Неправильные почта или пароль'));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // отклоняем промис
            return Promise.reject(new UnAuthorizedError('Неправильные почта или пароль'));
          }
          //всё совпала - возвращаем пользователя
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
