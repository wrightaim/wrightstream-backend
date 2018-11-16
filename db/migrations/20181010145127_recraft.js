exports.up = function(knex, Promise) {
  return knex.schema.createTable('recraft', (table) => {
    table.increments();
    table.integer('purchase_id').references('purchases.id');
    table.integer('shop_id').references('shops.id')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('completed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recraft')
};
