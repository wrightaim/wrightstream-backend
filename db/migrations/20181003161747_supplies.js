exports.up = function(knex, Promise) {
  return knex.schema.createTable('supplies', (table) => {
    table.increments();
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('source_id').references('sources.id');
    table.integer('kind_id').references('kinds.id');
    table.string('name').notNullable();
    table.decimal('stock_qty').defaultsTo(0);
    table.string('measure_unit').notNullable();
    table.string('measure_type').notNullable();
    table.boolean('archived').defaultsTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('supplies')
};
