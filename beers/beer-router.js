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

  Beers.findById(id)
    .then(beer => {
      res.status(200).json(beer);
    })
    .catch(error => {
      res.status(500).json({ message: 'The beer information could not be retrieved', error: error });
    });
});

// router.get("/:id/tasks", verifyUserId, (req, res) => {
//   const id = req.params.id;

//   Beers.findById(id)
//     .then(user => {
//       Beers.getTasksByUserId(id)
//         .then(tasks => {
//           res.status(200).json({ ...user, tasks });
//           console.log(user, tasks);
//         })
//         .catch(err => {
//           res.status(500).json(err);
//         });
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

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