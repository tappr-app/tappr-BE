
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'TapList', password: 'tappr', bio: 'Seeker of the best taps in all the land'},
        {id: 2, username: 'HopStop', password: 'cheers', bio: 'Hoppy to find a new favorite brew'}
      ]);
    });
};
