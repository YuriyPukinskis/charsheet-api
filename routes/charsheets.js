const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  deleteCharsheet, postCharsheet, getCharsheets, patchCharsheet,
} = require('../controllers/charsheet');

router.get('/', getCharsheets);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    race: Joi.string().required(),
    profession: Joi.string().required(),
    level: Joi.number().required(),
    strength: Joi.number().required(),
    dexterity: Joi.number().required(),
    constitution: Joi.number().required(),
    intelligence: Joi.number().required(),
    wisdom: Joi.number().required(),
    charisma: Joi.number().required(),
  }),
}), postCharsheet);

router.patch('/:charsheetId', celebrate({
  params: Joi.object().keys({
    charsheetId: Joi.string().length(24).hex().alphanum()
      .required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    race: Joi.string().required(),
    profession: Joi.string().required(),
    level: Joi.number().required(),
    strength: Joi.number().required(),
    dexterity: Joi.number().required(),
    constitution: Joi.number().required(),
    intelligence: Joi.number().required(),
    wisdom: Joi.number().required(),
    charisma: Joi.number().required(),
  }),
}), patchCharsheet);

router.delete('/:charsheetId', celebrate({
  params: Joi.object().keys({
    charsheetId: Joi.string().length(24).hex().alphanum()
      .required(),
  }),
}), deleteCharsheet);

module.exports = router;
