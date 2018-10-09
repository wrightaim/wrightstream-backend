exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_statuses', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_statuses')
};
