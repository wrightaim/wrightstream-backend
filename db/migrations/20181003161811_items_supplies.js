exports.up = function(knex, Promise) {
  return knex.schema.createTable('items_supplies', (table) => {
    table.integer('item_id').references('items.id');
    table.integer('supplies_id').references('supplies.id');
    table.decimal('supply_qty').defaultsTo(0);
    table.string('measure_unit').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items_supplies')
};
