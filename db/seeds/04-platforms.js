exports.seed = function(knex, Promise) {
  return knex('platforms').del()
    .then(function () {
      return knex('platforms').insert([
        { id: 1, name: 'Etsy', logo: 'https://cdn.freebiesupply.com/logos/large/2x/etsy-logo-black-and-white.png', color: '#f27223', url: 'https://www.etsy.com'},
        { id: 2, name: 'Shopify', logo: 'https://bondconsultingservices.com/wp-content/uploads/2017/09/shopify-logo.png', color: '#f7f7f7', url: 'https://www.shopify.com'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('platforms_id_seq', (SELECT MAX(id) FROM platforms));"
      );
    });
};
