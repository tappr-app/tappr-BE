
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('beers_foods').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('beers_foods').insert([
        {beer_id: 1, food_id: 1},
        {beer_id: 1, food_id: 4},
        {beer_id: 1, food_id: 5},
        {beer_id: 2, food_id: 1},
        {beer_id: 2, food_id: 2},
        {beer_id: 2, food_id: 3},
        {beer_id: 3, food_id: 1},
        {beer_id: 3, food_id: 2},
        {beer_id: 3, food_id: 3},
        {beer_id: 3, food_id: 4},
        {beer_id: 3, food_id: 5}
      ]);
    });
};
