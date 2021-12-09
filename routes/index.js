const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const routesCharsheets = require('./charsheets');
const routesUsers = require('./users');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { errorLogger } = require('../middlewares/logger');
const errorHandler = require('../middlewares/errorHandler');

module.exports = function (app) {
  app.post('/api/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().required(),
    }),
  }), createUser);
  app.post('/api/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().email({ tlds: { allow: false } }).required(),
      password: Joi.string().required(),
    }),
  }), login);

  app.use('/api/users', auth, routesUsers);
  app.use('/api/charsheets', auth, routesCharsheets);

  app.use(errorLogger);
  app.use(errors());
  app.use('*', auth, () => {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  });

  app.use(errorHandler);
};
