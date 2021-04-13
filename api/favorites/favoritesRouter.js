const router = require('express').Router();
const db = require('../../data/db-config');
const Favorites = require('./favoritesModel');

// #################################
// Get a list of the Users favorites
// #################################

router.get('/:id/', async (req, res) => {
  const userId = req.params.id;
  const favs = await db('favorites').where({ profile_id: userId });
  let f = [];
  for (let fav in favs) {
    let x = await db('cities').where({ id: favs[fav].city_id });
    f.push(x);
  }
  res.status(200).json({ f });
});

router.get('/:id/', async (req, res) => {
  const userId = req.params.id;
  const favs = await db('favorites').where({ profile_id: userId });
  let f = [];
  for (let fav in favs) {
    let x = await db('cities').where({ id: favs[fav].city_id });
    f.push(x);
  }
  res.status(200).json({ f });
});

// #################################
// Save city to favorites
// #################################

router.post('/:id/favorites', async (req, res) => {
  const newFav = req.body;
  console.log('city');
  const cities = await db('cities');
  console.log(cities);
  if (!cities.includes(newFav)) {
    db('cities').insert(newFav);
  }
  const fav = {};
  fav.profile_id = req.params.id;
  fav.city_id = newFav.id;
  console.log('fav object', fav);
  return db('favorites')
    .insert(fav)
    .then((fav) => {
      res.status(201).json({ message: 'favorite added.', fav });
    })
    .catch((err) => {
      console.log(err);
    });
});

// #################################
// Delete city from favorites
// #################################

router.delete('/:id/favorites/:id', (req, res) => {
  const { id } = req.params;
  Favorites.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          message: 'Success in deleting the city from your favorties! :-)',
        });
      } else {
        res.status(404).json({ message: 'Could not find city with given ID' });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Failed to delete city', error: err.message });
    });
});

module.exports = router;
