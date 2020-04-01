
exports.up = function(knex) {
  return knex.schema
    .table('users', table => {
      table.integer('age')
        .unsigned();
      table.string('user_image');
    })
    .createTable('badges', table => {
      table.increments();
      table.string('badge_name')
        .unique()
        .notNullable();
      table.string('badge_url');
      table.text('badge_description');
    })
    .createTable('users_badges', table => {
      table.primary(['user_id', 'badge_id']);
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('badge_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('badges')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users_badges')
    .dropTableIfExists('badges');
};
