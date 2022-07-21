var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

const db_pool = mysql.createPool({
  host: 'localhost',
  user: 'arian',
  database: 'finalp',
  password: 'th3dcabi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
(async () => {
  try {
    const con = await db_pool.getConnection()
    console.log("connected");
  } catch (err) {
    console.log("connection failed");
  }
})()

router.get("/", (async (req, res) => {

  let users;

  try {
    users = await db_pool.query(
      "select * from users"
    )
  }
  catch (err) {
    res.send(err)
  }

  users[0].forEach(user => {
    console.log(user.username);
  })

}))

module.exports = router;
