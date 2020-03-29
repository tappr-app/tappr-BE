const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const Users = require("./user-model.js");

router.post("/register", validateUser, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(user => {
      const token = generateToken(user);

      res.status(201).json({ user, token });
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error during user registration, please try again later', error: error });
    });
});

router.post("/login", validateUser, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error during user login, please try again later', error: error });
    });
});

router.get('/logout', (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    res.status(200).json({ message: "Successfully logged out" });
  } else {
    res.status(500).json({ message: "Already logged out" });
  };
});

// ---------------------- Generate Token ---------------------- //

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, jwtSecret, options);
};

// ---------------------- Custom Middleware ---------------------- //

function validateUser(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "Username and password fields are required" });
  } else {
    next();
  };
};

module.exports = router;