const incorrectDataError = 'Данные некорректны';
const accessError = 'Нет прав на удаление данной записи';
const routeNotFoundError = 'Запрашиваемый ресурс не найден';
const notFoundError = 'Сохраненный фильм не найден';
const userNotFoundError = 'Пользователь не найден';
const notUniqueError = (email) => `Почтовый адрес ${email} не уникальный`;
const authReqError = 'Необходима авторизация';
const serverError = 'На сервере произошла ошибка';
const authError = 'Неправильные почта или пароль';

module.exports = {
  incorrectDataError,
  accessError,
  routeNotFoundError,
  notFoundError,
  userNotFoundError,
  notUniqueError,
  authReqError,
  serverError,
  authError,
};
