var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  db.query('select * from tests t inner join users u on u.u_id = t.u_id', function (e, tests) {
    if (e) console.log(e);
    else {
      res.render('general/tests', { fullname: req.session.fullname, message: '', tests: tests })
    }
  })
});

router.get('/dotest/:id', function (req, res) {
  if (!req.session.user) {
    req.flash('message', 'Vui lòng đăng nhập để làm bài test !')
    res.redirect('/login');
  } else {
    var id = req.params.id;
    db.query('select * from tests where t_id = ' + id, function (e, test) {
      if (e) console.log(e);
      else {
        if (!test[0].t_isActive) {
          req.flash('message', 'Bài thi đang bị khóa ! Liên hệ chủ bài thi để mở khóa !')
          res.redirect('/');
        } else {
          var questions_content = [];
          db.query('select q_type,q_content,q.q_id,a.a_data,q_type,a.a_id from tests_questions tq inner join questions q on q.q_id = tq.q_id' +
            ' inner join answers a on a.q_id = q.q_id where t_id = ' + id, function (er, questions) {
              if (er) console.log(er);
              else {
                var question0 = { q_id: questions[0].q_id, q_type: questions[0].q_type, q_content: questions[0].q_content };
                var questions0 = [];
                questions0.push(question0);
                var answers = [];
                for (i in questions) {
                  answers.push({ q_id: questions[i].q_id, data: questions[i].a_data, id: questions[i].a_id });
                  var ids = [];
                  for (j in questions0) {
                    ids.push(questions0[j].q_id);
                  }
                  if (!(ids.includes(questions[i].q_id))) {
                    questions0.push({ q_id: questions[i].q_id, q_type: questions[i].q_type, q_content: questions[i].q_content });
                  }
                }
                res.render('user/dotest', { message: '', fullname: req.session.fullname, test: test[0], questions: questions0, answers: answers });
              }
            })
        }
      }
    })
  }
});

router.get('/new', function (req, res) {
  if (!req.session.user) {
    req.flash('message', 'Vui lòng đăng nhập để thêm bài test !')
    res.redirect('/login');
  } else {
    var sql = "select * from questions join answers on questions.q_id = answers.q_id where u_id = " + req.session.user_id;
    db.query(sql, function (err, result) {
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

router.get('/history/:id', function (req, res) {
  var t_id = req.params.id;
  var sql = 'select d.*, u.*, t.* from do_test d inner join users u on u.u_id = d.u_id inner join tests t on t.t_id = d.t_id where d.t_id = ' + t_id + ' order by d.do_id DESC';
  db.query(sql, function (e, result) {
    db.query('select * from tests where t_id = ' + t_id, function (er, t) {
      if (e || er || t[0].u_id != req.session.user_id) {
        console.log(e + sql);
        res.redirect('/');
      } else {
        if (result.length == 0) {
          req.flash('message', 'fail');
          res.redirect('/profile');
        } else {
          res.render('user/history', { message: '', fullname: req.session.fullname, d: result });
        }
      }
    })
  })
})

router.post('/new', function (req, res) {
  var post = req.body;
  var list_ques = post.ques;
  var now = new Date();
  var date = new Date(now.getTime() + (1000 * 60 * 60 * 7)).toJSON().slice(0, 19).replace('T', ' ');
  if (post.password != '') var sql = `insert into tests(t_name,u_id, t_time, t_timeCreate, t_password) values ("${post.name}","${req.session.user_id}", "${post.time}", "${date}" , "${post.password}")`;
  else var sql = `insert into tests(t_name,u_id, t_time, t_timeCreate) values ("${post.name}","${req.session.user_id}", "${post.time}", "${date}")`;
  db.query(sql, function (err, result) {
    if (err) {
      req.flash('message', 'Thêm bài test bị lỗi ' + err);
      res.redirect('/tests/new');
    } else {
      var test_ques = [];
      list_ques.forEach(function (ques) {
        test_ques.push([ques, result.insertId]);
      })
      sql = 'insert into tests_questions(q_id, t_id) values ?';
      db.query(sql, [test_ques], function (e, kq) {
        if (e) {
          req.flash('message', 'Thêm câu hỏi bị lỗi ' + e + " " + sql);
          res.redirect('/tests/new');
        }
        else {
          req.flash('message', 'Thêm bài test thành công ! Link bài test: localhost:4000/tests/dotest/' + result.insertId);
          res.redirect('/tests/new');
        }
      })
    }
  })
})

router.post('/success', function (req, res) {
  var post = req.body;
  var total_ques = post.total_ques;
  var name = post.name_test;
  
  var test_id = post.test_id;
  delete post.total_ques;
  delete post.name_test;
  delete post.test_id;
  var q_id = Object.keys(post);
  var mark = 0;
  db.query('select * from answers a inner join questions q on a.q_id = q.q_id where a.q_id in (?)', [q_id], function (err, answers) {
    for (i in post) {
      var question = answers.find(x => x.q_id == i);
      if (question.q_type == 1) {
        if (question.a_data == post[i]) mark++;
      }
      if (question.q_type == 2) {
        if (answers.find(x => x.a_id == post[i]).a_true == 1) mark++;
      }
      if (question.q_type == 3) {
        var a1 = post[i];
        var a2 = [];
        for (j in answers) {
          if (answers[j].q_id == i && answers[j].a_true) a2.push(answers[j].a_id);
        }
        if (typeof (a1) === 'number' || typeof (a1) === 'string') {
          if (a2.length == 1 && a1 == a2[0]) mark++;
        }
        else if (a1.sort().toString() == a2.sort().toString()) mark++;
      }
    }
    var num_correct = mark;
    var num = mark / total_ques;
    mark = Math.round(num * 100 + Number.EPSILON) / 10;
    var now = new Date();
    var date = new Date(now.getTime() + (1000 * 60 * 60 * 7)).toJSON().slice(0, 19).replace('T', ' ');
    var dotest = [[req.session.user_id, Number(test_id), mark, date]];
    var sql = 'insert into do_test(u_id, t_id, mark, time) values ?'
    db.query(sql, [dotest], function (e, ok) {
      if (e) {
        console.log(e);
        console.log(sql);

      }
      res.render('user/success', {
        message: '', fullname: req.session.fullname, name: name,
        length: total_ques, mark: mark, num: num_correct
      });
    })

  })
})

router.delete('/delete/:id', function (req, res) {
  db.query("select u_id from tests where t_id = " + req.params.id, function (err, result) {
    if (err) console.log(err);
    if (result[0].u_id === req.session.user_id || req.session.isAdmin) {
      db.query("delete from tests where t_id = " + req.params.id, function (error, resu) {
        if (error) console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.send({ data: 'OK' })
      })
    };
  })

  //return res.status(200);
})

router.get('/close/:id', function (req, res) {
  db.query("select u_id from tests where t_id = " + req.params.id, function (err, result) {
    if (err) console.log(err);
    if (result[0].u_id === req.session.user_id || req.session.isAdmin) {
      db.query("UPDATE tests SET t_isActive = NOT t_isActive where t_id = " + req.params.id, function (error, resu) {
        if (error) console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.send({ data: 'OK' })
      })
    };
  })

  //return res.status(200);
})

module.exports = router;
