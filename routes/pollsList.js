var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');
var jwt = require('jsonwebtoken');
const { json } = require('express/lib/response');

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
    } catch (err) {
        console.log("connection failed");
    }
})()


/* GET home page. */
router.post('/', (async (req, res) => {

    res.send("authenticated Welcome to PollsList")

}))

module.exports = router;
