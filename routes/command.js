var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('command', { title: 'ebooff-admin' });
});

module.exports = router;
