var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', (async (req, res) => {
  res.send("HERE")
}))

module.exports = router;
