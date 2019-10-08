var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (!req.session.user) {
    res.render('guest/index.ejs', { message : req.flash('message')});
  }
  else {res.render('user/index-login', {message : req.flash('message'), fullname : req.session.fullname })};
});

router.get('/login', function(req, res) {
  res.render('general/login.ejs', {message : req.flash('message')});
});

router.get('/register', function(req, res) {
  res.render('general/register', {message: ''});
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});


router.post('/register', function(req, res) {
    var post = req.body;
    if (post.confirm_password != post.password) res.render('register', {message: "Mật khẩu xác nhận không trùng khớp"});
    var sql = 'insert into users(u_email,u_password,u_role,u_firstName,u_lastName) VALUES ?';
    var user = [[post.email,post.password,"0",post.firstname,post.lastname]];
    db.query(sql, [user], function (err, result) {
      if (err) {
        res.render('general/register', {message: 'Tài khoản đã tồn tại'});
      }
      else {
	      req.flash('message', 'Đăng ký thành công !!!')
        res.redirect('/');
      }
    });
});

router.post('/login', function(req, res) {
  var post = req.body;
  var username = post.username;
  var password = post.password;
  var sql = 'select * from users where u_email = "' + username + '" and u_password = "' + password + '"';
  db.query(sql, function(err,result) {
    if (result.length == 0) {
      res.render('general/login', {message: "Email hoặc mật khẩu không chính xác !"});
    }
    else {
      req.session.user_id = result[0].u_id;
      req.session.user = result[0].u_email;
      req.session.fullname = result[0].u_firstName + " " + result[0].u_lastName;
      res.redirect('/');
    }
  })
})

module.exports = router;
