const express = require("express");
const inventoryRouter = express.Router();
const sharp = require("sharp");
const Database = require("../../db");
const Item = require("../../models/Item");

inventoryRouter.all("/GetInventory", async function(req, res) {
    console.log("/api/inventory/GetInventory route");
    
    var imgData = await sharp("./images/sample.jpg").resize({ width : 64, height : 64 }).toBuffer();
    
    var items = await Item.findAll();
    
    console.log(items);
    /*
    var inventory = [
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Pirate puzzle",
            acquired_price : 2,
            acquired_dt : "2022-01-02T00:00:00",
            sold_price : 11,
            sold_dt : "2022-03-01T00:00:00",
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
        {
            name : "Beanie Baby",
            acquired_price : 5.00,
            acquired_dt : "2022-01-01T00:00:00",
            sold_price : 10,
            sold_dt : "2022-02-01T00:00:00",
            tags : [ "Beanie Baby", "Stuffed Animal" ],
            thumbnail : imgData.toString("base64")
        },
    ]
    res.json({ "status" : "success", "results" : { "inventory" : inventory } })
    */
    
    res.json({ "status" : "success", "results" : { "inventory" : items } })
});

module.exports = inventoryRouter;