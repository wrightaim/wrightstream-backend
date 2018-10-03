exports.up = function(knex, Promise) {
  return knex.schema.createTable('stores', (table) => {
    table.increments();
    table.integer('platform_id').notNullable().references('platforms.id');
    table.integer('shop_id').notNullable().references('shops.id');
    table.string('token_secret').notNullable();
    table.string('access_token').notNullable();
    table.string('access_token_secret').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stores')
};
