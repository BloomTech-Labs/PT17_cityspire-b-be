exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('favorites')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {
          id: 0,
          city_id: 0,
          profile_id: 'q2frnebuhwpnvi8wyt1y',
        },
        {
          id: 1,
          city_id: 4,
          profile_id: 'xreq614t6kunbppl09it',
        },
        {
          id: 2,
          city_id: 4,
          profile_id: '00ulthapbErVUwVJy4x6',
        },
        {
          id: 3,
          city_id: 3,
          profile_id: '00ulthapbErVUwVJy4x6',
        },
        {
          id: 4,
          city_id: 5,
          profile_id: 'q2frnebuhwpnvi8wyt1y',
        },
      ]);
    });
};
