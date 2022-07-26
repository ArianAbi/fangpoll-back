var express = require("express")
var router = express.Router()
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)


router.post('/', (async (req, res) => {

    const { poll_id, userName, chosenOption } = req.body.data;

    try {
        const data = await supabase
            .from("participanceChoise")
            .insert([{ poll_id: poll_id, user_name: userName, user_choise: chosenOption }])

        res.send("poll submited")
    } catch (err) {
        res.status(402).send(err)
    }

}))



module.exports = router;