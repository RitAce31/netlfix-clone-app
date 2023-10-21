const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("./verifyToken");

//CREATE A MOVIE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE A MOVIE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only admin can add a movie");
  }
});

//DELETE A MOVIE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(201).json("Movie has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only admin can add a movie");
  }
});

//GET A MOVIE

router.get("/find/:id", verify, async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id);
    res.status(201).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM MOVIE

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  console.log("Selected Type", type);
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else if (type === "movie") {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $match: { isAnime: false } },
        { $sample: { size: 1 } },
      ]);
    } else if (type === "anime") {
      movie = await Movie.aggregate([
        { $match: { isAnime: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
    }
    console.log("Selected Movie", Movie);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL MOVIES

// router.get("/all", verify, async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.status(200).json(movies.reverse());
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
      console.log(req.user.isAdmin);
    }
  } else {
    res.status(403).json("Only admin can access all user account");
  }
});

module.exports = router;
