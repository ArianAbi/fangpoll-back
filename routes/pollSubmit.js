var express = require("express")
var router = express.Router()
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = 'https://jmbscrklvgpkrnduzroz.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)


router.post('/', (async (req, res) => {

    const { poll_id, userName, chosenOption } = req.body.data;

    const data = await supabase
        .from("participanceChoise")
        .insert([{ poll_id: poll_id, user_name: userName, user_choise: chosenOption }])

    res.send("poll submited")

}))



module.exports = router;