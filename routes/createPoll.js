var express = require('express');
var router = express.Router();
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post("/", (async (req, res) => {

    const user = JSON.parse(JSON.parse(req.body.data.user))


    let data;
    try {
        data = await supabase
            .from('polls')
            .insert([{
                user_id: `${user.id}`,
                title: `${req.body.data.title}`,
                description: `${req.body.data.description}`,
                options: req.body.data.options
            }])


    } catch (err) {
        console.log(err);
    }

    res.json(data)

}))

module.exports = router;
