
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_badges').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_badges').insert([
        {user_id: 1, badge_id: 1},
        {user_id: 2, badge_id: 1},
        {user_id: 2, badge_id: 2}
      ]);
    });
};
