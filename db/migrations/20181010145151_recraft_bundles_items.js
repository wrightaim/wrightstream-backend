exports.up = function(knex, Promise) {
  return knex.schema.createTable('recraft_bundles_items', (table) => {
    table.increments();
    table.integer('recraft_bundle_id').references('recraft_bundles.id');
    table.integer('item_id').references('items.id');
    table.integer('item_qty').defaultTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recraft_bundles_items')
};
