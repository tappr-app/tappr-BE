const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const AuthRouter = require("../users/auth-router.js");
const UserRouter = require("../users/user-router.js");
const BeerRouter = require("../beers/beer-router.js");
const restricted = require("../middleware/restricted-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", AuthRouter);
server.use("/api/users", restricted, UserRouter);
server.use("/api/beers", BeerRouter);

server.get("/", (req, res) => {
  res.status(200).json({ time: "Beer o' Clock" });
});

module.exports = server;