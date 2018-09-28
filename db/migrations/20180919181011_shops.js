exports.up = function(knex, Promise) {
  return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.string('shop_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('logo').defaultsTo(null);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops')
};
