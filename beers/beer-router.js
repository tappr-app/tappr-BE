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

router.get("/:id", restricted, verifyBeerId, (req, res) => {
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
    res.status(500).json({ message: 'The beer information could not be retrieved', error: error });
  });
});

// TEST IN PROD
router.post('/', restricted, validateBeer, (req, res) => {
  Beers.add(req.body)
    .then((beer) => {
      res.status(201).json(beer);
    })
    .catch(error => {
      res.status(500).json({ message: 'The beer could not be created', error: error });
    });
});

// TEST IN PROD
router.post('/:id/comments', restricted, verifyBeerId, (req, res) => {
  const user_id = req.decodedToken.subject;
  const beer_id = req.params.id;

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

// TEST IN PROD
router.post('/:id/foods', restricted, verifyBeerId, (req, res) => {
  const user_id = req.decodedToken.subject;
  const beer_id = req.params.id;

  Promise.all([
    Beers.addFoodPairing(req.body, beer_id),
    Beers.findBeerFoodPairings(beer_id),
    Beers.findBeerComments(beer_id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    res.status(500).json({ message: 'The food pairing could not be created', error: error });
  });
});

// TEST IN PROD
router.put('/:id', restricted, verifyBeerId, (req, res) => {
  const id = req.params.id;
  const user_id = req.decodedToken.subject;

  Promise.all([
    Beers.update(req.body, id),
    Beers.findBeerFoodPairings(id),
    Beers.findBeerComments(id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    res.status(500).json({ message: 'The beer information could not be updated', error: error });
  });
});

// TEST IN PROD
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
    res.status(500).json({ message: 'The comment could not be updated', error: error });
  });
});

// TEST IN PROD
router.put('/:id/foods/:foodid', restricted, verifyBeerId, (req, res) => {
  const id = req.params.foodid;
  const beer_id = req.params.id;
  const user_id = req.decodedToken.subject;

  Promise.all([
    Beers.updateFoodPairing(req.body, id, beer_id),
    Beers.findBeerFoodPairings(beer_id),
    Beers.findBeerComments(beer_id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    res.status(500).json({ message: 'The food pairing could not be updated', error: error });
  });
});

// TEST IN PROD
router.delete('/:id', restricted, verifyBeerId, (req, res) => {
  const id = req.params.id;

  Beers.remove(id)
    .then(beers => {
      res.status(200).json(beers);
    })
    .catch(error => {
      res.status(500).json({ message: 'The beer could not be deleted', error: error });
    });
})

// TEST IN PROD
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
    res.status(500).json({ message: 'The comment could not be deleted', error: error });
  });
});

// TEST IN PROD
router.delete('/:id/foods/:foodid', restricted, verifyBeerId, (req, res) => {
  const id = req.params.foodid;
  const beer_id = req.params.id;
  const user_id = req.decodedToken.subject;

  Promise.all([
    Beers.removeFood(id, beer_id),
    Beers.findBeerFoodPairings(beer_id),
    Beers.findBeerComments(beer_id, user_id)
  ])
  .then(([beer, food, comments]) => {
    res.status(200).json({ beer: beer, food, comments });
  })
  .catch(error => {
    res.status(500).json({ message: 'The food pairing could not be deleted', error: error });
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
};

function validateBeer(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Beer must have a name" });
  } else {
    next();
  };
};

module.exports = router;