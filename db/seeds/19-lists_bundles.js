exports.seed = function(knex, Promise) {
  return knex('lists_bundles').del()
    .then(function () {
      return knex('lists_bundles').insert([
        {list_id: 1, bundle_id: 2, bundle_qty: 1},
        {list_id: 2, bundle_id: 1, bundle_qty: 1}
      ]);
    });
};
