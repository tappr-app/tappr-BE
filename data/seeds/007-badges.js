
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('badges').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('badges').insert([
        {id: 1, badge_name: 'Finally Legal!', badge_description: 'Congratulations on liking your first beer - all those years of waiting have finally paid off.'},
        {id: 2, badge_name: 'Home Brewer', badge_description: 'You\'ve added 5 beers! Keep on brewing up those bottles.'}
      ]);
    });
};
