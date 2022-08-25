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
    let list = [];

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

    // Polls.body.forEach(async (poll) => {
    //     const votes = await supabase
    //         .from('polls')
    // .select(`
    //     *,
    //     participanceChoise (
    //         poll_id
    //     )
    //   `)
    // .eq("id", poll.id)

    //     list = votes.body
    // });

    // console.log(list);

    (async () => {
        for (let i = 0; i < Polls.body.length; i++) {
            const vote = await supabase
                .from('polls')
                .select(`
                *,
                participanceChoise (
                    poll_id
                )
              `)
                .eq("id", Polls.body[i].id)

            list.push(vote.body)
        }
        res.json(list)
    })()



}))

module.exports = router;
