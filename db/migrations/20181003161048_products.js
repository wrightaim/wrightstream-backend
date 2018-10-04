exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.integer('store_id').notNullable().references('stores.id');
    table.string('title').notNullable();
    table.string('image').notNullable();
    table.bigInteger('listing_id').notNullable();
    table.integer('product_qty').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products')
};
