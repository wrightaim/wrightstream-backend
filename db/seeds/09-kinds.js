exports.seed = function(knex, Promise) {
  return knex('kinds').del()
    .then(function () {
      return knex('kinds').insert([
        {id: 1, shop_id: 1, name: 'Dairy'},
        {id: 2, shop_id: 1, name: 'Frosting'},
        {id: 3, shop_id: 1, name: 'Supplies'},
        {id: 4, shop_id: 1, name: 'Baking Goods'},
        {id: 5, shop_id: 2, name: 'Yarns'},
        {id: 6, shop_id: 2, name: 'Buttons'},
        {id: 7, shop_id: 2, name: 'Needles'},
        {id: 8, shop_id: 2, name: 'Ribbons'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('kinds_id_seq', (SELECT MAX(id) FROM kinds));"
      );
    });
};
