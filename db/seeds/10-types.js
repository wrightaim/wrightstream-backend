exports.seed = function(knex, Promise) {
  return knex('types').del()
    .then(function () {
      return knex('types').insert([
        {id: 1, shop_id: 1, name: 'email'},
        {id: 2, shop_id: 1, name: 'url'},
        {id: 3, shop_id: 1, name: 'custom'},
        {id: 4, shop_id: 2, name: 'email'},
        {id: 5, shop_id: 2, name: 'url'},
        {id: 6, shop_id: 2, name: 'custom'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('types_id_seq', (SELECT MAX(id) FROM types));"
      );
    });
};
