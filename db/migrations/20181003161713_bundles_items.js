exports.up = function(knex, Promise) {
  return knex.schema.createTable('bundles_items', (table) => {
    table.increments();
    table.integer('bundle_id').notNullable().references('bundles.id');
    table.integer('item_id').notNullable().references('items.id');
    table.integer('item_qty').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bundles_items')
};
