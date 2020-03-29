const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  findUserBeers,
  add,
  addBeers,
  update
};

function find() {
  return db("users").select("id", "username");
};

function findBy(filter) {
  return db("users").where(filter);
};

function findById(id) {
  return db("users")
    .where({ id })
    .first();
};

function findUserBeers(user_id) {
  return db('users')
    .join('users_beers as ub', 'ub.user_id', 'users.id')
    .join('beers', 'beers.id', 'ub.beer_id')
    .select('beers.name', 'beers.tagline', 'beers.abv')
    .where({ user_id: user_id });
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
};

function addBeers(data, user_id) {
  const newBeer = {
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    image_url: data.image_url,
    abv: data.abv
  };

  return db('beers').insert(newBeer)
    .then(id => {
      const beer_id = id;

      const newData = {
        user_id: user_id,
        beer_id: beer_id
      };

      return db('users_beers').insert(newData)
        .then(id => {
          return findUserBeers(user_id);
        });
    });
};

function update(changes, id) {
  return db('users').where({ id }).update(changes)
    .then(count => {
      console.log(`Updated ${count} records`);
      return findById(id);
    });
};