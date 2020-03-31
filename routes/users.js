const express = require('express');
const router = express.Router();
const User = require('../models/User')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const passport = require('passport')


// User model 



// Login Page
router.get('/login', (req, res) => {
  // console.log(req.flash('error'))
  res.render('welcome/welcome', { title: 'Login', classname: 'authentication--login' });
})


// Login Handle 

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
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

  // Check NIP

  if (!validator.isLength(name, 9, 10) || !validator.isNumeric(name)) {
    errors.push({ msg: `NIP ${name} jest za krótki lub nie jest liczbą` })
  }

  // Check Email

  if (!validator.isEmail(email)) {
    errors.push({ msg: 'Podałeś zły email!' })
  }

  // Check Password

  if (!validator.isLength(password, 8, 32)) {
    errors.push({ msg: 'Hasło jest za krótkie' })
  }

  // Check Second Password

  if (password !== password2) {
    errors.push({ msg: 'Hasła różnią się od siebie' })
  }



  if (errors.length > 0) {

    // Show info about mistakes

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


              // Set pssword to hashed
              newUser.password = hash;

              // Add to Database
              newUser.save()
                .then(user => {
                  req.flash("success", "You are now registered and can log in!");
                  // req.flash("success", "Come and Log In!");
                  res.redirect('/users/login')
                })
                .catch(err => console.log(err))
            }))
        }
      })
  }

})

// Logout Handle 

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are logged out')
  res.redirect('/users/login')
});

module.exports = router;
