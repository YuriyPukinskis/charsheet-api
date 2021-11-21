const mongoose = require('mongoose');

const charsheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  }
});
module.exports = mongoose.model('charsheet', charsheetSchema);
