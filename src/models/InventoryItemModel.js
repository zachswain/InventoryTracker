var m = require("mithril");
var moment = require("moment");
var AuthenticationModel = require("./AuthenticationModel");

var InventoryItemModel = {
    name : null,
    description : null,
    acquired_price : null,
    acquired_dt : null,
    listed : false,
    pending : false,
    sold : false,
    donated : false,
    disposed : false,
    photos : null,
    tags : null,
    
    newItem : function() {
        InventoryItemModel.id = null;
        InventoryItemModel.name = null;
        InventoryItemModel.description = null;
        InventoryItemModel.acquired_price = null;
        InventoryItemModel.acquired_dt = null;
        
        InventoryItemModel.listed = false;
        InventoryItemModel.pending = false;
        InventoryItemModel.pending_notes = null;
        InventoryItemModel.sold = false;
        InventoryItemModel.sold_price = null;
        InventoryItemModel.sold_dt = null;
        InventoryItemModel.donated = false;
        InventoryItemModel.donated_value = null;
        InventoryItemModel.donated_dt = null;
        InventoryItemModel.disposed = false;
        InventoryItemModel.disposed_dt = null;
        
        InventoryItemModel.photos = [];
        
        InventoryItemModel.tags = [];
    },
    
    load : function(id) {
        return m.request({
            method : "GET",
            url : "/api/item/" + id + "?token=" + AuthenticationModel.token,
        }).then(function(results) {
            if( results && results.status=="success" ) {
                InventoryItemModel.id = results.item.id;
                InventoryItemModel.name = results.item.name;
                InventoryItemModel.description = results.item.description;
                InventoryItemModel.acquired_price = results.item.acquired_price;
                InventoryItemModel.acquired_dt = moment(results.item.acquired_dt).format("L");
                
                InventoryItemModel.listed = results.item.listed;
                InventoryItemModel.pending = results.item.pending;
                InventoryItemModel.pending_notes = results.item.pending_notes;
                InventoryItemModel.sold = results.item.sold;
                InventoryItemModel.sold_price = results.item.sold_price;
                InventoryItemModel.sold_dt = moment(results.item.sold_dt).format("L");
                InventoryItemModel.donated = results.item.donated;
                InventoryItemModel.donated_value = results.item.donated_value;
                InventoryItemModel.donated_dt = moment(results.item.donated_dt).format("L");
                InventoryItemModel.disposed = results.item.disposed;
                InventoryItemModel.disposed_dt = moment(results.item.disposed_dt).format("L");
                
                InventoryItemModel.tags = results.item.tags;
            } else {
                InventoryItemModel.newItem();
            }
            return results;
        })
    },
    
    save : function() {
        if( InventoryItemModel.id == null ) {
            return m.request({
                method : "PUT",
                url : "/api/item/?token=" + AuthenticationModel.token,
                contentType : "application/json",
                body : {
                    name : InventoryItemModel.name,
                    description : InventoryItemModel.description,
                    acquired_price : InventoryItemModel.acquired_price,
                    acquired_dt : moment(InventoryItemModel.acquired_dt),
                    
                    listed : InventoryItemModel.listed,
                    pending : InventoryItemModel.pending,
                    pending_notes : InventoryItemModel.pending_notes,
                    sold : InventoryItemModel.sold,
                    sold_price : InventoryItemModel.sold_price,
                    sold_dt : InventoryItemModel.sold_dt,
                    donated : InventoryItemModel.donated,
                    donated_value : InventoryItemModel.donated_value,
                    donated_dt : InventoryItemModel.donated_dt,
                    disposed : InventoryItemModel.disposed,
                    disposed_dt  :InventoryItemModel.disposed_dt,
                    
                    tags : InventoryItemModel.tags
                },
            });
        } else {
            return m.request({
                method : "POST",
                url : "/api/item/" + InventoryItemModel.id + "?token=" + AuthenticationModel.token,
                contentType : "application/json",
                body : {
                    name : InventoryItemModel.name,
                    description : InventoryItemModel.description,
                    acquired_price : InventoryItemModel.acquired_price,
                    acquired_dt : InventoryItemModel.acquired_dt,
                    listed : InventoryItemModel.listed,
                    pending : InventoryItemModel.pending,
                    pending_notes : InventoryItemModel.pending_notes,
                    sold : InventoryItemModel.sold,
                    sold_price : InventoryItemModel.sold_price,
                    sold_dt : InventoryItemModel.sold_dt,
                    donated : InventoryItemModel.donated,
                    donated_value : InventoryItemModel.donated_value,
                    donated_dt : InventoryItemModel.donated_dt,
                    disposed : InventoryItemModel.disposed,
                    disposed_dt  :InventoryItemModel.disposed_dt,
                    
                    tags : InventoryItemModel.tags
                },
            });
        }
    },
    
    delete : function() {
        return m.request({
            method : "DELETE",
            url : "/api/item/" + InventoryItemModel.id + "?token=" + AuthenticationModel.token
        }).then(function(result) {
            InventoryItemModel.newItem()
            return result;
        })
    },
    
    getTagByTagDefinitionId : function(id) {
        for( var i=0 ; i<InventoryItemModel.tags.length ; i++ ) {
            if( InventoryItemModel.tags[i].tagDefinition && InventoryItemModel.tags[i].tagDefinition.id == id ) {
                return InventoryItemModel.tags[i];
            }
        }
        
        return null;
    },
    
    addTag : function(tag) {
        InventoryItemModel.tags.push(tag);
    },
    
    deleteTag : function(tag) {
        return m.request({
            method : "DELETE",
            url : "/api/item/" + InventoryItemModel.id + "/tag/" + tag.id + "?token=" + AuthenticationModel.token
        }).then(function(result) {
            console.log(result);
        }).catch(function(e) {
            console.log(e);
        })
    },
};

module.exports = InventoryItemModel;