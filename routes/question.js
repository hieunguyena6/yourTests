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
    req.flash('message', 'Vui lòng đăng nhập để thêm câu hỏi !')
    res.redirect('/login');
  } else {
    res.render('user/add-question', {
      message: '',
      fullname: req.session.fullname
    })
  };
});

router.post('/new', function(req, res) {
  if (!req.session.user) {
    req.flash('message', 'Vui lòng đăng nhập để thêm câu hỏi !')
    res.redirect('/login');
  } else {
    var post = req.body;
    var question = [
      [req.session.user_id, post.content, post.type, post.linhvuc == "khac" ? post.lv_khac : post.linhvuc, post.dokho]
    ];
    var sql = "INSERT INTO questions(u_id,q_content,q_type,q_linhvuc,q_level) VALUES ?";
    db.query(sql, [question], function(err, result) {
      if (err) {
        console.log(err);
        res.render('user/add-question', {
          message: 'Thêm câu hỏi lỗi !',
          fullname: req.session.fullname
        });
      } else {
        if (post.type == 2) {
          var answers = [];
          for (var i = 0; i < 4; i++) {
            answers.push([result.insertId, post.ans[i], i == post.single_true]);
          }
          sql = "INSERT INTO answers(q_id,a_data,a_true) VALUES ?";
          db.query(sql, [answers], function(error, kq) {
            if (error) {
              console.log(error);
              res.render('user/add-question', {
                message: 'Thêm câu trả lời lỗi !',
                fullname: req.session.fullname
              });
            } else {
              res.render('user/add-question', {
                message: 'Đã lưu câu hỏi !',
                fullname: req.session.fullname
              });
            }
          })
        } else if (post.type == 1) {
          sql = "INSERT INTO answers(q_id,a_data,a_true) VALUES ?";
          var ans = [
            [result.insertId, post.true_ques, post.true_ques]
          ];
          db.query(sql, [ans], function(error, kq) {
            if (error) {
              console.log(error);
              res.render('user/add-question', {
                message: 'Thêm câu trả lờ lỗi !',
                fullname: req.session.fullname
              });
            } else {
              res.render('user/add-question', {
                message: 'Đã lưu câu hỏi !',
                fullname: req.session.fullname
              });
            }
          })
        } else if (post.type == 3) {
          var answers = [];
          for (var i = 0; i < post.ans.length; i++) {
            if(post.ans[i] == '') break;
            answers.push([result.insertId, post.ans[i], post.mul_true.indexOf(i.toString()) > -1]);
          }
          sql = "INSERT INTO answers(q_id,a_data,a_true) VALUES ?";
          db.query(sql, [answers], function(error, kq) {
            if (error) {
              console.log(error);
              res.render('user/add-question', {
                message: 'Thêm câu trả lời lỗi !',
                fullname: req.session.fullname
              });
            } else {
              res.render('user/add-question', {
                message: 'Đã lưu câu hỏi !',
                fullname: req.session.fullname
              });
            }
          })
        }
      }
    })
  };
});

module.exports = router;
