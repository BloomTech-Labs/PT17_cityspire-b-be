exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favorites')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {
          city: 'wichita',
          state: 'Kansas',
          rental_price: '850',
          crime: 'medium',
          air_quality_index: 'low',
          diversity_index: '58',
          walkability: '2.0',
          livability: '85',
          profile_id: '00ulthapbErVUwVJy4x6',
        },
        {
          city: 'Atlanta',
          state: 'Georgia',
          rental_price: '850',
          crime: 'medium',
          air_quality_index: 'low',
          diversity_index: '58',
          walkability: '2.0',
          livability: '85',
          profile_id: '00ulthapbErVUwVJy4x6',
        },
      ]);
    });
};
