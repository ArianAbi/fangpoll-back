var jwt = require('jsonwebtoken');

function authenticate(req, res, next) {

    const { accesstoken, user } = req.headers;

    if (accesstoken === undefined || user === undefined) {
        res.status(400).send("request does not contain valid data")
    }

    const userTrueToken = jwt.sign(JSON.parse(user), process.env.ACCESS_TOKEN_SECRET);

    if (userTrueToken === accesstoken) {
        console.log("user authorized");

        next();
    }
    else {
        res.status(401).send("authorization failed")
        console.log("auth failed");
    }

}

module.exports = authenticate;
