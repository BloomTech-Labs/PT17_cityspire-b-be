const router = require('express').Router();

const Favorites = require('./favoritesModel');

const db = require('../../data/db-config');

// #################################
// Get a list of the Users favorites
// #################################

router.get('/:id/', async (req, res) => {
  const userId = req.params.id;
  console.log('USERID ==>', userId);
  const favs = await db('favorites').where({ profile_id: userId });
  console.log('FAVS ==>', favs);
  const cityId = favs[0].city_id;
  console.log('cityId==>', cityId);
  let f = [];
  for (let fav in favs) {
    console.log('fav ==>', fav);
    let x = await db('cities').where({ id: favs[fav].city_id });
    console.log('FAV ==>', x);
    // let f += x;
    console.log(f);
    f.push(x);
  }
  res.status(200).json({ f });

  // Favorites.findById(userId)
  //   .then((fav) => {
  //     res.status(200).json({ message: 'Success', fav });
  //   })
  //   .catch((err) => {
  //     res
  //       .status(404)
  //       .json({ message: 'Error with request', error: err.message });
  //   });
});

// #################################
// Get City to Profile
// #################################

// #################################
// Save city to favorites
// #################################

router.post('/:id/favorites', (req, res) => {
  const newFav = req.body;
  Favorites.add(newFav)
    .then((postFav) => {
      res.status(201).json({ message: 'Successfully, Saved a city!', postFav });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: 'Failed to save city', error: err.message });
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
