
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_beers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_beers').insert([
        {user_id: 1, beer_id: 1},
        {user_id: 1, beer_id: 3},
        {user_id: 2, beer_id: 1},
        {user_id: 2, beer_id: 2}
      ]);
    });
};
