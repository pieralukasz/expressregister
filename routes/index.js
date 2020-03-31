const express = require('express');
const router = express.Router();
const { ensureAuthenticated, youAreNotLog } = require('../config/auth')

/* GET home page. */
router.get('/', youAreNotLog, (req, res, next) => {
  res.render(`welcome/welcome`, { title: 'Logowanie', classname: 'authentication--login' });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboards', { user: req.user.email, title: 'Dashboard!!' })
}
);

module.exports = router;
