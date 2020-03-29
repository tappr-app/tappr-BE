const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById
};

function find() {
  return db("beers").select("id", "username");
};

function findById(id) {
  return db("beers")
    .where({ id })
    .first();
};