const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

//Saved file target directory
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

//File filter
const fileFilter = (req, file, callback) => {
  //reject file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
    console.log("notjpg");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
});

// Post Model
const Post = require("../../models/Post");

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get("/", auth, (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts));
});

// @route   POST api/posts
// @desc    Create An Post
// @access  Private
router.post("/", auth, upload.single("productImage"), (req, res) => {
  //   console.log(req.file);
  //   console.log(path);
  pathString = "https://flafi.hu:2053/" + req.file.path.replace(/\\/g, "/");
  const newPost = new Post({
    title: req.body.title,
    user: req.body.user,
    login: req.body.login,
    image: pathString
  });

  newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete A Post
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      fs.unlink("." + post.image, err => {
        if (err) throw err;
      });
      post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ success: false }));
});

//@route PUT api/posts/update:id
//@desc Update a post
//@access private
// router.put("/update/:id", auth, (req, res) => {
router.put("/update/:id", auth, upload.none(), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      ///
      post.title = req.body.title;
      post.user = req.body.user;
      (post.login = req.body.login), (post.image = req.body.productImage);
      ///
      post.save().then(() => res.json(post));
    })
    .catch(err => res.status(404).json({ success: false, err: err }));
});

module.exports = router;
