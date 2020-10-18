var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('footer', { title: 'Copyright ebooff-admin' });
});

module.exports = router;
