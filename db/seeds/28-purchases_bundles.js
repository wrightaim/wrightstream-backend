exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchases_bundles').del()
    .then(function () {
      return knex('purchases_bundles').insert([
        {purchase_id: 1, bundle_id: 1, bundle_qty: 1, completed: false},
        {purchase_id: 1, bundle_id: 2, bundle_qty: 2, completed: false},
        {purchase_id: 2, bundle_id: 1, bundle_qty: 2, completed: false},
        {purchase_id: 3, bundle_id: 1, bundle_qty: 3, completed: false},

        {purchase_id: 4, bundle_id: 1, bundle_qty: 1, completed: false},
        {purchase_id: 4, bundle_id: 2, bundle_qty: 2, completed: false},

        {purchase_id: 5, bundle_id: 3, bundle_qty: 1, completed: false},
        {purchase_id: 5, bundle_id: 2, bundle_qty: 2, completed: false},

        {purchase_id: 6, bundle_id: 1, bundle_qty: 1, completed: false},
        {purchase_id: 6, bundle_id: 3, bundle_qty: 2, completed: false},

        {purchase_id: 7, bundle_id: 1, bundle_qty: 1, completed: false},

        {purchase_id: 8, bundle_id: 1, bundle_qty: 1, completed: false},
        {purchase_id: 8, bundle_id: 2, bundle_qty: 2, completed: false},
        {purchase_id: 8, bundle_id: 3, bundle_qty: 1, completed: false},

        {purchase_id: 9, bundle_id: 3, bundle_qty: 1, completed: false},
        {purchase_id: 9, bundle_id: 2, bundle_qty: 5, completed: false},
        {purchase_id: 9, bundle_id: 1, bundle_qty: 1, completed: false},

        {purchase_id: 10, bundle_id: 2, bundle_qty: 2, completed: false},

        {purchase_id: 11, bundle_id: 1, bundle_qty: 11, completed: false},
        {purchase_id: 11, bundle_id: 2, bundle_qty: 2, completed: false},

        {purchase_id: 14, bundle_id: 3, bundle_qty: 12, completed: false},
        {purchase_id: 14, bundle_id: 2, bundle_qty: 2, completed: false},

        {purchase_id: 15, bundle_id: 1, bundle_qty: 15, completed: false},

        {purchase_id: 16, bundle_id: 2, bundle_qty: 20, completed: false},

        {purchase_id: 17, bundle_id: 1, bundle_qty: 6, completed: false},
        {purchase_id: 17, bundle_id: 3, bundle_qty: 2, completed: false},

        {purchase_id: 18, bundle_id: 1, bundle_qty: 7, completed: false},
        {purchase_id: 18, bundle_id: 2, bundle_qty: 2, completed: false},

        {purchase_id: 20, bundle_id: 3, bundle_qty: 8, completed: false},
        {purchase_id: 20, bundle_id: 2, bundle_qty: 2, completed: false},
      ])
    })
};
