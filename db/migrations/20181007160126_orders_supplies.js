exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders_supplies', (table) => {
    table.integer('order_id').references('orders.id');
    table.integer('supply_id').references('supplies.id');
    table.decimal('supply_qty').notNullable();
    table.string('measure_unit');
    table.integer('supply_status_id').references('supply_statuses.id').defaultsTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders_supplies')
};
