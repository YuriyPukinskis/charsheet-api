const Charsheet = require('../models/charsheet');
const NotFoundError = require('../errors/not-found-err');
const BadDataError = require('../errors/not-correct-data');
const NoRightsError = require('../errors/no-rights-err');

module.exports.getCharsheets = (req, res, next) => {
  Charsheet.find()
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
    useMagicDeviceLevel,
    survivalLevel,
    spellcraftLevel,
    senseMotiveLevel,
    professionLevel,
    perceptionLevel,
    knowledgeLevel,
    healLevel,
    flyLevel,
    disguiseLevel,
    diplomacyLevel,
    climbLevel,
    appraiseLevel,
    swimLevel,
    stealthLevel,
    sleightOfHandLevel,
    rideLevel,
    performLevel,
    linguisticsLevel,
    intimidateLevel,
    handleAnimalLevel,
    escapeArtistLevel,
    disableDeviceLevel,
    craftLevel,
    bluffLevel,
    acrobaticsLevel,
    game,
    notes,
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
    useMagicDeviceLevel,
    survivalLevel,
    spellcraftLevel,
    senseMotiveLevel,
    professionLevel,
    perceptionLevel,
    knowledgeLevel,
    healLevel,
    flyLevel,
    disguiseLevel,
    diplomacyLevel,
    climbLevel,
    appraiseLevel,
    swimLevel,
    stealthLevel,
    sleightOfHandLevel,
    rideLevel,
    performLevel,
    linguisticsLevel,
    intimidateLevel,
    handleAnimalLevel,
    escapeArtistLevel,
    disableDeviceLevel,
    craftLevel,
    bluffLevel,
    acrobaticsLevel,
    game,
    notes,
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
        likes: charsheet.likes,
        useMagicDeviceLevel: charsheet.useMagicDeviceLevel,
        survivalLevel: charsheet.survivalLevel,
        spellcraftLevel: charsheet.spellcraftLevel,
        senseMotiveLevel: charsheet.senseMotiveLevel,
        professionLevel: charsheet.professionLevel,
        perceptionLevel: charsheet.perceptionLevel,
        knowledgeLevel: charsheet.knowledgeLevel,
        healLevel: charsheet.healLevel,
        flyLevel: charsheet.flyLevel,
        disguiseLevel: charsheet.disguiseLevel,
        diplomacyLevel: charsheet.diplomacyLevel,
        climbLevel: charsheet.climbLevel,
        appraiseLevel: charsheet.appraiseLevel,
        swimLevel: charsheet.swimLevel,
        stealthLevel: charsheet.stealthLevel,
        sleightOfHandLevel: charsheet.sleightOfHandLevel,
        rideLevel: charsheet.rideLevel,
        performLevel: charsheet.performLevel,
        linguisticsLevel: charsheet.linguisticsLevel,
        intimidateLevel: charsheet.intimidateLevel,
        handleAnimalLevel: charsheet.handleAnimalLevel,
        escapeArtistLevel: charsheet.escapeArtistLevel,
        disableDeviceLevel: charsheet.disableDeviceLevel,
        craftLevel: charsheet.craftLevel,
        bluffLevel: charsheet.luffLevel,
        acrobaticsLevel: charsheet.acrobaticsLevel,
        game: charsheet.game,
        notes: charsheet.notes,
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
                              wisdom: req.body.wisdom, charisma: req.body.charisma, 
                              useMagicDeviceLevel: req.body.useMagicDeviceLevel,
                              survivalLevel: req.body.survivalLevel, 
                              spellcraftLevel: req.body.spellcraftLevel,
                              senseMotiveLevel: req.body.senseMotiveLevel, 
                              professionLevel: req.body.professionLevel,
                              perceptionLevel: req.body.perceptionLevel,
                              knowledgeLevel: req.body.knowledgeLevel,
                              healLevel: req.body.healLevel,
                              flyLevel: req.body.flyLevel,
                              disguiseLevel: req.body.disguiseLevel,
                              diplomacyLevel: req.body.diplomacyLevel,
                              climbLevel: req.body.climbLevel,
                              appraiseLevel: req.body.appraiseLevel,
                              swimLevel: req.body.swimLevel,
                              stealthLevel: req.body.stealthLevel,
                              sleightOfHandLevel: req.body.sleightOfHandLevel,
                              rideLevel: req.body.rideLevel,
                              performLevel: req.body.performLevel,
                              linguisticsLevel: req.body.linguisticsLevel,
                              intimidateLevel: req.body.intimidateLevel,
                              handleAnimalLevel: req.body.handleAnimalLevel,
                              escapeArtistLevel: req.body.escapeArtistLevel,
                              disableDeviceLevel: req.body.disableDeviceLevel,
                              craftLevel: req.body.craftLevel,
                              bluffLevel: req.body.bluffLevel,
                              acrobaticsLevel: req.body.acrobaticsLevel,
                              game: req.body.game,
                              notes: req.body.notes,
                            },
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