const Charsheet = require('../models/charsheet');
const NotFoundError = require('../errors/not-found-err');
const BadDataError = require('../errors/not-correct-data');
const NoRightsError = require('../errors/no-rights-err');

module.exports.getCharsheets = (req, res, next) => {
  Charsheet.find({ owner: req.user._id })
    .select('-owner')
    .then((charsheet) => {
      res.status(200).send(charsheet);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.postCharsheet = (req, res, next) => {
  const {
    name,
    race,
    profession,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  } = req.body;
  const owner = req.user._id;

  Charsheet.create({
    name,
    race,
    profession,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    owner,
  })
    .then((charsheet) => {
      const newCharsheet = {
        _id: charsheet._id,
        name: charsheet.name,
        race: charsheet.race,
        profession: charsheet.profession,
        level: charsheet.level,
        strength: charsheet.strength,
        dexterity: charsheet.dexterity,
        constitution: charsheet.constitution,
        intelligence: charsheet.intelligence,
        wisdom: charsheet.wisdom,
        charisma: charsheet.charisma,
      };
      res.send({ data: newCharsheet });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return (next(new BadDataError('Введены некорректные данные')));
      }
      return (next(err));
    });
};

module.exports.deleteCharsheet = (req, res, next) => {
  Charsheet.findById(req.params.charsheetId)
    .orFail(new NotFoundError('Персонажа нет в базе'))
    .then((charsheet) => {
      if (JSON.stringify(charsheet.owner) === JSON.stringify(req.user._id)) {
        Charsheet.findByIdAndRemove(charsheet._id)
          .then((charsheets) => res.send({ data: charsheets }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              return (next(new BadDataError('Переданы некорректные данные')));
            }
            return (next(err));
          });
      } else {
        throw new NoRightsError('Не Ваш то персонаж, любезный пользователь, благоволите не удалять его');
      }
    })
    .catch((err) => {
      next(err);
    });
};
