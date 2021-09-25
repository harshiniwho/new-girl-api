const Joi = require('joi');
const mongoose = require('mongoose');

const Subtitle = mongoose.model('Subtitle', new mongoose.Schema({
    filename: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true,
      minlength: 1
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
    }
  }));

function validateSubtitle(subtitle) {
    const schema = {
        filename: Joi.string().required(),
        subtitle: Joi.string().required(),
        episode: Joi.number().min(1).max(25).required(),
        season: Joi.number().min(1).max(7).required()
    };

    return Joi.validate(subtitle, schema);
}

exports.Subtitle = Subtitle; 
exports.validate = validateSubtitle;