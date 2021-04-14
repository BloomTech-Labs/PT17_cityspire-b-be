/* eslint-disable no-useless-catch */
const db = require('../../data/db-config');

module.exports = {
  find,
  add,
  addCityToProfile,
  findByProfileId,
  findById,
  searchByCity,
};

function find() {
  return db('favorites').select('*').orderBy('id');
}

async function searchByCity(x) {
  const city = await db('cities').where({ city: x });
  console.log('MODELS CITY ====> ', city);
  if (city.length == 0) {
    return false;
  } else {
    const cityData = await db('cities').where({ city: x }).first();
    return cityData;
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

async function addCityToProfile(fav) {
  try {
    const profile_id = await db('favorites').insert(fav);
    // console.log('MODELS PROFILE ===> ', profile_id);
    return findByProfileId(profile_id);
  } catch (err) {
    throw err;
  }
}

async function findByProfileId(userId) {
  console.log('MODELS USERID ===>', userId);
  try {
    return await db('favorites').where({ profile_id: userId }).select('*');
  } catch (err) {
    throw err;
  }
}

function findById(id) {
  return db('favorites').where({ id }).first();
}
