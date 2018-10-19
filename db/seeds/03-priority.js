exports.seed = function(knex, Promise) {
  return knex('priority').del()
    .then(function () {
      return knex('priority').insert([
        {shop_id: 1, backlog: "[3]", pending: "[]", finalize: "[]"},
        {shop_id: 2, backlog: "[]", pending: "[]", finalize: "[]"}
      ]);
    });
};
