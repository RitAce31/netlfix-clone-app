const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("./verifyToken");

//UPDATE A USER
router.put("/:id", verify, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A USER
router.delete("/:id", verify, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).catch(err);
  }
});

//GET A USER
router.get("/find/:id", verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(10)
      : User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//ADD NEW USER
router.post("/", verify, async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/adminlogin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && JSON.parse(JSON.stringify(user)).isAdmin) {
    try {
      if (!user) {
        res.status(201).json("Please check Entered the username and password!");
        return;
      }
      // !user && res.status(201).json("not found! username or password is wrong!");
      var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        res.status(201).json("Please check Entered the username and password!");
        return;
      }

      // originalPassword !== req.body.password &&
      //   res.status(500).json("username or password is wrong!");

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "5d" }
      );

      const { password, ...info } = user._doc;

      res.status(200).json({ info, accessToken });
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  } else {
    res.status(201).json("You are not allowed to use admin dashboard!");
  }
});
