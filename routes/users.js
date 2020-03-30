const express = require('express');
const router = express.Router();
const User = require('../models/User')
const validator = require('validator');
const bcrypt = require('bcryptjs')


// User model 



// Login Page
router.get('/login', (req, res) => {
  let information = ""
  res.render('welcome/welcome', { title: 'Login', classname: 'authentication--login', information });
})


//Register Page

router.get('/register', (req, res) => {
  res.render('welcome/register', { title: 'Register', classname: 'authentication--registerx' });
})

// Register Handle 

router.post('/register', (req, res) => {

  let { name, email, password, password2 } = req.body;
  email = validator.normalizeEmail(email);
  let errors = []

  if (!validator.isLength(name, 10, 11) || !validator.isNumeric(name)) {
    errors.push({ msg: `The name ${name} is to short or is not a NIP` })
  }

  if (!validator.isEmail(email)) {
    errors.push({ msg: 'You put the wrong email' })
  }

  if (!validator.isLength(password, 8, 32)) {
    errors.push({ msg: 'The password is to short' })
  }

  if (password !== password2) {
    errors.push({ msg: 'The password is not the same' })
  }

  if (errors.length > 0) {
    res.render('welcome/register', { title: 'Register', classname: 'authentication--registerx', errors });
  } else {
    // Validation passed
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ msg: 'Email is already registered' })
          res.render('welcome/register', { title: 'Register', classname: 'authentication--registerx', errors });
        } else {
          const newUser = new User({
            NIP: name,
            email,
            password
          });

          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Set pssword to hased
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('succes_msg', "You can login now");
                  res.redirect('/users/login')
                })
                .catch(err => console.log(err))
            }))
        }
      })
  }

})

module.exports = router;
