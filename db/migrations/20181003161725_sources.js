exports.up = function(knex, Promise) {
  return knex.schema.createTable('sources', (table) => {
    table.increments();
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('type_id').references('types.id');
    table.string('name').notNullable();
    table.string('link').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sources')
};
