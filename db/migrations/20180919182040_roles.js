exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments().unique();
    table.string('name').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles')
};
