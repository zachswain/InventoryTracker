const express = require("express");
const itemRouter = express.Router();
const bodyParser = require("body-parser");
const Item = require("../../models/Item");
const Database = require("../../db");
const Tag = require("../../models/Tag");
const TagDefinition = require("../../models/TagDefinition");

itemRouter.put("/", bodyParser.json(), async function(req, res) {
    console.log("PUT /api/item/ route");
    
    try
    {
        var item = await Item.create({ 
            name : req.body.name, 
            description : req.body.description,
            acquired_price : req.body.acquired_price,
            acquired_dt : req.body.acquired_dt,
            sold : req.body.sold,
            sold_price : req.body.sold_price,
            sold_dt : req.body.sold_dt,
            donated : req.body.donated,
            donated_value : req.body.donated_value,
            donated_dt : req.body.donated_dt,
            disposed : req.body.disposed,
            disposed_dt : req.body.disposed_dt
        });
        
        if( item ) {
            var tags = req.body.tags;
            
            await tags.forEach(async function(tag, index) {
                var tagDefinition =  await TagDefinition.findOneById(tag.tagDefinition.id);
                tag.ItemId = item.id;
                tag.tagDefinitionId = tagDefinition.id;
                try
                {
                    await Tag.create(tag);
                }
                catch( err ) {
                    res.json({ status : "error", message : err });
                }
            });
            
            await item.reload();
            res.json({ "status" : "success", "item" : item });
        } else {
            res.json({ "status" : "fail", "message" : "Could not create item" })
        }
    } catch( err ) {
        console.log(err);
        res.json({ "status" : "error", "message" : err });
    }

});

itemRouter.post("/:id", bodyParser.json(), async function(req, res) {
   console.log("post /api/item/:id route");
   
   try
   {
       var id = req.params.id;
       
       var item = await Item.getByItemId(id);
       
       if( item ) {
          item.setDataValue("name", req.body.name);
          item.setDataValue("description", req.body.description);
          item.setDataValue("acquired_price", req.body.acquired_price);
          item.setDataValue("acquired_dt", req.body.acquired_dt);
          item.setDataValue("sold", req.body.sold);
          item.setDataValue("sold_price", req.body.sold_price);
          item.setDataValue("sold_dt", req.body.sold_dt);
          item.setDataValue("donated", req.body.donated);
          item.setDataValue("donated_value", req.body.donated_value);
          item.setDataValue("donated_dt", req.body.donated_dt);
          item.setDataValue("disposed", req.body.disposed);
          item.setDataValue("disposed_dt", req.body.disposed_dt);

            item.tags.forEach(function(tag) {
                console.log("deleting tag");
                console.log(tag);
                tag.destroy();
            });
            
            var tags = req.body.tags;
            
            await tags.forEach(async function(tag, index) {
                var tagDefinition =  await TagDefinition.findOneById(tag.tagDefinition.id);
                tag.ItemId = item.id;
                tag.tagDefinitionId = tagDefinition.id;
                try
                {
                    await Tag.create(tag);
                }
                catch( err ) {
                    res.json({ status : "error", message : err });
                }
            });
            
            await item.save({
                include : [{
                    model : Database.getModel(Tag.modelName),
                    as : "tags"
                },{
                    model : Database.getModel(TagDefinition.modelName),
                    as : "tagDefinition"
                }]
            });
            
            res.json({ "status" : "success", "item" : item });
        } else {
            res.json({ "status" : "fail", "message" : "Invalid item id or item not found.", "id" : id });
        }
    }
    catch( err ) {
        res.json({ "status" : "error", "message" : err.message });
    }
});

itemRouter.get("/:id", async function(req, res) {
    console.log("/api/item/:id route");

    var id = req.params.id;
    
    var item = await Item.getByItemId(id);
    
    if( item ) {
        res.json({ "status" : "success", "item" : item });
    } else {
        res.json({ "status" : "fail", "message" : "Invalid item id or item not found.", "id" : id });
    }
})

itemRouter.delete("/:id", async function(req, res) {
   console.log("DELETE /api/item/:id route");
   
   try {
       var id = req.params.id;
       var item = await Item.getByItemId(id);

        if( item ) {
            await item.destroy();
            res.json({ "status" : "success" });
        } else {
            res.json({ "status" : "fail", "message" : "Invalid item id or item not found.", "id" : id });
        }
   } catch( err ) {
        res.json({ "status" : "error", "message" : err.message });
    }
});

module.exports = itemRouter;