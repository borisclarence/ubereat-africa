var express = require('express');
var router = express.Router();

const {addUser, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ebooff-admin' });
});

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.get('/user/:id', deleteUser);

module.exports = router;
