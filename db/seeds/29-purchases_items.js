exports.seed = function(knex, Promise) {
  return knex('purchases_items').del()
    .then(function () {
      return knex('purchases_items').insert([
        {purchase_id: 1, item_id: 1, item_qty: 1, completed: false},
        {purchase_id: 1, item_id: 2, item_qty: 3, completed: false},

        {purchase_id: 2, item_id: 5, item_qty: 1, completed: false},

        {purchase_id: 3, item_id: 8, item_qty: 3, completed: false},

        {purchase_id: 4, item_id: 2, item_qty: 2, completed: false},
        {purchase_id: 4, item_id: 4, item_qty: 1, completed: false},

        {purchase_id: 5, item_id: 12, item_qty: 9, completed: false},
        {purchase_id: 5, item_id: 1, item_qty: 2, completed: false},

        {purchase_id: 6, item_id: 11, item_qty: 2, completed: false},

        {purchase_id: 7, item_id: 11, item_qty: 1, completed: false},
        {purchase_id: 7, item_id: 9, item_qty: 3, completed: false},

        {purchase_id: 9, item_id: 8, item_qty: 8, completed: false},
        {purchase_id: 9, item_id: 1, item_qty: 7, completed: false},
        {purchase_id: 9, item_id: 2, item_qty: 2, completed: false},

        {purchase_id: 10, item_id: 4, item_qty: 6, completed: false},
        {purchase_id: 10, item_id: 6, item_qty: 3, completed: false},

        {purchase_id: 11, item_id: 8, item_qty: 2, completed: false},

        {purchase_id: 12, item_id: 10, item_qty: 10, completed: false},
        {purchase_id: 12, item_id: 11, item_qty: 4, completed: false},
        {purchase_id: 12, item_id: 16, item_qty: 30, completed: false},
        {purchase_id: 12, item_id: 4, item_qty: 5, completed: false},
        {purchase_id: 12, item_id: 3, item_qty: 6, completed: false},
        {purchase_id: 12, item_id: 9, item_qty: 5, completed: false},
        {purchase_id: 12, item_id: 12, item_qty: 6, completed: false},

        {purchase_id: 13, item_id: 8, item_qty: 6, completed: false},
        {purchase_id: 13, item_id: 4, item_qty: 3, completed: false},
        {purchase_id: 13, item_id: 12, item_qty: 4, completed: false},
        {purchase_id: 13, item_id: 2, item_qty: 3, completed: false},

        {purchase_id: 14, item_id: 3, item_qty: 14, completed: false},
        {purchase_id: 14, item_id: 1, item_qty: 3, completed: false},

        {purchase_id: 15, item_id: 6, item_qty: 2, completed: false},
        {purchase_id: 15, item_id: 11, item_qty: 33, completed: false},

        {purchase_id: 16, item_id: 12, item_qty: 12, completed: false},
        {purchase_id: 16, item_id: 1, item_qty: 3, completed: false},

        {purchase_id: 17, item_id: 12, item_qty: 23, completed: false},
        {purchase_id: 17, item_id: 4, item_qty: 3, completed: false},

        {purchase_id: 18, item_id: 6, item_qty: 2, completed: false},
        {purchase_id: 18, item_id: 7, item_qty: 3, completed: false},
        {purchase_id: 18, item_id: 10, item_qty: 3, completed: false},

        {purchase_id: 19, item_id: 1, item_qty: 18, completed: false},


      ])
    })
};
