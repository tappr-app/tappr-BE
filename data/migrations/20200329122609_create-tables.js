exports.up = function(knex) {
  return knex.schema
  .createTable('users', table => {
    table.increments();
    table
      .string('username', 128)
      .notNullable()
      .unique();
    table
      .string('password', 128)
      .notNullable();
    table
      .text('bio')
      .defaultTo('Craft beer enthusiast');
  })
  .createTable('beers', table => {
    table.increments();
    table
      .string('name')
      .notNullable();
    table
      .string('tagline')
      .defaultTo('An amazing brew');
    table
      .text('description');
    table
      .string('image_url');
    table
      .decimal('abv');
  })
  .createTable('food_pairings', table => {
    table.increments();
    table
      .string('name')
      .notNullable();
  })
  .createTable('comments', table => {
    table.increments();
    table
      .text('comment');
    table.integer('beer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('beers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  .createTable('users_beers', table => {
    table.primary(['user_id', 'beer_id']);
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('beer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('beers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
  .createTable('beers_foods', table => {
    table.primary(['beer_id', 'food_id']);
    table.integer('beer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('beers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('food_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('food_pairings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('beers_foods')
    .dropTableIfExists('users_beers')
    .dropTableIfExists('comments')
    .dropTableIfExists('food_pairings')
    .dropTableIfExists('beers')
    .dropTableIfExists('users');
};
