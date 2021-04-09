/* eslint-disable no-useless-catch */
const db = require('../../data/db-config');

module.exports = {
  find,
  add,
  addCityToProfile,
  findByProfileId,
  getCityInfo,
  findById,
  searchByCity,
};

function find() {
  return db('favorites').select('*').orderBy('id');
}

async function searchByCity(x) {
  const city = await db('cities').where({ city: x });
  if (city.length == 0) {
    return false;
  } else {
    return true;
  }
}

async function add(city) {
  try {
    const [id] = await db('favorites').insert(city, 'id');
    return findById(id);
  } catch (error) {
    throw error;
  }
}

async function addCityToProfile(profile_id, city_id) {
  try {
    return db('favorites').insert(profile_id, { city_id });
  } catch (err) {
    throw err;
  }
}

async function findByProfileId(userId) {
  try {
    return await db('favorites').where('profile_id', userId).select('*');
    // .first();
  } catch (err) {
    throw err;
  }
}

async function getCityInfo(userId) {
  try {
    return await db('cities')
      .join('favorites', 'cities.id', 'favorites.city_id')
      .where('favorites.profile_id', userId)
      .select('*');
  } catch (err) {
    throw err;
  }
}

function findById(id) {
  return db('favorites').where({ id }).first();
}

// async function findById(userId) {
//   try {
//     const [favorite] = await db('favorites')
//       .where('profile_id', userId)
//       .select('profile_id');
//     const cities = await findById(userId);
//     return { ...favorite, cities };
//   } catch (err) {
//     throw err;
//   }
// }
