const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findBeerFoodPairings,
  findBeerComments,
  addComment,
  updateComment,
  removeComment
};

function find() {
  return db("beers").select("id", "username");
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
    .select('food_pairings.name')
    .where({ beer_id: beer_id });
};

function findBeerComments(user_id, beer_id) {
  return db('comments')
    .join('beers', 'beers.id', 'comments.beer_id')
    .join('users_beers as ub', 'ub.beer_id', 'beers.id')
    .join('users', 'users.id', 'ub.user_id')
    .select('comments.comment')
    .where({ user_id: user_id, beer_id: beer_id });
};

function addComment(data, user_id, beer_id) {
  const newComment = {
    comment: data.comment,
    user_id: user_id,
    beer_id: beer_id
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

  return db('comments').where({ comment_id }).update(updatedComment)
    .then(count => {
      console.log(`Updated ${count} comment`);
      return findById(beer_id);
    });
};

function removeComment(comment_id, beer_id) {
  return db('comments').where({ comment_id }).del()
  .then(count => {
    console.log(`Deleted ${count} comment`);
    return findById(beer_id);
  });
};