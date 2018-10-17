exports.up = function(knex, Promise) {
  return knex.schema.createTable('recraft_bundles', (table) => {
    table.increments();
    table.integer('recraft_id').references('recraft.id');
    table.integer('bundle_id').references('bundles.id');
    table.integer('bundle_qty');
    table.boolean('inventory').defaultTo(false);
    table.boolean('started').defaultTo(false);
    table.boolean('completed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recraft_bundles')
};
