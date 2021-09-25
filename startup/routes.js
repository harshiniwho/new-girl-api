const express = require('express');
const images = require('../routes/images');
const subtitles = require('../routes/subtitles');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/images', images);
  app.use('/api/subtitles', subtitles);
  app.use(error);
}