/* eslint-disable no-useless-catch */
const db = require('../../data/db-config');

module.exports = {
  find,
  add,
  findBy,
  findById,
};

function find() {
  return db('favorites')
    .select('id', 'city', 'state', 'population', 'rental_price', 'crime')
    .orderBy('id');
}

async function add(city) {
  try {
    const [id] = await db('favorites').insert(city, 'id');
    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db('favorites')
    .where(filter)
    .select('id', 'city', 'state', 'rental_price')
    .first();
}

function findById(id) {
  return db('favorites').where({ id }).first();
}
