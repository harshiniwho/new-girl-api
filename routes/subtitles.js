const { Subtitle, validate } = require("../models/subtitle");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
    const subtitles = await Subtitle.find()
      .select("-__v")
      .sort("name");
    res.send(subtitles);
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let subtitle = new Subtitle({
      filename: req.body.filename,
      subtitle: req.body.subtitle,
      episode: req.body.episode,
      season: req.body.season
    });
    subtitle = await subtitle.save();
  
    res.send(subtitle);
});

router.put("/:id", auth, async (req, res) => {
    if (error) return res.status(400).send(error.details[0].message);

    const subtitle = await Subtitle.findByIdAndUpdate(
        req.params.id,
        {
        subtitle: req.body.subtitle
        },
        { new: true }
    );

    if (!subtitle)
        return res
        .status(404)
        .send("The subtitle with the given ID was not found.");

    res.send(subtitle);
});

router.get("/:id", auth, async (req, res) => {
    const subtitle = await Subtitle.findById(req.params.id).select("-__v");

    if (!subtitle)
        return res
        .status(404)
        .send("The subtitle with the given ID was not found.");

    res.send(subtitle);
});

router.post("/search", auth, async (req, res) => {
    if (!req.body.subtitle) {
        return res
        .status(400)
        .send("Bad request, body must contain a search phrase");
    }

    let search = {
        subtitle: {
            $regex: req.body.subtitle
        }
    }

    if (req.body.season) {
        search.season = req.body.season;
    }

    if (req.body.episode) {
        search.episode = req.body.episode;
    }

    const subtitle = await Subtitle.find(search);

    if (!subtitle)
        return res
        .status(404)
        .send("The subtitle containing the given words was not found.");

    res.send(subtitle);
});

module.exports = router;