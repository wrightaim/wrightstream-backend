exports.seed = function(knex, Promise) {
  return knex('bundles_items').del()
    .then(function () {
      return knex('bundles_items').insert([
        {id: 1, item_qty: 1, bundle_id: 1, item_id: 16},
        {id: 2, item_qty: 1, bundle_id: 2, item_id: 16},
        {id: 3, item_qty: 1, bundle_id: 3, item_id: 16},
        {id: 4, item_qty: 1, bundle_id: 1, item_id: 10},
        {id: 5, item_qty: 1, bundle_id: 2, item_id: 10},
        {id: 6, item_qty: 1, bundle_id: 3, item_id: 10},
        {id: 7, item_qty: 6, bundle_id: 1, item_id: 11},
        {id: 8, item_qty: 6, bundle_id: 1, item_id: 12},
        {id: 9, item_qty: 2, bundle_id: 2, item_id: 6},
        {id: 10, item_qty: 2, bundle_id: 2, item_id: 7},
        {id: 11, item_qty: 1, bundle_id: 3, item_id: 8},
        {id: 12, item_qty: 1, bundle_id: 3, item_id: 3},
        {id: 13, item_qty: 2, bundle_id: 1, item_id: 9},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('bundles_items_id_seq', (SELECT MAX(id) FROM bundles_items));"
      )
    })
};
