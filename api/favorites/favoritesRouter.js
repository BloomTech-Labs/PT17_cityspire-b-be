const router = require('express').Router();

const Favorites = require('./favoritesModel');

const db = require('../../data/db-config');

async function searchByCity(x) {
  const city = await db('cities').where({ city: x });
  if (city.length == 0) {
    return false;
  } else {
    return true;
  }
}

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
  const cities = await db('cities');
  const newFav = req.body;
  const newFavName = req.body.city;

  if (!searchByCity(newFavName)) {
    db('cities').insert(newFav);
  }

  console.log('CITIES ====> ', cities);

  const fav = {};
  fav.profile_id = req.params.id;
  fav.city_id = newFav.id;
  res.status(200).json({
    message: 'Congratulations on Saving a city to your favorites!',
    fav,
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
