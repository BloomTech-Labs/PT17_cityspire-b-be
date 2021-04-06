exports.up = function (knex) {
  return knex.schema.createTable('favorites', function (table) {
    table.increments();
    // table.primary(['profile_id', 'city_id']);
    table.string('profile_id').notNullable();

    table
      .integer('city_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cities')
      .onDelete('cascade');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('favorites');
};
