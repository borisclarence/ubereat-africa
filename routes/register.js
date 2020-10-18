var express = require('express');
const axios = require('axios').default;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'ebooff-admin' });
});

/* POST register page */
router.post('/', function(req, res, next) {
  console.log(req.body);
  //res.render('signup', { title: 'ebooff-admin' });
  const newPost = {
      firstname: req.body.firstname,
      usersex: req.body.usersex,
      lastname: req.body.lastname,
      adress_street: req.body.adress_street,
      phone_number: req.body.phone_number,
      email_user: req.body.email_user,
      password_user: req.body.password_user,
      picture_user: req.body.picture_user
  };
    console.log(req.body.firstname);
    const sendPostRequest = async () => {
      try {
          const resp = await axios.post('http://localhost:3001/register', newPost);
          console.log(resp.data);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
    };
});

module.exports = router;
