var express = require('express');
var router = express.Router();
const { ensureAuthenticated, areYouLog } = require('../config/auth')

/* GET home page. */
router.get('/', areYouLog, (req, res, next) => {
  res.render(`welcome/welcome`, { title: 'Logowanie', classname: 'authentication--login' });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboards', { user: req.user.email, title: 'Dashboard!!' })
}
);

module.exports = router;
