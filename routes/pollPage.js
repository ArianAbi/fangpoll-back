var express = require('express')
var router = express.Router();
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post('/', (async (req, res) => {

    const poll_id = req.body.data.poll_id;

    let selectedPoll;

    let pollCreator;

    try {
        selectedPoll = await supabase
            .from("polls")
            .select("*")
            .eq("id", poll_id);

        pollCreator = await supabase
            .from("users")
            .select("username")
            .eq("id", selectedPoll.data[0].user_id)
    }
    catch (err) {
        console.log(err);
        res.statusCode(400).send("something went wrong");
    }

    selectedPoll.data[0].creatorUsername = pollCreator.data[0].username

    console.log(selectedPoll.data);
    res.json(selectedPoll.data);
}))


module.exports = router