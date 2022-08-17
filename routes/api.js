const express = require("express");
var inventoryRouter = require("./api/inventory");
var itemRouter = require("./api/item");
var tagRouter = require("./api/tag");
var suggestRouter = require("./api/suggest");
const {OAuth2Client} = require('google-auth-library');
const keys = require("../config/keys.json");
const User = require("../models/User");

var router = express.Router();

router.all("*", async function(req, res, next) {
    try
    {
        if( !req.query || !req.query.token ) {
            res.json({ "status" : "error", "message" : "Authentication token is a required parameter" });
            return;
        }
        
        var token = req.query.token;

        console.log("token=" + token);

        const client = new OAuth2Client(keys.web.client_id);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: keys.web.client_id,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        var email = payload.email;
        
        var user = await User.findOneByEmail(email);
        
        if( user!=null ) {
            req.user = user;
            next();
        } else {
            res.json({ "status" : "unauthorized", "message" : "You are not authorized to view this content." });
        }
    } catch( err ) {
        console.log(err);
        res.json({ "status" : "error", "message" : err });
    }
});

router.use("/inventory", inventoryRouter);
router.use("/item", itemRouter);
router.use("/tag", tagRouter);
router.use("/suggest", suggestRouter);

module.exports = router;