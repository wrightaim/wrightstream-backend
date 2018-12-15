exports.seed = function(knex, Promise) {
  return knex('shops').del()
    .then(function () {
      return knex('shops').insert([
        {id: 1, name: 'claudias_test', shop_name: 'Claudia\'s Bakery', email: 'cligidakis@yahoo.com'},
        {id: 2, name: 'theknitkit', shop_name: 'The Knit Kit', email: 'vikanda@wrightstream.com', logo: 'https://delewoo.com/wp-content/uploads/2018/04/il_570xN.1313596828_kcb3.jpg'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('shops_id_seq', (SELECT MAX(id) FROM shops));"
      );
    });
};
