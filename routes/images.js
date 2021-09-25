  
const { Image, validate } = require("../models/image");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const images = await Image.find()
    .select("-__v")
    .sort("name");
  res.send(images);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let characters = req.body.characters ? req.body.characters : [];
  let features = req.body.features ? req.body.features : {};
  let image = new Image({
    filename: req.body.filename,
    imageLink: req.body.imageLink,
    subtitle: req.body.subtitle,
    episode: req.body.episode,
    season: req.body.season,
    characters: characters,
    features: features
  });
  subtitle = await image.save();

  res.send(image);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let characters = req.body.characters ? req.body.characters : [];
  let features = req.body.features ? req.body.features : {};
  const image = await Image.findByIdAndUpdate(
    req.params.id,
    {
      subtitle: req.body.subtitle,
      episode: req.body.episode,
      season: req.body.season,
      characters,
      features
    },
    { new: true }
  );

  if (!image)
    return res
      .status(404)
      .send("The image with the given ID was not found.");

  res.send(image);
});

router.post("/search", auth, async (req, res) => {
    let search = Object();

    if (req.body.subtitle) {
        search.subtitle = {
          $regex: req.body.subtitle
      };
    }

    if (req.body.season) {
        search.season = req.body.season;
    }

    if (req.body.episode) {
        search.episode = req.body.episode;
    }

    if (Object.keys(search).length === 0) {
        return res
        .status(400)
        .send("Bad request, body must contain a search phrase");
    }
    const image = await Image.find(search);

    if (!image)
        return res
        .status(404)
        .send("The image containing the given words was not found.");

      res.send(image);
});

router.get("/:id", auth, async (req, res) => {
  const image = await Image.findById(req.params.id).select("-__v");

  if (!image)
    return res
      .status(404)
      .send("The image with the given ID was not found.");

  res.send(image);
});

module.exports = router;