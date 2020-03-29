const router = require("express").Router();

const restricted = require("../middleware/restricted-middleware.js");

const Beers = require("./beer-model.js");

router.get("/", (req, res) => {
  Beers.find()
    .then(beers => {
      res.status(200).json(beers);
    })
    .catch(error => {
      res.status(500).json({ message: 'The beer information could not be retrieved', error: error });
    });
});

// FIX COMMENTS FINDER
router.get("/:id", restricted, verifyBeerId, (req, res) => {
  console.log('User ID: ', req.decodedToken.subject);

  const id = req.params.id;
  const user_id = req.decodedToken.subject;

  Promise.all([
    Beers.findById(id),
    Beers.findBeerFoodPairings(id),
    Beers.findBeerComments(id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'The beer information could not be retrieved', error: error });
  });
});

router.post('/:id/comments', restricted, verifyBeerId, (req, res) => {
  const user_id = req.decodedToken.subject;
  const beer_id = req.params.id;

  console.log(beer_id);

  Promise.all([
    Beers.addComment(req.body, beer_id, user_id),
    Beers.findBeerFoodPairings(beer_id),
    Beers.findBeerComments(beer_id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    res.status(500).json({ message: 'The comment could not be created', error: error });
  });
});

router.put('/:id/comments/:commentid', restricted, verifyBeerId, (req, res) => {
  const id = req.params.commentid;
  const beer_id = req.params.id;
  const user_id = req.decodedToken.subject;

  Promise.all([
    Beers.updateComment(req.body, id, user_id, beer_id),
    Beers.findBeerFoodPairings(beer_id),
    Beers.findBeerComments(beer_id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'The comment could not be updated', error: error });
  });
});

router.delete('/:id/comments/:commentid', restricted, verifyBeerId, (req, res) => {
  const id = req.params.commentid;
  const beer_id = req.params.id;
  const user_id = req.decodedToken.subject;

  Promise.all([
    Beers.removeComment(id, beer_id),
    Beers.findBeerFoodPairings(beer_id),
    Beers.findBeerComments(beer_id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: 'The comment could not be deleted', error: error });
  });
});

// ---------------------- Custom Middleware ---------------------- //

function verifyBeerId(req, res, next) {
  const id = req.params.id;

  Beers.findById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "Beer not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'The beer information could not be retrieved', error: error });
    });
}

module.exports = router;