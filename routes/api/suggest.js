const express = require("express");
const suggestRouter = express.Router();
const Database = require("../../db");

suggestRouter.all("/:phrase?", async function(req, res) {
    console.log("GET /api/suggest/ route");
    
    res.json({ "status" : "success", "results" : [ "a", "b", "c" ]});
})

module.exports = suggestRouter;