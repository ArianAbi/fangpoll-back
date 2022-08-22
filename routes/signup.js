var express = require("express")
var router = express.Router();

router.get('/', (req, res) => {
    res.json({ username: "arian", password: "123" })
})

module.exports = router