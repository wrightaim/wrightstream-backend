exports.seed = function(knex, Promise) {
  return knex('supply_statuses').del()
    .then(() => {
      return knex('supply_statuses').insert(
        [
          {id:1, name: 'Needed'},
          {id:2, name: 'Pending'},
          {id:3, name: 'Delivered'}
        ]
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('supply_statuses_id_seq', (SELECT MAX(id) FROM supply_statuses));"
      );
    });
};
