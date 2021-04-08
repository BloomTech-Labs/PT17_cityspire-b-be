exports.up = function (knex) {
  return knex.schema.createTable('favorites', function (table) {
    table.increments();
    table
      .string('profile_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles');
    table
      .string('city_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cities');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExist('favorites');
};
