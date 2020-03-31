const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findBeerFoodPairings,
  findBeerComments,
  add,
  update,
  remove,
  addComment,
  updateComment,
  removeComment
};

function find() {
  return db("beers");
};

function findById(id) {
  return db("beers")
    .where({ id })
    .first();
};

function findBeerFoodPairings(beer_id) {
  return db('beers')
    .join('beers_foods as bf', 'bf.beer_id', 'beers.id')
    .join('food_pairings as fp', 'fp.id', 'bf.food_id')
    .select('fp.food_name')
    .where({ beer_id: beer_id });
};

function findBeerComments(beer_id, user_id) {
  return db('comments')
    .leftJoin('users', 'users.id', 'comments.user_id')
    .leftJoin('beers', 'beers.id', 'comments.beer_id')
    .select('comments.comment')
    .where({ beer_id: beer_id, user_id: user_id });
};

async function add(beer, user_id) {
  const newBeer = {
    name: beer.name,
    tagline: beer.tagline,
    description: beer.description,
    image_url: beer.image_url,
    abv: beer.abv
  };

  const foodPairings = {
    food_name: beer.food_name
  };

  await db("beers").insert(newBeer)
    .then(ids => {
      const beer_id = ids[0];

      const comments = {
        comment: beer.comment,
        beer_id: beer_id,
        user_id: user_id
      };

      await db('comments').insert(comments)
        .then(ids => {
          await db('food_pairings').insert(foodPairings)
            .then(ids => {
              const food_id = ids[0];

              const newData = {
                food_id: food_id,
                beer_id: beer_id
              };

              return db('beers_foods').insert(newData)
                .then(ids => {
                  return findById(beer_id);
                });
            });
        });
    });
};

function update(changes, id) {
  return db('beers').where({ id }).update(changes)
    .then(count => {
      console.log(`Updated ${count} beer`);
      return findbyId(id);
    });
};

function remove(id) {
  return db('beers').where({ id }).del()
  .then(count => {
    console.log(`Deleted ${count} beer`);
    return find();
  });
};

function addComment(data, beer_id, user_id) {
  const newComment = {
    comment: data.comment,
    beer_id: beer_id,
    user_id: user_id
  };

  return db('comments').insert(newComment)
    .then(id => {
      return findById(beer_id);
    });
};

function updateComment(data, comment_id, user_id, beer_id) {
  const updatedComment = {
    comment: data.comment,
    user_id: user_id,
    beer_id: beer_id
  };

  const id = comment_id;

  return db('comments').where({ id }).update(updatedComment)
    .then(count => {
      console.log(`Updated ${count} comment`);
      return findById(beer_id);
    });
};

function removeComment(comment_id, beer_id) {
  const id = comment_id;

  return db('comments').where({ id }).del()
  .then(count => {
    console.log(`Deleted ${count} comment`);
    return findById(beer_id);
  });
};