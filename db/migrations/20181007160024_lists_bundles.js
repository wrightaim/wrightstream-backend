exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists_bundles', (table) => {
    table.integer('list_id').notNullable().references('lists.id');
    table.integer('bundle_id').notNullable().references('bundles.id');
    table.integer('bundle_qty').notNullable().defaultsTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lists_bundles')
};
