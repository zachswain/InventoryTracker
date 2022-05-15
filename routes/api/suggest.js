const express = require("express");
const suggestRouter = express.Router();
const Tag = require("../../models/Tag");
const TagDefinition = require("../../models/TagDefinition");
const Sequelize = require("sequelize");
const Database = require("../../db");

suggestRouter.all("/:phrase?", async function(req, res) {
    console.log("GET /api/suggest/ route");
    
    var phrase = req.params.phrase;
    
    try
    {
        var suggestions = [];
        
        var results = await Tag.findAll({
            attributes : [
                [Sequelize.fn('DISTINCT', Sequelize.col('value')), 'value'],
                ['tagDefinitionId', 'tagDefinitionId']
            ],
            where : {
                value : {
                    [Sequelize.Op.like] : `%${phrase}%`
                }
            },
            // include : { model : Database.getModel(TagDefinition.modelName), as : "tagDefinition" }
        });
        
        for( var i = 0 ; i< results.length ; i++ ) {
            var tagDefinition = await TagDefinition.findOneById(results[i].tagDefinitionId);
            if( tagDefinition ) {
                
                suggestions.push(tagDefinition.label + ":" + results[i].value);
                console.log(suggestions);
            } else {
                res.json({ "status" : "fail", "message" : "Failed to load tag definition (" + results[i].tagDefinitionId + ")" })
            }
        }
        
        res.json({ "status" : "success", "phrase" : phrase, "results" : suggestions });
    } catch( err ) {
        console.log(err);
        res.json({ "status" : "error", "message" : JSON.stringify(err) })
    }
})

module.exports = suggestRouter;