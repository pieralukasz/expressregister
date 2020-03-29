var express = require('express');
var router = express.Router();


// Login Page
router.get('/login', (req, res) => {
  res.render('welcome', { title: 'Login' });
})


//Register Page

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
})


module.exports = router;
