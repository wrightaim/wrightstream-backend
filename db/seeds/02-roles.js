exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(() => {
      return knex('roles').insert(
        [
          {id:1, name: 'Owner'},
          {id:2, name: 'Manager'},
          {id:3, name: 'Employee'},
          {id:4, name: 'Temporary'},
        ]
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));"
      );
    });
};
