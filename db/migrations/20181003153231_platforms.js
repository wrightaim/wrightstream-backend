exports.up = function(knex, Promise) {
  return knex.schema.createTable('platforms', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.string('logo').notNullable();
    table.string('color').notNullable();
    table.string('url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('platforms')
};
