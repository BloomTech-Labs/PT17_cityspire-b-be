exports.up = function (knex) {
  return knex.schema.createTable('favorites', function (table) {
    table.increments();
    table.string('city');
    table.string('state');
    table.float('diversity_index');
    table.float('population');
    table.float('rental_price');
    table.string('crime');
    table.string('air_quality_index');
    table.float('walkability');
    table.float('livability');
    table.float('latitude');
    table.float('longitude');
    table
      .string('profile_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExist('favorites');
};
