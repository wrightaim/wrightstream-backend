exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table.integer('shop_id').references('shops.id');
    table.integer('order_status_id').references('order_statuses.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders')
};
