var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');
require('dotenv').config()
var jwt = require('jsonwebtoken');
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post("/:username&:password", (async (req, res) => {

  let data;
  let USER;

  try {
    console.log("we are here");
    data = await supabase
      .from('users')
      .select('*')
      .eq('username', `${req.params.username}`)
      .eq('password', `${req.params.password}`)

    if (data.length && data.length === 0) {
      res.status(401).send("wrong credentials")
      return;
    }
    data.data.forEach(_user => {
      USER = _user
    })
    console.log("we come far");

    const accessToken = jwt.sign(JSON.stringify(USER), process.env.ACCESS_TOKEN_SECRET)

    res.json({ accessToken: accessToken, user: JSON.stringify(USER) })
  }
  catch (err) {
    console.log(err);
    if (data.error === null) {
      res.status(401).send("wrong credentials")
    }
    else {
      res.status(500).send("some thing went wrong please try later")
    }
  }


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
