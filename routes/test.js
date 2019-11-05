var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (!req.session.user) {
    res.render('guest/index.ejs', {
      message: ''
    })
  } else {
    res.render('user/index-login', {
      message: '',
      fullname: req.session.fullname
    })
  };
});

router.get('/dotest/:id', function(req, res) {
  if (!req.session.user) {
    req.flash('message', 'Vui lòng đăng nhập để làm bài test !')
    res.redirect('/login');
  } else {
    var id = req.params.id;
    db.query('select * from tests where t_id = ' + id, function(e, result){
      if (e) console.log(e);
      else {
        res.render('user/dotest', {message : '', fullname: req.session.fullname,test: result[0] })
      }
    })
  }
});

router.get('/new', function(req, res) {
  if (!req.session.user) {
    req.flash('message', 'Vui lòng đăng nhập để thêm bài test !')
    res.redirect('/login');
  } else {
    var sql = "select * from questions join answers on questions.q_id = answers.q_id where u_id = " + req.session.user_id;
    db.query(sql, function(err, result) {
      if (err) {
        console.log(sql);
        req.flash('message', 'Lỗi');
        res.redirect('/');
      }
      if (result.length == 0) {
        res.render('user/add-question', {
          message: 'Bạn chưa đăng câu hỏi nào. Hãy đăng câu hỏi trước khi tạo bài test !',
          fullname: req.session.fullname,
        });
      } else {
        var questions = [];
        var answers = [];
        var lvs = [];
        lvs.push(result[0].q_linhvuc);
        var answer = {
          id: result[0].q_id,
          content: result[0].a_data
        };
        answers.push(answer);
        var question = {
          id: result[0].q_id,
          type: result[0].q_type,
          content: result[0].q_content
        };
        questions.push(question);
        for (var i = 1; i < result.length; i++) {
          answer = {
            id: result[i].q_id,
            content: result[i].a_data
          };
          answers.push(answer);
          if (result[i].q_content != result[i - 1].q_content || result[i].q_type != result[i - 1].q_type) {
            question = {
              id: result[i].q_id,
              diff: result[i].q_level,
              type: result[i].q_type,
              lv: result[i].q_linhvuc,
              content: result[i].q_content
            };
            questions.push(question);
          }
          if (lvs.indexOf(result[i].q_linhvuc) == -1) {
            lvs.push(result[i].q_linhvuc);
          }
        }
        res.render('user/add-test', {
          message: req.flash('message'),
          fullname: req.session.fullname,
          questions: questions,
          answers: answers,
          lvs: lvs
        });
      }
    })
  }
});

router.post('/new', function(req, res) {
  var post = req.body;
  var list_ques = post.ques;
  var now = new Date();
  var date = new Date(now.getTime() + (1000 * 60 * 60 * 7)).toJSON().slice(0, 19).replace('T', ' ');
  if (post.password != '') var sql = `insert into tests(t_name,u_id, t_time, t_timeCreate, t_password) values ("${post.name}","${req.session.user_id}", "${post.time}", "${date}" , "${post.password}")`;
  else var sql = `insert into tests(t_name,u_id, t_time, t_timeCreate) values ("${post.name}","${req.session.user_id}", "${post.time}", "${date}")`;
  db.query(sql, function(err, result) {
    if (err) {
      req.flash('message', 'Thêm bài test bị lỗi ' + err);
      res.redirect('/tests/new');
    } else {
      var test_ques = [];
      list_ques.forEach(function(ques){
        test_ques.push([ques, result.insertId]);
      })
      sql = 'insert into tests_questions(q_id, t_id) values ?';
      db.query(sql, [test_ques],function(e, kq){
        if (e) {
          req.flash('message', 'Thêm câu hỏi bị lỗi ' + e + " " + sql);
          res.redirect('/tests/new');
        }
        else {
          req.flash('message', 'Thêm bài test thành công ! Link bài test: localhost:3000/tests/dotest/' + result.insertId);
          res.redirect('/tests/new');
        }
      })
    }
  })
})

router.delete('/delete/:id', function(req,res) {
  db.query("select u_id from tests where t_id = " + req.params.id, function(err,result){
    if (err) console.log(err);
    console.log(result[0].u_id);
    console.log(req.session.user_id);
    if(result[0].u_id === req.session.user_id || req.session.user_type == 3) {
      db.query("delete from tests where t_id = " + req.params.id, function(error, resu) {
        if (error) console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.send({ data: 'OK' })
      })
    };
  })

  //return res.status(200);
})

module.exports = router;
