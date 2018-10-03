exports.up = function(knex, Promise) {
  return knex.schema.createTable('platforms', (table) => {
    table.increments();
    table.string('name').notNullable()
    table.string('logo').notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('platforms')
};
