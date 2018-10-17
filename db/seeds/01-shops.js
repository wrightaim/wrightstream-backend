exports.seed = function(knex, Promise) {
  return knex('shops').del()
    .then(function () {
      return knex('shops').insert([
        {id: 1, name: 'claudias_test', shop_name: 'Claudia\'s Bakery', email: 'cligidakis@yahoo.com'},
        {id: 2, name: 'vikas_test', shop_name: 'Vikas\'s Sewing Company', email: 'vikanda.gonzales@gmail.com'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('shops_id_seq', (SELECT MAX(id) FROM shops));"
      );
    });
};
