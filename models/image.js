const Joi = require('joi');
const { isObject } = require('lodash');
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
      required: true
    },
    season: {
      type: Number,
      required: true,
      minimum: 1,
      maximum: 7
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
      episode: Joi.number().min(1).max(25).required(),
      season: Joi.number().min(1).max(7).required(),
      characters: Joi.array().items(Joi.string()),
      features: Joi.object()
    };

    return Joi.validate(image, schema);
}

exports.Image = Image; 
exports.validate = validateImage;