var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET home page. */
router.get('/', function (req, respone) {
    if (req.session.isAdmin) {
      respone.redirect('/admin');
    }
    else {
      db.query('select (select count(*) from tests) as n_test, (select count(*) from questions) as n_ques, (select count(*) from do_test) as n_dt, (select count(*) from users) as n_user from dual', function (e , res){        
        respone.render('general/index', { message: req.flash('message'), fullname: req.session.fullname || undefined, count : res[0]})
      })
    }
});

router.get('/login', function (req, res) {
  res.render('guest/login', { message: req.flash('message') });
});

router.get('/register', function (req, res) {
  res.render('guest/register', { message: '' });
});

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

router.get('/profile', async function (req, res) {
  let id = req.session.user_id;
  if (id) {
    User.getDetailUser(id, function (err, user) {
      User.getListQuestion(id, function (error, questions) {
        User.getListTest(id, function (e, tests) {
          db.query('select d.*,t.t_name from do_test d inner join tests t on t.t_id = d.t_id where d.u_id = ' + id, function (er, dos) {
            if (er) console.log(er);
            res.render('user/profile', { message: req.flash('message'), fullname: req.session.fullname, user: user[0], tests: tests, questions: questions, dos: dos });
          })
        })
      })
    })
  } else {
    res.redirect('/')
  }
});

router.get('/profile/:id', function (req, res) {
  var id = req.params.id;
  User.getDetailUser(id, function (err, user) {
    User.getListQuestion(id, function (error, questions) {
      User.getListTest(id, function (e, tests) {
        res.render('general/profile_user', { message: req.flash('message'), fullname: req.session.fullname, user: user[0], tests: tests, questions: questions });
      })
    })
  })
});

router.delete('/profile/:id', function (req, res) {
  if (req.session.isAdmin) {
    db.query("delete from users where u_id = " + req.params.id, function (error, resu) {
      if (error) console.log(error);
      else {
        res.setHeader('Content-Type', 'application/json');
        res.send({ data: 'OK' })
      }
    })
  }
})

router.get('/search', function (req, res) {
  var key = req.query.key;
  var que = "select u_id,u_firstname, u_lastName, u_email from users where u_email like '%" + key + "%'";
  db.query(que, function (e, users) {
    if (e) console.log(e);
    else {
      que = "select * from tests t inner join users u on u.u_id = t.u_id where t.t_name like '%" + key + "%' order by t.t_id DESC";
      db.query(que, function (er, tests) {
        if (!req.session.user) res.render('general/search', { message: '', fullname: '', key: key, users: users, tests: tests });
        else res.render('general/search', { message: '', fullname: req.session.fullname, key: key, users: users, tests: tests });
      })
    }
  })
});



router.post('/register', function (req, res) {
  var post = req.body;
  if (post.confirm_password != post.password) res.render('register', { message: "Mật khẩu xác nhận không trùng khớp" });
  var sql = 'insert into users(u_email,u_password,u_role,u_firstName,u_lastName) VALUES ?';
  var user = [[post.email, post.password, "0", post.firstname, post.lastname]];
  db.query(sql, [user], function (err, result) {
    if (err) {
      res.render('general/register', { message: 'Tài khoản đã tồn tại' });
    }
    else {
      req.flash('message', 'Đăng ký thành công !!!')
      res.redirect('/');
    }
  });
});

router.post('/login',async function (req, res) {
  var post = req.body;
  var username = post.username;
  var password = post.password;
  var sql = 'select * from users where u_email = "' + username + '" and u_password = "' + password + '"';
  db.query(sql,async function (err, result) {
    if (result.length == 0 || err) {
      res.render('guest/login', { message: "Email hoặc mật khẩu không chính xác !" });
    }
    else {
      let islogged = false;
      let sess = await req.sessionStore.sessions;
      let keys = Object.keys(sess)
      if (keys.length <= 1) {
        console.log('okkkk');
      }
      else {
        console.log(keys);
        let logged = [];
        for (i in keys) {
          logged.push(JSON.parse(sess[keys[i]]).user_id);
          console.log(logged);
          console.log(result[0].u_id);
        }
        if (logged.indexOf(result[0].u_id) >= 0) {
          req.flash('message', 'Tài khoản đã đăng nhập ở nơi khác !');
          res.redirect('/');
          islogged = true;
        } 
      }
      if (!islogged) {
        req.session.user_id = result[0].u_id;
        req.session.user = result[0].u_email;
        req.session.isAdmin = result[0].u_role == 1;
        req.session.fullname = result[0].u_firstName + " " + result[0].u_lastName;
        res.redirect('/');
      }
    }
  })
})

router.post('/profile', function (req, res) {
  var post = req.body;
  var sql = 'update users set u_firstName = "' + post.firstname + '",u_lastName = "' + post.lastname + '", u_description = "' + post.des + '" where u_id = ' + req.session.user_id;
  db.query(sql, function (err, result) {
    if (err) {
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
