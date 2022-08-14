var express = require("express");
var router = express.Router()
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.delete("/:id", async (req, res) => {

    console.log(req.params.id);

    res.send("deleting")

})

module.exports = router