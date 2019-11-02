var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res) {
  if (!req.session.user) {
    res.render('general/index', { message : req.flash('message')});
  }
  else {res.render('general/index', {message : req.flash('message'), fullname : req.session.fullname })};
});

router.get('/login', function(req, res) {
  res.render('guest/login', {message : req.flash('message')});
});

router.get('/register', function(req, res) {
  res.render('guest/register', {message: ''});
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

// router.get('/profile', function(req, res) {
//   var query = "SELECT u_email,u_firstName,u_lastName,u_description from users WHERE u_id = " + req.session.user_id;
//   db.query(query,async function(err, user){
//     if (err) {
//       console.log(query);
//       res.redirect('/');
//     }
//     else {
//       var tests = await db.query("select * from tests where u_id = " + req.session.user_id);
//       console.log(tests);
//       res.render('user/profile', {message : req.flash('message'), fullname : req.session.fullname, user : user[0] });
//     }
//   })
// });

router.get('/profile',async function(req, res) {
  let id = req.session.user_id;
  if (id) {
  User.getDetailUser(id, function(err, user) {
    User.getListQuestion(id, function(error, questions) {
      User.getListTest(id, function(e, tests) {
        res.render('user/profile', {message : req.flash('message'), fullname : req.session.fullname, user : user[0], tests: tests, questions: questions});
      })
    })
  })
}
});

router.get('/profile/:id',async function(req, res) {
  var id = req.params.id;
  var query = "SELECT u_email,u_firstName,u_lastName,u_description from users WHERE u_id = " + id;
  db.query(query,async function(err, user){
    if (err) {
      console.log(query);
      res.redirect('/');
    }
    else {
      var tests = await db.query("select * from tests where u_id = " + id);
      console.log(tests);
      res.render('user/profile', {message : req.flash('message'), fullname : req.session.fullname, user : user[0] });
    }
  })
});

router.get('/search', function(req, res) {
  var key = req.query.key;
  if (!req.session.user) res.render('general/search', {message: ''});
  else res.render('general/search', {message : '', fullname : req.session.fullname });
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
    if (result.length == 0 || err) {
      res.render('guest/login', {message: "Email hoặc mật khẩu không chính xác !"});
    }
    else {
      req.session.user_id = result[0].u_id;
      req.session.user = result[0].u_email;
      req.session.fullname = result[0].u_firstName + " " + result[0].u_lastName;
      res.redirect('/');
    }
  })
})

router.post('/profile', function(req, res) {
  var post = req.body;
  var sql = 'update users set u_firstName = "' + post.firstname + '",u_lastName = "' + post.lastname + '", u_description = "' + post.des + '" where u_id = ' + req.session.user_id;
  db.query(sql, function(err,result) {
    if (err) {
      console.log(sql);
      req.flash('message', 'Cập nhật thông tin bị lỗi');
      res.redirect('/profile');
    }
    else {
      req.flash('message', 'Cập nhật thông tin thành công');
      res.redirect('/profile');
    }
  })
})

module.exports = router;
