exports.seed = function(knex, Promise) {
  return knex('statuses').del()
    .then(() => {
      return knex('statuses').insert(
        [
          {id:1, name: 'Backlog'},
          {id:2, name: 'Pending'},
          {id:3, name: 'Crafting'},
          {id:4, name: 'Finalize'},
          {id:5, name: 'Delivery'}
        ]
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('statuses_id_seq', (SELECT MAX(id) FROM statuses));"
      );
    });
};
