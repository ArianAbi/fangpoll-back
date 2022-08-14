var express = require("express");
var router = express.Router()
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.patch("/:id", async (req, res) => {

    const { title, description } = req.body.data

    try {
        const data = await supabase
            .from('polls')
            .update({ title: title, description: description })
            .eq('id', req.params.id)

        res.send("<Updated>")
    }
    catch (err) {
        res.status(401).send(err)
    }
})

module.exports = router