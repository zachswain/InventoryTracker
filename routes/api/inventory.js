const express = require("express");
const inventoryRouter = express.Router();
const sharp = require("sharp");
const Database = require("../../db");
const Item = require("../../models/Item");
const bodyParser = require("body-parser");
const {OAuth2Client} = require('google-auth-library');
const keys = require("../../config/keys.json");
const User = require("../../models/User");


inventoryRouter.post("/", bodyParser.json(), async function(req, res) {
    console.log("/api/inventory/GetInventory route");
    
    // var imgData = await sharp("./images/sample.jpg").resize({ width : 64, height : 64 }).toBuffer();
    
    var items = await Item.findAll();
    
    res.json({ "status" : "success", "results" : items, "user" : req.user })
});

module.exports = inventoryRouter;