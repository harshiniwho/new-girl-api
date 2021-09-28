const Joi = require('joi');
const { isObject, findLastKey } = require('lodash');
const mongoose = require('mongoose');

// data - filename, episode, season, subtitle, characters, imageLink, features

const Image = mongoose.model('Image', new mongoose.Schema({
    filename: {
      type: String,
      required: true
    },
    imageLink: {
      type: String,
      required: true,
      unique: true
    },
    subtitle: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 300
    },
    episode: {
      type: Number,
      required: false
    },
    season: {
      type: Number,
      required: false,
      minimum: 1,
      maximum: 7
    },
    timestamp: {
      type: Date,
      required: false
    },
    characters: {
      type: Array,
      required: false
    },
    features: {
      type: Object,
      required: false
    } 
}));

function validateImage(image) {
    const schema = {
      filename: Joi.string().required(),
      imageLink: Joi.string().required(),
      subtitle: Joi.string().required(),
      episode: Joi.number().min(1).max(25),
      season: Joi.number().min(1).max(7),
      timestamp: Joi.date(),
      characters: Joi.array().items(Joi.string()),
      features: Joi.object()
    };

    return Joi.validate(image, schema);
}

function checkInput(image) {
  const schema = {
      filename: Joi.string(),
      imageLink: Joi.string(),
      subtitle: Joi.string(),
      episode: Joi.number().min(1).max(25),
      timestamp: Joi.date(),
      season: Joi.number().min(1).max(7),
      characters: Joi.array().items(Joi.string()),
      features: Joi.object()
  };
  return Joi.validate(image, schema);
}

exports.Image = Image; 
exports.validate = validateImage;
exports.check = checkInput;