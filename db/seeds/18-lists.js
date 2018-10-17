exports.seed = function(knex, Promise) {
  return knex('lists').del()
    .then(function () {
      return knex('lists').insert([
        {id: 1, shop_id: 1, name: 'Fourth Of July'},
        {id: 2, shop_id: 1, name: 'Julies Wedding'},
        {id: 3, shop_id: 1, name: 'March 4th'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('lists_id_seq', (SELECT MAX(id) FROM lists));"
      );
    });
};
