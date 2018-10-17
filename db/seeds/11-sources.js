exports.seed = function(knex, Promise) {
  return knex('sources').del()
    .then(function () {
      return knex('sources').insert([
        {id: 1, name: 'Georgias Dairy Farm', shop_id: 1, link: 'email@email', type_id: '1'},
        {id: 2, name: 'Charlies Frosting Factory', shop_id: 1, link: 'email@email', type_id: '1'},
        {id: 3, name: 'Amazon', link: 'amazon.com', shop_id: 1, type_id: '2'},
        {id: 4, name: 'Georgias Yarn Factory', shop_id: 2, link: 'email@email', type_id: '1'},
        {id: 5, name: 'Claires Ribbons', shop_id: 2, link: '480-294-3783', type_id: '3'},
        {id: 6, name: 'Amazon', link: 'amazon.com', shop_id: 2, type_id: '2'},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('sources_id_seq', (SELECT MAX(id) FROM sources));"
      );
    });
};
