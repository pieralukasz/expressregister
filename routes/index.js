var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render(`welcome/welcome`, { title: 'Logowanie', classname: 'authentication--login' });
});

module.exports = router;
