var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (!req.session.user) res.render('index', { title: 'Express', message : '' });
  else res.render('index-login');
});

router.get('/login', function(req, res) {
  res.render('login', {message : ''});
});

router.get('/register', function(req, res) {
  res.render('register', {message: ''});
});

router.post('/register', function(req, res) {
    var post = req.body;
    if (post.confirm_password != post.password) res.render('register', {message: "Mật khẩu xác nhận không trùng khớp"});
    var sql = 'insert into users(u_email,u_password,u_role,u_firstName,u_lastName) VALUES ?';
    var user = [[post.email,post.password,"0",post.firstname,post.lastname]];
    db.query(sql, [user], function (err, result) {
      if (err) {
        res.render('register', {message: 'Tài khoản đã tồn tại'});
      }
      else {
        res.render('index', {message: "Đăng ký thành công"});
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
      res.render('login', {message: "Email hoặc mật khẩu không chính xác !"});
    }
    else {
      req.session.user = result[0].u_email;
      res.redirect('/');
    }
  })
})



module.exports = router;
