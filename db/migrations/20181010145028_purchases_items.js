exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_items', (table) => {
    table.integer('purchase_id').references('purchases.id');
    table.integer('item_id').notNullable().references('items.id');
    table.integer('staff_id').nullable().references('staff.id');
    table.integer('item_qty').notNullable()
    table.boolean('completed').notNullable().defaultsTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_items')
};
