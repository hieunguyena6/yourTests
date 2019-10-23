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
        if (result[i].q_content != result[i - 1].q_content) {
          question = {
            id: result[i].q_id,
            diff: result[i].q_level,
            type: result[i].q_type,
            lv: result[i].q_linhvuc,
            content: result[i].q_content
          };
          questions.push(question);
        }
        if (lvs.indexOf(result[i].q_linhvuc) == -1 ) {
          lvs.push(result[i].q_linhvuc);
        }
      }
      res.render('user/add-test', {
        message: '',
        fullname: req.session.fullname,
        questions: questions,
        answers: answers,
        lvs: lvs
      });
    })
  }
});

module.exports = router;
