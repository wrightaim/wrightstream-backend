exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_supplies', (table) => {
    table.integer('purchase_id').references('purchases.id');
    table.integer('supply_id').notNullable().references('supplies.id');
    table.decimal('supply_qty').notNullable()
    table.string('measure_unit').notNullable()
    table.boolean('completed').notNullable().defaultsTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_supplies')
};
