var express = require("express")
var router = express.Router()
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = 'https://jmbscrklvgpkrnduzroz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post('/', (async (req, res) => {

    const poll_id = req.body.data.poll_id.id;

    try {
        const participanceData = await supabase
            .from("participanceChoise")
            .select("*")
            .eq("poll_id", `${poll_id}`)
        const pollData = await supabase
            .from("polls")
            .select("*")
            .eq("id", `${poll_id}`)


        if (participanceData.data === null) {
            res.status(401).send("poll not found")
        }
        else {
            res.json({ participanceData: participanceData.body, pollData: pollData.body[0] })
        }
    } catch (err) {
        console.log(err);
    }

}))

module.exports = router;