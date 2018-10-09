exports.up = function(knex, Promise) {
  return knex.schema.createTable('priority', (table) => {
    table.integer('shop_id').references('shops.id');
    table.string('backlog').defaultsTo('[]');
    table.string('pending').defaultsTo('[]');
    table.string('finalize').defaultsTo('[]');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('priority')
};
