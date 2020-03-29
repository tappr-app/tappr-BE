const router = require("express").Router();

const Users = require("./users-model.js");

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

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'The user information could not be retrieved', error: error });
    });
});

// router.get("/:id/tasks", verifyUserId, (req, res) => {
//   const id = req.params.id;

//   Users.findById(id)
//     .then(user => {
//       Users.getTasksByUserId(id)
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

function verifyUserId(req, res, next) {
  const id = req.params.id;

  Users.findById(id)
    .then(item => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'The user information could not be retrieved', error: error });
    });
}

module.exports = router;