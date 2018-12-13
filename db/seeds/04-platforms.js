exports.seed = function(knex, Promise) {
  return knex('platforms').del()
    .then(function () {
      return knex('platforms').insert([
        {id: 1, name: 'Etsy', logo: 'https://www.shareicon.net/data/2016/07/16/796799_logo_512x512.png', color: '#f27223', url: 'https://www.etsy.com'},
        {id: 2, name: 'Shopify', logo: 'https://rewind.io/wp-content/uploads/2018/08/shopify-icon-optimized.png', color: '#8cbb36', url: 'https://www.shopify.com'}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('platforms_id_seq', (SELECT MAX(id) FROM platforms));"
      );
    });
};
