var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res) {
  if (!req.session) res.redirect('/');
  else if (!req.session.isAdmin) res.redirect('/');
  else {

  }
})
module.exports = router;