var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');
require('dotenv').config()
var jwt = require('jsonwebtoken');
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = 'https://jmbscrklvgpkrnduzroz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post("/:username&:password", (async (req, res) => {

  let USER;

  try {
    const { data: users } = await supabase
      .from('users')
      .select('*')
      .eq('username', `${req.params.username}`)
      .eq('password', `${req.params.password}`)


    if (users.length && users.length === 0) {
      res.status(404).send("wrong credentials")
      return;
    }

    users.forEach(_user => {
      USER = _user
    })
  }
  catch (err) {
    console.log(err);
  }

  const accessToken = jwt.sign(JSON.stringify(USER), process.env.ACCESS_TOKEN_SECRET)

  res.json({ accessToken: accessToken, user: JSON.stringify(USER) })

}))

/*
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
    console.log("database connected");
  } catch (err) {
    console.log("database connection failed");
  }
})()


router.post("/:username&:password", (async (req, res) => {

  let USER;

  try {
    const fetchedUser = await db_pool.query(
      `select * from users where username = "${req.params.username}" and password = "${req.params.password}"`
    )

    if (fetchedUser[0].length === 0) {
      res.status(404).send("wrong credentials")
      return;
    }

    fetchedUser[0].forEach(_user => {
      USER = _user
    })
  }
  catch (err) {
    console.log(err);
  }

  const accessToken = jwt.sign(JSON.stringify(USER), process.env.ACCESS_TOKEN_SECRET)

  res.json({ accessToken: accessToken, user: JSON.stringify(USER) })

}))

*/

module.exports = router;
