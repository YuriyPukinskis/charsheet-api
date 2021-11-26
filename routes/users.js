const router = require('express').Router();
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

router.use(express.urlencoded({ extended: false }));

const {
  getUsers, getMe, patchUserData, patchUserAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
  }),
}), patchUserData);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "avatar" должно быть валидным url-адресом');
    })
      .messages({
        'string.required': 'Поле "avatar" должно быть заполнено',
      }),
  }),
}), patchUserAvatar);


module.exports = router;
