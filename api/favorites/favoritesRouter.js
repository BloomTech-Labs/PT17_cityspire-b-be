const router = require('express').Router();
const db = require('../../data/db-config');
const Favorites = require('./favoritesModel');
const Cities = require('../city/cityModel');

// #################################
// Get a list of the Users favorites
// #################################

router.get('/:id/', async (req, res) => {
  const userId = req.params.id;
  const favs = await db('favorites').where({ profile_id: userId });
  let favCities = [];
  for (let fav in favs) {
    let x = await db('cities').where({ id: favs[fav].city_id });
    favCities.push(x);
  }
  res.status(200).json({ favCities });
});

// #################################
// Save city to favorites
// #################################

router.post('/:id/favorites', async (req, res) => {
  const city_data = req.body;
  const { city, state } = req.body;
  const userId = req.params.id;
  const pfavs = await db('favorites').where({ profile_id: userId });
  for (let fav of pfavs) {
    const c = await db('cities').where({ id: fav.city_id });
    if (city == c[0].city && state == c[0].state) {
      res.status(500).json({ message: 'already in favs!' });
    }
  }
  Favorites.searchByCity(city, state)
    .then((cityR) => {
      if (!cityR) {
        Cities.add(city_data)
          .then((c) => {
            Favorites.addCityToProfile({ profile_id: userId, city_id: c.id })
              .then((f) => {
                res.status(200).json({
                  message:
                    'Congratulations on Saving a city to your favorites!',
                  f,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: 'something went wrong trying to add favorite!',
                  err,
                });
              });
          })
          .catch((err) => {
            res.status(500).json({
              message: 'something went wrong trying to add city to Cities!',
              err,
            });
          });
      } else {
        const { id } = city;
        Favorites.addCityToProfile({ profile_id: userId, city_id: id })
          .then((f) => {
            res.status(200).json({
              message: 'Congratulations on Saving a city to your favorites!',
              f,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: 'something went wrong trying to add favorite!',
              err,
            });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'something went wrong trying to add favorite!', err });
    });
});

// #################################
// Delete city from favorites
// #################################

router.delete('/:profileid/favorites/:cityid', (req, res) => {
  const pid = req.params.profileid;
  const cid = req.params.cityid;
  return db('favorites')
    .where({ profile_id: pid, city_id: cid })
    .del()
    .then((resp) => {
      res.status(200).json({ message: 'favorite deleted.', resp });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'something went wrong trying to delete from favs!',
        err,
      });
    });
});

module.exports = router;
