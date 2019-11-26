var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res) {
  if (!req.session) res.redirect('/');
  else if (!req.session.isAdmin) res.redirect('/');
  else {
    var sql = "select * from users where u_role = 0";
    db.query(sql, function (e, users) {
      res.render('admin/admin', {fullname : 'Admin', message : "", users: users})
    })
    
  }
})

router.get('/user', function(req, res) {
  if (!req.session) res.redirect('/');
  else if (!req.session.isAdmin) res.redirect('/');
  else {
    var sql = "select * from users where u_role = 0";
    db.query(sql, function (e, users) {
      res.render('admin/admin', {fullname : 'Admin', message : "", users: users})
    })
    
  }
})

router.get('/test', function(req, res) {
  if (!req.session) res.redirect('/');
  else if (!req.session.isAdmin) res.redirect('/');
  else {
    var sql = "select t.*,u.u_email from tests t inner join users u on t.u_id = u.u_id order by t.t_id desc";
    db.query(sql, function (e, tests) {
      res.render('admin/admin_test', {fullname : 'Admin', message : "", tests: tests});
    })
    
  }
})

router.get('/do_test', function(req, res) {
  if (!req.session) res.redirect('/');
  else if (!req.session.isAdmin) res.redirect('/');
  else {
    var sql = "select d.*,u.u_email,u.u_email,t.t_name,t.t_id from do_test d inner join users u on d.u_id = u.u_id inner join tests t on" + 
    " t.t_id = d.t_id order by d.do_id desc";
    db.query(sql, function (e, dos) {
      console.log(sql);
      console.log(dos);
      res.render('admin/admin_dotest', {fullname : 'Admin', message : "", dos: dos})
    })
    
  }
})

router.get('/upgrade/:id', function(req, res) {
  if (req.session.isAdmin) {
    db.query("update users set u_role = 1 where u_id = " + req.params.id, function (error, resu) {
      if (error) console.log(error);
      else {
        res.setHeader('Content-Type', 'application/json');
        res.send({ data: 'OK' })
      }
    })
  }
})
module.exports = router;