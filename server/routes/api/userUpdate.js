const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth');

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @description    Register new user
// @access  Public
router.post("/", auth, (req, res) => {
  const { login, email, password, newPassword } = req.body;
  // Simple validation
  if (!login || !email || !password || !newPassword) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  console.log(email)
  //Check if login exists
  User.findOne({ email }).then(user => {
    if (user) {
      console.log(user)
      /// Check if old password matching
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "The current password not matching" });
      })
      console.log('after pw compare')
      ///
      // Saving new password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save().then(user => {
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
                  success: true,
                  msg: "Password changed successfully "
                });
              }
            );
          });
        });
      });

      // return res.status(400).json({ msg: "The Login name is already used" });
    } else {
      return res.status(400).json({ msg: "Email not found" })
    }
  });
});

module.exports = router;
