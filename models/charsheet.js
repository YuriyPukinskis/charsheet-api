const mongoose = require('mongoose');

const charsheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    // default: 'https://i.imgur.com/5fy1KJo.jpg',
    required: true,
    validate: {
      validator(link) {
        const RegExp = /^((http|https):\/\/)?(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9-]*\.?)*\.{1}[A-Za-z0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
        return RegExp.test(link);
      },
      message: 'Ссылка не корректна',
    },
  },
  race: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  dexterity: {
    type: Number,
    required: true,
  },
  constitution: {
    type: Number,
    required: true,
  },
  intelligence: {
    type: Number,
    required: true,
  },
  wisdom: {
    type: Number,
    required: true,
  },
  charisma: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },

  useMagicDeviceLevel: {
    type: Number,
    default: 0,
  },
  survivalLevel: {
    type: Number,
    default: 0,
  },
  spellcraftLevel: {
    type: Number,
    default: 0,
  },
  senseMotiveLevel: {
    type: Number,
    default: 0,
  },
  professionLevel: {
    type: Number,
    default: 0,
  },
  perceptionLevel: {
    type: Number,
    default: 0,
  },
  knowledgeLevel: {
    type: Number,
    default: 0,
  },
  healLevel: {
    type: Number,
    default: 0,
  },
  flyLevel: {
    type: Number,
    default: 0,
  },
  disguiseLevel: {
    type: Number,
    default: 0,
  },
  diplomacyLevel: {
    type: Number,
    default: 0,
  },
  climbLevel: {
    type: Number,
    default: 0,
  },
  appraiseLevel: {
    type: Number,
    default: 0,
  },
  swimLevel: {
    type: Number,
    default: 0,
  },
  stealthLevel: {
    type: Number,
    default: 0,
  },
  sleightOfHandLevel: {
    type: Number,
    default: 0,
  },
  rideLevel: {
    type: Number,
    default: 0,
  },
  performLevel: {
    type: Number,
    default: 0,
  },
  linguisticsLevel: {
    type: Number,
    default: 0,
  },
  intimidateLevel: {
    type: Number,
    default: 0,
  },
  handleAnimalLevel: {
    type: Number,
    default: 0,
  },
  escapeArtistLevel: {
    type: Number,
    default: 0,
  },
  disableDeviceLevel: {
    type: Number,
    default: 0,
  },
  craftLevel: {
    type: Number,
    default: 0,
  },
  bluffLevel: {
    type: Number,
    default: 0,
  },
  acrobaticsLevel: {
    type: Number,
    default: 0,
  },
  game: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
});
module.exports = mongoose.model('charsheet', charsheetSchema);