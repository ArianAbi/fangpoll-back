var jwt = require('jsonwebtoken');

function authenticate(req, res, next) {

    const reqData = { ...req.body.data };

    if (reqData.accessToken === undefined || reqData.user === undefined) {
        res.status(400).send("request does not contain valid data")
    }

    const userAccessToken = reqData.accessToken;
    const user = JSON.parse(reqData.user);

    const userTrueToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    if (userTrueToken === userAccessToken) {
        console.log("user authorized");
        next();
    }
    else {
        res.status(401).send("authorization failed")
        console.log("auth failed");
    }

}

module.exports = authenticate;
