const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator'); //валидированние данных

//валидация ID
const validatorObjectId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).required().unknown(true),
});

//валидация информации по пользователю при обновлении
const validatorUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).trim()
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" не может быть пустым',
      }),
    email: Joi.string().trim().email()
      .message('Поле email должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" не может быть пустым',
      }),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).required().unknown(true),
});

//валидация информации по пользователю при регистрации
const validatorRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .trim()
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
        'string.empty': 'Поле "name" не может быть пустым',
      }),
    email: Joi.string().required().trim().email()
      .message('Поле email должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.empty': 'Поле "email" не может быть пустым',
      }),
    password: Joi.string().required().min(8).trim()
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
        'string.empty': 'Поле "password" не может быть пустым',
      }),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).required().unknown(true),
});

//валидация информации по пользователю при входе
const validatorAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().trim().email()
      .message('Поле email должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.empty': 'Поле "email" не может быть пустым',
      }),
    password: Joi.string().required().min(8).trim()
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
        'string.empty': 'Поле "password" не может быть пустым',
      }),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).required().unknown(true),
});

//валидация информации по сохраненному фильму при добавлении
const validatorMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "country" должно быть заполнено',
        'string.empty': 'Поле "country" не может быть пустым',
      }),
    director: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "director" должно быть заполнено',
        'string.empty': 'Поле "director" не может быть пустым',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "duration" должно быть заполнено',
        'number.base': 'Поле "duration" должно быть числом',
      }),
    year: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "year" должно быть заполнено',
        'string.empty': 'Поле "year" не может быть пустым',
      }),
    description: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "description" должно быть заполнено',
        'string.empty': 'Поле "description" не может быть пустым',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
        'string.empty': 'Поле "image" не может быть пустым',
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "trailer" должно быть заполнено',
        'string.empty': 'Поле "trailer" не может быть пустым',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "thumbnail" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "thumbnail" должно быть заполнено',
        'string.empty': 'Поле "thumbnail" не может быть пустым',
      }),
    id: Joi.number().required()
      .messages({
        'any.required': 'Поле "movieId" должно быть заполнено',
        'number.base': 'Поле "duration" должно быть числом',
      }),
    nameRU: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "nameRU" должно быть заполнено',
        'string.empty': 'Поле "nameRU" не может быть пустым',
      }),
    nameEN: Joi.string().required().trim()
      .messages({
        'any.required': 'Поле "nameEN" должно быть заполнено',
        'string.empty': 'Поле "nameEN" не может быть пустым',
      }),
  }),
  headers: Joi.object().keys({
    'content-type': 'application/json',
  }).required().unknown(true),
});

module.exports = {
  validatorObjectId,
  validatorUserBody,
  validatorRegistration,
  validatorAuthentication,
  validatorMovieBody,
};
