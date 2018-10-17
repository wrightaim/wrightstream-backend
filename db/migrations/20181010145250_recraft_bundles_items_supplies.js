exports.up = function(knex, Promise) {
  return knex.schema.createTable('recraft_bundles_items_supplies', (table) => {
    table.integer('recraft_bundle_item_id').references('recraft_bundles_items.id');
    table.integer('supply_id').references('supplies.id');
    table.decimal('supply_qty').notNullable();
    table.string('measure_unit').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recraft_bundles_items_supplies')
};
