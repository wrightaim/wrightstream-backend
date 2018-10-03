exports.seed = function(knex, Promise) {
  return knex('platforms').del()
    .then(function () {
      return knex('platforms').insert([
        {id: 1, name: 'Etsy', logo: 'http://1000logos.net/wp-content/uploads/2017/12/Etsy-Logo.png'},
        {id: 2, name: 'Shopify', logo: 'https://bondconsultingservices.com/wp-content/uploads/2017/09/shopify-logo.png'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('platforms_id_seq', (SELECT MAX(id) FROM platforms));"
      );
    });
};
