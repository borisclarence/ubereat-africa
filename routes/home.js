var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'ebooff-admin' });
});

router.post('/', function(req, res, next) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User

  (async () => {

    try {
      await db.collection('User')
      .add({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        adress_street: req.body.adress_street,
        sex: req.body.sex,
        phone_number: req.body.phone_number,
        picture: req.body.picture,
        email: req.body.email,
        password: req.body.password,
        is_active: req.body.is_active,
        state_user: req.body.state_user,
        profile_id: req.body.profile_id,
        created_at: req.body.created_at
      })
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }

  })();
});

router.put('/', function(req, res, next) {
  res.render('home', { title: 'ebooff-admin' });
});

router.delete('/', function(req, res, next) {
  res.render('home', { title: 'ebooff-admin' });
});

module.exports = router;
