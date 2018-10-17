exports.up = function(knex, Promise) {
  return knex.schema.createTable('bundles', (table) => {
    table.increments();
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('product_id').references('products.id');
    table.integer('category_id').references('categories.id');
    table.string('name').notNullable();
    table.string('image').defaultsTo(null);
    table.integer('stock_qty').defaultsTo(1);
    table.boolean('archived').defaultsTo(false);
    table.text('steps').defaultsTo('[]');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bundles')
};
