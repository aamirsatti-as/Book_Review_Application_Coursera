//Link of Github Repository

const jwt = require('jsonwebtoken');
const session = require('express-session')
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const normal_endpoints = require('./endpoints/endpoints')
const valid_endpoints = require('./endpoints/endpointforUnautorizedUser')
app.use(express.json());

app.use("/", normal_endpoints)
app.use("/valid/", function (req, res, next) {
    if (req.session.authorization) {
        jwtToken = req.session.authorization['accessToken'];
        jwt.verify(jwtToken, "IAmGeneratingTokenToAuthticateCredintialBelongToUser", (err, user) => {
            if (!err) {
                req.user = user;
                next();
            }
            else {
                return res.status(403).json({ message: "Authentication Failed, Try Again" })
            }
        });
    } else {
        return res.status(403).json({ message: "User needs To Login First" })
    }
});

const PORT = process.env.PORT || 5000;
app.use("/valid", valid_endpoints);


app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));

