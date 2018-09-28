exports.up = function(knex, Promise) {
  return knex.schema.createTable('staff', (table) => {
    table.increments();
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('role_id').notNullable().references('roles.id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.boolean('archived').defaultsTo(false);
    table.string('photo').defaultsTo('');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('staff')
};
