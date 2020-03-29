var express = require('express');
var router = express.Router();



// Login Page
router.get('/login', (req, res) => {
  res.render('welcome/welcome', { title: 'Login', classname: 'authentication--login' });
})


//Register Page

router.get('/register', (req, res) => {
  res.render('welcome/register', { title: 'Register', classname: 'authentication--registerx' });
})

// Register Handle 

router.post('/register', (req, res) => {

  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' })
  }

  if (password !== password2) {
    errors.push({ msg: 'Password is not correct' })
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at leeast 6 char' })
  }


  if (errors.length > 0) {
    res.json(errors)
  }


})

module.exports = router;
