var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');
var jwt = require('jsonwebtoken');
const { json } = require('express/lib/response');


/* GET home page. */
router.post('/', (async (req, res) => {

    res.send("authenticated Welcome to PollsList")

}))

module.exports = router;
