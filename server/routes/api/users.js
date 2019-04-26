const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @description    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { login, email, password } = req.body;
  // Simple validation
  if (!login || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //Check if login exists
  User.findOne({ login }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "The Login name is already used" });
    } else {
      //check if email registered
      User.findOne({ email }).then(user => {
        if (user)
          return res
            .status(400)
            .json({ msg: "The e-mail address is already used" });

        const newUser = new User({
          login,
          email,
          password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
              jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      login: user.login,
                      email: user.email
                    },
                    success: true
                  });
                }
              );
            });
          });
        });
      });
    }
  });
});

module.exports = router;
