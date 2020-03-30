
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food_pairings').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('food_pairings').insert([
        {id: 1, food_name: 'Burgers'},
        {id: 2, food_name: 'Cobb Salad'},
        {id: 3, food_name: 'Dark Chocolate'},
        {id: 4, food_name: 'Chocolate and Caramel Cupcakes'},
        {id: 5, food_name: 'Bruschetta'}
      ]);
    });
};
