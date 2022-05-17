const express = require("express");
const inventoryRouter = express.Router();
const sharp = require("sharp");
const Database = require("../../db");
const Item = require("../../models/Item");
const bodyParser = require("body-parser");
const {OAuth2Client} = require('google-auth-library');


async function verify(token) {
    const client = new OAuth2Client("471936584888-vocp9gvfm095o50iuoere0rhhj9v8fgo.apps.googleusercontent.com");
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "471936584888-vocp9gvfm095o50iuoere0rhhj9v8fgo.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    console.log(payload);
}

inventoryRouter.all("/GetInventory", bodyParser.json(), async function(req, res) {
    console.log("/api/inventory/GetInventory route");
    
    var token = req.body.token;
    verify(token);
    
    // var imgData = await sharp("./images/sample.jpg").resize({ width : 64, height : 64 }).toBuffer();
    
    var items = await Item.findAll();
    
    res.json({ "status" : "success", "results" : { "inventory" : items } })
});

module.exports = inventoryRouter;