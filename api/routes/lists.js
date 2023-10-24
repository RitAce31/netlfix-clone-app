const router = require("express").Router();
const verify = require("./verifyToken");
const List = require("../models/List");

//CREATE
router.post("/", verify, async (req, res) => {
  const newList = new List(req.body);
  try {
    const list = await newList.save();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json("The list has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verify, async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL LISTS

router.get("/all", verify, async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
