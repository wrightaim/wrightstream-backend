exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases', (table) => {
    table.increments();
    table.integer('store_id').notNullable().references('stores.id');
    table.integer('staff_id').notNullable().references('staff.id');
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('receipt_id').notNullable();
    table.date('purchase_date').notNullable();
    table.boolean('quality_check').defaultsTo(false);
    table.boolean('pick_up').defaultsTo(false);
    table.string('service');
    table.string('tracking');
    table.date('delivery_date').notNullable();
    table.boolean('archived').defaultsTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases')
};
