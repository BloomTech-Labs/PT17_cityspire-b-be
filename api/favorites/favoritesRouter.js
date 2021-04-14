const router = require('express').Router();
const db = require('../../data/db-config');
const Favorites = require('./favoritesModel');
const cities = require('../city/cityModel');

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
  const { city } = req.body;
  const userId = req.params.id;
  console.log('This is userID =====>', userId);
  console.log('data from FE ===>', city_data);
  Favorites.searchByCity(city)
    .then((city) => {
      console.log('CITY DATA BEING SAVED ===> ', city.id);
      if (!city) {
        cities
          .add(city_data)
          .then((c) => {
            console.log('City data being added ====>', c.id);
            Favorites.addCityToProfile({ profile_id: userId, city_id: c.id })
              .then((f) => {
                console.log('Fav city saved into favorites ====>', f);
                res.status(200).json({
                  message:
                    'Congratulations on Saving a city to your favorites!',
                  f,
                });
              })
              .catch((err) => {
                console.log('First error ===>', err);
                res.status(500).json({
                  message: 'something went wrong trying to add favorite!',
                });
              });
          })
          .catch((err) => {
            console.log('Second error ===>', err);
            res.status(500).json({
              message: 'something went wrong trying to add city to cities!',
            });
          });
      } else {
        console.log('CITY INFO ===> ', city.id);
        const { id } = city;
        Favorites.addCityToProfile({ profile_id: userId, city_id: id })
          .then((f) => {
            console.log('Fav city saved into favorites ====>', f);
            res.status(200).json({
              message: 'Congratulations on Saving a city to your favorites!',
              f,
            });
          })
          .catch((err) => {
            console.log('Favorites error ===>', err);
            res.status(500).json({
              message: 'something went wrong trying to add favorite!',
            });
          });
      }
    })
    .catch((err) => {
      console.log('Last error ===>', err);
      res
        .status(500)
        .json({ message: 'something went wrong trying to add favorite!' });
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
