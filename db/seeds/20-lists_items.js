exports.seed = function(knex, Promise) {
  return knex('lists_items').del()
    .then(function () {
      return knex('lists_items').insert([
        {list_id: 1, item_id: 7, item_qty: 1},
        {list_id: 1, item_id: 4, item_qty: 10},
        {list_id: 2, item_id: 3, item_qty: 100},
        {list_id: 2, item_id: 4, item_qty: 100},
        {list_id: 3, item_id: 1, item_qty: 4},
        {list_id: 3, item_id: 3, item_qty: 5},
        {list_id: 3, item_id: 7, item_qty: 6},
        {list_id: 3, item_id: 2, item_qty: 11}
      ]);
    });
};
