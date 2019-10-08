var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (!req.session.user) {
    res.render('guest/index.ejs', { message : '' })
  }
  else {res.render('user/index-login', { message : '', fullname : req.session.fullname })};
});

router.get('/new', function(req, res) {
  if (!req.session.user) {
    req.flash('message', 'Vui lòng đăng nhập để thêm câu hỏi !')
    res.redirect('/login');
  }
  else {res.render('user/add-question', { message : '', fullname : req.session.fullname })};
});

router.post('/new', function(req, res) {
  if (!req.session.user) {
    req.flash('message', 'Vui lòng đăng nhập để thêm câu hỏi !')
    res.redirect('/login');
  }
  else {
    var post = req.body;
    var question = 
    res.render('user/add-question', {message : 'Đã lưu câu hỏi !', fullname : req.session.fullname});
  };
});

module.exports = router;
