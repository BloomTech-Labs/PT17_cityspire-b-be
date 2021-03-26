exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cities')
    .del()
    .then(function () {
      return knex('cities').insert([
        {
          city: 'wichita',
          state: 'Kansas',
          rental_price: '850',
          crime: 'medium',
          air_quality_index: 'low',
          diversity_index: '58',
          walkability: '2.0',
          livability: '85',
          latitude: '37.6872',
          longitude: '97.3301',
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
          latitude: '33.7490',
          longitude: '84.3880',
          profile_id: '00ulthapbErVUwVJy4x6',
        },
      ]);
    });
};
