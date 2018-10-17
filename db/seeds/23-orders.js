exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return knex('orders').insert([
        {id: 1, shop_id: 1, order_status_id: 1},
        {id: 2, shop_id: 1, order_status_id: 1}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders));"
      );
    });
};
