const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const Users = require("./user-model.js");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: 'The user information could not be retrieved', error: error });
    });
});

router.get("/:id", verifyUserId, (req, res) => {
  const id = req.params.id;

  Promise.all([
    Users.findById(id),
    Users.findUserBeers(id)
  ])
  .then(([user, beers]) => {
    res.status(200).json({ user: user, beers });
  })
  .catch(error => {
    res.status(500).json({ message: 'The user information could not be retrieved', error: error });
  });
});

router.post('/beers', (req, res) => {
  const id = req.decodedToken.subject;

  Promise.all([
    Users.addBeers(req.body, id),
    Users.findById(id)
  ])
  .then(([beers, user]) => {
    res.status(200).json({ user: user, beers });
  })
  .catch(error => {
    res.status(500).json({ message: 'The beer could not be added to the user profile', error: error });
  });
});

router.put("/:id", verifyUserId, (req, res) => {
  const id = req.params.id;

  Users.update(req.body, id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'The user information could not be updated', error: error });
    });
});

// ---------------------- Custom Middleware ---------------------- //

function verifyUserId(req, res, next) {
  const id = req.params.id;

  Users.findById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'The user information could not be retrieved', error: error });
    });
};

module.exports = router;