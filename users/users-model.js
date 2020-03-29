const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};

function find() {
  return db("users").select("id", "username");
};

function findBy(filter) {
  return db("users").where(filter);
};

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
};

function findById(id) {
  return db("users")
    .where({ id })
    .first();
};

function update(changes, id) {
  return db('users').where({ id }).update(changes)
    .then(count => {
      console.log(`Updated ${count} records`);
      return findById(id);
    });
};