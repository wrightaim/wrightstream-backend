exports.up = function(knex, Promise) {
  return knex.schema.createTable('kinds', (table) => {
    table.increments();
    table.integer('shop_id').notNullable().references('shops.id');
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('kinds')
};
