exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_bundles', (table) => {
    table.integer('purchase_id').references('purchases.id');
    table.integer('bundle_id').notNullable().references('bundles.id');
    table.integer('staff_id').nullable().references('staff.id');
    table.integer('bundle_qty').notNullable()
    table.boolean('completed').nullable().defaultsTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_bundles')
};
