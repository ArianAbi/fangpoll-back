var express = require("express")
var router = express.Router();
const createSupabaseClient = require("@supabase/supabase-js").createClient;

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

router.post('/', async (req, res) => {

    const { username, email, password, first_name, last_name } = req.body

    console.log(req.body);
    try {

        const { data: userExist, err } = await supabase
            .from('users')
            .select("username")
            .eq('username', username)

        if (userExist.length > 0) {
            res.status(409).send("this user Exist")
        }
        else {
            await supabase
                .from('users')
                .insert([
                    { "username": `${username}`, "password": `${password}`, "email": `${email}`, "first_name": `${first_name}`, "last_name": `${last_name}` }
                ])

            res.send("created")
        }

    } catch (err) {
        res.send(err)
    }

})

module.exports = router