exports.up = function(knex, Promise) {
  return knex.schema.createTable('recraft_items', (table) => {
    table.increments();
    table.integer('recraft_id').references('recraft.id');
    table.integer('item_id').references('bundles.id');
    table.integer('item_qty');
    table.boolean('inventory').defaultTo(false);
    table.boolean('started').defaultTo(false);
    table.boolean('completed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recraft_items')
};
