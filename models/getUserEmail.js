const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "yourUsername",
  password: "yourPassword",
  database: "yourDatabase",
});

connection.connect();

const getUserEmail = (userId, callback) => {
  const query = "SELECT email FROM user WHERE id = ?";
  connection.query(query, [userId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length > 0) {
      return callback(null, results[0].email);
    } else {
      return callback(new Error("User not found"), null);
    }
  });
};

module.exports = getUserEmail;
