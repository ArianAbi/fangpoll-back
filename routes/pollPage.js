var express = require('express')
var router = express.Router();
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = 'https://jmbscrklvgpkrnduzroz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post('/', (async (req, res) => {

    const poll_id = req.body.data.poll_id;

    let selectedPoll;

    try {
        selectedPoll = await supabase
            .from("polls")
            .select("*")
            .eq("id", poll_id);
    }
    catch (err) {
        console.log(err);
        res.statusCode(400).send("something went wrong");
    }

    console.log(selectedPoll.data);
    res.json(selectedPoll.data);
}))


module.exports = router