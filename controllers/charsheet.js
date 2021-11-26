const Charsheet = require('../models/charsheet');
const NotFoundError = require('../errors/not-found-err');
const BadDataError = require('../errors/not-correct-data');
const NoRightsError = require('../errors/no-rights-err');

module.exports.getCharsheets = (req, res, next) => {
  Charsheet.find({ owner: req.user._id })
    // .select('-owner')
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
    url,
    race,
    profession,
    level,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    likes,
  } = req.body;
  const owner = req.user._id;
  console.log(owner)

  Charsheet.create({
    name,
    url,
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
    likes,
  })
    .then((charsheet) => {
      const newCharsheet = {
        _id: charsheet._id,
        name: charsheet.name,
        url: charsheet.url,
        race: charsheet.race,
        profession: charsheet.profession,
        level: charsheet.level,
        strength: charsheet.strength,
        dexterity: charsheet.dexterity,
        constitution: charsheet.constitution,
        intelligence: charsheet.intelligence,
        wisdom: charsheet.wisdom,
        charisma: charsheet.charisma,
        owner: charsheet.owner,
        likes:charsheet.likes,
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

module.exports.patchCharsheet = (req, res, next) => {/*req.user._id to req.body._id*/
  Charsheet.findByIdAndUpdate(req.params.charsheetId, {name: req.body.name, url:req.body.url, race: req.body.race, profession: req.body.profession, level: req.body.level,
                              strength: req.body.strength, dexterity: req.body.dexterity, constitution: req.body.constitution, intelligence: req.body.intelligence,
                              wisdom: req.body.wisdom, charisma: req.body.charisma },
    { new: true, runValidators: true })
    .orFail(new NotFoundError('Персонажа нет в базе'))
    .then((charsheet) => res.send({ data: charsheet }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return (next(new BadDataError('Введены некорректные данные')));
      }
      if (err.name === 'CastError') {
        next(new BadDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
      return (true);
    });
};

module.exports.deleteCharsheet = (req, res, next) => {
  console.log(req.params.charsheetId)
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

module.exports.checkSheet = (req, res) => {
  console.log(req.params.charsheetId)
  Charsheet.findById(req.params.charsheetId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      if (card.likes.find((elem) => elem === req.user._id)) {
        this.dislikeCard(req, res);
      } else {
        this.likeCard(req, res);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { throw new BadDataError('Переданы некорректные данные'); }
      if (err.message === 'NotValidId') { throw new NotFoundError('Карточки нет в базе'); }
    });
};

module.exports.likeCard = (req, res) => {
  Charsheet.findByIdAndUpdate(
    req.params.charsheetId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => {
      // res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Charsheet.findByIdAndUpdate(
    req.params.charsheetId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => {
      // res.status(500).send({ message: 'Произошла ошибка' });
    });
};