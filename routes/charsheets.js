const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  deleteCharsheet, postCharsheet, getCharsheets, patchCharsheet, checkSheet
} = require('../controllers/charsheet');

router.get('/', getCharsheets);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    url: Joi.string().empty('').default('https://i.imgur.com/5fy1KJo.jpg'),
    race: Joi.string().required(),
    profession: Joi.string().required(),
    level: Joi.number().required(),
    strength: Joi.number().required(),
    dexterity: Joi.number().required(),
    constitution: Joi.number().required(),
    intelligence: Joi.number().required(),
    wisdom: Joi.number().required(),
    charisma: Joi.number().required(),
    useMagicDeviceLevel: Joi.number().empty('').default(0),
    survivalLevel: Joi.number().empty('').default(0),
    spellcraftLevel: Joi.number().empty('').default(0),
    senseMotiveLevel: Joi.number().empty('').default(0),
    professionLevel: Joi.number().empty('').default(0),
    perceptionLevel: Joi.number().empty('').default(0),
    knowledgeLevel: Joi.number().empty('').default(0),
    healLevel: Joi.number().empty('').default(0),
    flyLevel: Joi.number().empty('').default(0),
    disguiseLevel: Joi.number().empty('').default(0),
    diplomacyLevel: Joi.number().empty('').default(0),
    climbLevel: Joi.number().empty('').default(0),
    appraiseLevel: Joi.number().empty('').default(0),
    swimLevel: Joi.number().empty('').default(0),
    stealthLevel: Joi.number().empty('').default(0),
    sleightOfHandLevel: Joi.number().empty('').default(0),
    rideLevel: Joi.number().empty('').default(0),
    performLevel: Joi.number().empty('').default(0),
    linguisticsLevel: Joi.number().empty('').default(0),
    intimidateLevel: Joi.number().empty('').default(0),
    handleAnimalLevel: Joi.number().empty('').default(0),
    escapeArtistLevel: Joi.number().empty('').default(0),
    disableDeviceLevel: Joi.number().empty('').default(0),
    craftLevel: Joi.number().empty('').default(0),
    bluffLevel: Joi.number().empty('').default(0),
    acrobaticsLevel: Joi.number().empty('').default(0),
    game: Joi.string().empty('').default(''),
    notes: Joi.string().empty('').default(''),
    inventory: Joi.string().empty('').default('')
  }),
}), postCharsheet);

router.patch('/:charsheetId', celebrate({
  params: Joi.object().keys({
    charsheetId: Joi.string().length(24).hex().alphanum()
      .required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    url: Joi.string().required(),
    race: Joi.string().required(),
    profession: Joi.string().required(),
    level: Joi.number().required(),
    strength: Joi.number().required(),
    dexterity: Joi.number().required(),
    constitution: Joi.number().required(),
    intelligence: Joi.number().required(),
    wisdom: Joi.number().required(),
    charisma: Joi.number().required(),
    useMagicDeviceLevel: Joi.number().empty('').default(0),
    survivalLevel: Joi.number().empty('').default(0),
    spellcraftLevel: Joi.number().empty('').default(0),
    senseMotiveLevel: Joi.number().empty('').default(0),
    professionLevel: Joi.number().empty('').default(0),
    perceptionLevel: Joi.number().empty('').default(0),
    knowledgeLevel: Joi.number().empty('').default(0),
    healLevel: Joi.number().empty('').default(0),
    flyLevel: Joi.number().empty('').default(0),
    disguiseLevel: Joi.number().empty('').default(0),
    diplomacyLevel: Joi.number().empty('').default(0),
    climbLevel: Joi.number().empty('').default(0),
    appraiseLevel: Joi.number().empty('').default(0),
    swimLevel: Joi.number().empty('').default(0),
    stealthLevel: Joi.number().empty('').default(0),
    sleightOfHandLevel: Joi.number().empty('').default(0),
    rideLevel: Joi.number().empty('').default(0),
    performLevel: Joi.number().empty('').default(0),
    linguisticsLevel: Joi.number().empty('').default(0),
    intimidateLevel: Joi.number().empty('').default(0),
    handleAnimalLevel: Joi.number().empty('').default(0),
    escapeArtistLevel: Joi.number().empty('').default(0),
    disableDeviceLevel: Joi.number().empty('').default(0),
    craftLevel: Joi.number().empty('').default(0),
    bluffLevel: Joi.number().empty('').default(0),
    acrobaticsLevel: Joi.number().empty('').default(0),
    game: Joi.string().empty('').default(''),
    notes: Joi.string().empty('').default(''),
    inventory: Joi.string().empty('').default(''),
    weight: Joi.number().empty('').default(0),

    armourName: Joi.string().empty('').default(''),
    shieldName: Joi.string().empty('').default(''),
    armourBonus: Joi.number().empty('').default(0),
    shieldBonus: Joi.number().empty('').default(0),

    armourType: Joi.string().empty('').default(''),
    shieldType: Joi.string().empty('').default(''),
    armourPenalty: Joi.number().empty('').default(0),
    shieldPenalty: Joi.number().empty('').default(0),

    armourSpellFail: Joi.number().empty('').default(0),
    shieldSpellFail: Joi.number().empty('').default(0),

    armourDex: Joi.number().empty('').default(0),
    shieldDex: Joi.number().empty('').default(0),
  }),
}), patchCharsheet);

router.delete('/:charsheetId', celebrate({
  params: Joi.object().keys({
    charsheetId: Joi.string().length(24).hex().alphanum()
      .required(),
  }),
}), deleteCharsheet);

router.put('/:charsheetId/likes', celebrate({
  params: Joi.object().keys({
    charsheetId: Joi.string().length(24).hex().alphanum()
      .required(),
  }),
}), checkSheet);

module.exports = router;
