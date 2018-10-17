exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists_items', (table) => {
    table.integer('list_id').notNullable().references('lists.id');
    table.integer('item_id').notNullable().references('items.id');
    table.integer('item_qty').notNullable().defaultsTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lists_items')
};
