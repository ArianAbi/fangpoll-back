var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');
var jwt = require('jsonwebtoken');
const { json } = require('express/lib/response');
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

/* GET home page. */
router.post('/', (async (req, res) => {

    const { accesstoken, user } = req.headers;

    const userID = JSON.parse(JSON.parse(user)).id;
    let Polls;

    try {

        Polls = await supabase
            .from('polls')
            .select('*')
            .eq("user_id", `${userID}`)

        if (Polls.length && Polls.length === 0) {
            res.json([]);
            return;
        }

    }
    catch (err) {
        console.log(err);
    }

    res.json(Polls.body)

}))

module.exports = router;
