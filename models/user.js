module.exports.getDetailUser = function (id, callback) {
  var sql = "SELECT u_email,u_firstName,u_lastName,u_description from users WHERE u_id = " + id;
  db.query(sql, function(err, result) {
    if (err) {
      console.log(err ) + sql;
      callback(err, null);
      throw err;
    }
    else callback(null, result);
  })
}

module.exports.getListQuestion = function getListQuestion(id, callback) {
  var sql = "SELECT * from questions WHERE u_id = " + id;
  db.query(sql, function(err, result) {
    if (err) {
      console.log(err ) + sql;
      callback(err, null);
      throw err;
    }
    else callback(null, result);
  })
}

module.exports.getListTest = function getListTest(id, callback) {
  var sql = "SELECT * from tests WHERE u_id = " + id;
  db.query(sql, function(err, result) {
    if (err) {
      console.log(err ) + sql;
      callback(err, null);
      throw err;
    }
    else callback(null, result);
  })
}
