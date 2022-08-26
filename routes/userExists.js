var express = require("express")
var router = express.Router();
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post('/:username', async (req, res) => {

    const { data: userExist, err } = await supabase
        .from('users')
        .select("username")
        .eq('username', req.params.username)

    if (userExist.length > 0) {
        res.send(true)
    }
    else {
        res.send(false)
    }
})

module.exports = router