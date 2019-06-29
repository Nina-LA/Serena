const express = require('express');
const router  = express.Router();
const Activity = require('../models/activites-model');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/*Création activités*/

router.post('/Activities/add', function(req, res, next) {

  // let titre = request.body.titre;
  // let categorie = request.body.categorie;
  // res.send({Titre: titre, Categorie: categorie})
  let { categorie, titre, date, photo, description } = req.body;
  console.log(categorie);
  date = new Date(date)
  const newActivity = new Activity({ categorie, titre, date, photo, description })
  newActivity.save()
  .then((activity)=> {
    res.send(activity);
  })
  .catch((error) => {
    console.log(error);
  })
});



router.post('/ListActivities', function(req, res, next) {

  Activity.find({categorie:{
    $in: req.body.categories
  }
  })
    .then(allTheActivities => {
      res.json(allTheActivities);
    })
    .catch(err => {
      res.json(err);
    })
});


module.exports = router;
