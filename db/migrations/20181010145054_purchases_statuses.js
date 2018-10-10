exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_statuses', (table) => {
    table.integer('purchase_id').references('purchases.id');
    table.integer('status_id').notNullable().references('statuses.id');
    table.integer('staff_id').references('staff.id');
    table.boolean('completed').defaultsTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_statuses')
};
