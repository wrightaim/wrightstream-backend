exports.seed = function(knex, Promise) {
  return knex('categories').del().then(function() {
    return knex('categories').insert([
      { id: 1, shop_id: 1, name: 'Cupcakes'},
      { id: 2, shop_id: 1, name: 'Cakes'},
      { id: 3, shop_id: 1, name: 'Cookies' },
      { id: 4, shop_id: 1, name: 'Supplies' },
      { id: 5, shop_id: 1, name: 'Muffins' },
      { id: 6, shop_id: 1, name: 'Donuts' },
      { id: 7, shop_id: 1, name: 'Brownies'},
      { id: 8, shop_id: 2, name: 'Scarves'},
      { id: 9, shop_id: 2, name: 'Blankets'},
      { id: 10, shop_id: 2, name: 'Cardigans' },
      { id: 11, shop_id: 2, name: 'Hats' },
      { id: 12, shop_id: 2, name: 'Mittens' },
      { id: 13, shop_id: 2, name: 'Sweaters' }
    ])
  })
  .then(() => {
    return knex.raw("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));");
  });
};
