exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists', (table) => {
    table.increments();
    table.integer('shop_id').references('shops.id');
    table.string('name').notNullable();
    table.boolean('deleted').defaultsTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lists')
};
