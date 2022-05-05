const express = require("express");
const tagRouter = express.Router();
const bodyParser = require("body-parser");
const Tag = require("../../models/Tag");
const TagDefinition = require("../../models/TagDefinition");

tagRouter.get("/", bodyParser.json(), async function(req, res) {
    var tags = await Tag.findAll();
    
    if( tags ) {
        res.json({ "status" : "success", "results" : tags });
    } else {
        res.json({ "status" : "fail" });
    }
});

tagRouter.put("/definition", bodyParser.json(), async function(req, res) {
    try
    {
        var tagDefinition = await TagDefinition.create();
        
        if( tagDefinition ) {
            res.json({ "status" : "success", "result" : tagDefinition })
        } else {
            res.json({ "status" : "fail" });
        }
    } catch( err ) {
        res.json({ "status" : "error", "message" : err });
    }
});

tagRouter.post("/definition/:id", bodyParser.json(), async function(req, res) {
    console.log("/api/tag/definition/:id route");
    
    try
    {
        var id = req.params.id;
        console.log("Saving " + id);
        var tagDefinition = await TagDefinition.findOneById(id);
        
        console.log(tagDefinition);

        if( tagDefinition ) {
            tagDefinition.label = req.body.label;
            tagDefinition.active = req.body.active;
            tagDefinition.type = req.body.type;

            

            if( tagDefinition.save() ) {
                res.json({ "status" : "success", "result" : tagDefinition })
            } else {
                res.json({ "status" : "fail" });
            }
        } else {
            res.json({ "status" : "fail" });
        }
    } catch( err ) {
        res.json({ "status" : "error", "message" : err });
    }
});

tagRouter.delete("/definition/:id", bodyParser.json(), async function(req, res) {
    console.log("DELETE /api/tag/definition/:id route");
    
    try
    {
        var id = req.params.id;
        console.log("Deleting " + id);
        var tagDefinition = await TagDefinition.findOneById(id);
        
        console.log(tagDefinition);

        if( tagDefinition ) {
            if( tagDefinition.destroy() ) {
                res.json({ "status" : "success", "result" : tagDefinition })
            } else {
                res.json({ "status" : "fail" });
            }
        } else {
            res.json({ "status" : "fail" });
        }
    } catch( err ) {
        res.json({ "status" : "error", "message" : err });
    }
});

tagRouter.get("/definitions", bodyParser.json(), async function(req, res) {
    var tagDefinitions = await TagDefinition.findAll();
    
    if( tagDefinitions ) {
        res.json({ "status" : "success", "results" : tagDefinitions });
    } else {
        res.json({ "status" : "fail" })
    }
})

module.exports = tagRouter;