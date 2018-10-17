exports.up = function(knex, Promise) {
  return knex.schema.createTable('supply_statuses', (table) => {
    table.increments();
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('supply_statuses')
};
