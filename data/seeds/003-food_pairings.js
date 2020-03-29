
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food_pairings').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('food_pairings').insert([
        {id: 1, name: 'Burgers'},
        {id: 2, name: 'Cobb Salad'},
        {id: 3, name: 'Dark Chocolate'},
        {id: 4, name: 'Chocolate and Caramel Cupcakes'},
        {id: 5, name: 'Bruschetta'}
      ]);
    });
};
