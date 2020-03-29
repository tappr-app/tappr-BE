
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {id: 1, comment: 'Lighter lager that is super refreshing - new favorite', beer_id: 1, user_id: 1},
        {id: 2, comment: 'Not my favorite lager', beer_id: 3, user_id: 1},
        {id: 3, comment: 'Crisp and refreshing. Would drink it again', beer_id: 1, user_id: 2},
        {id: 4, comment: 'Pairs especially well with fresh orange and a good summer beer', beer_id: 2, user_id: 2}
      ]);
    });
};
