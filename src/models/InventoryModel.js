var m = require("mithril");
var AuthenticationModel = require("../models/AuthenticationModel");

var InventoryModel = {
    inventory : null,
    error : null,
    
    fetch : function() {
        var data = {
        };
        
        console.log("InventoryModel fetch");
        
        return m.request({
            method : "POST",
            body : data,
            url : "/api/Inventory?token=" + AuthenticationModel.token
        }).then(function(results) {
            console.log("InventoryModel data fetched");
            console.log(results);
            if( results.status=="success" ) {
                InventoryModel.inventory = results.results;
                InventoryModel.error = null;
                
                console.log(InventoryModel.inventory);
            } else if( results.status=="unauthorized") {
                AuthenticationModel.unauthorizedAccess();
            } else {
                InventoryModel.inventory = null;
                InventoryModel.error = results.message;
            }
        })
    }
}

module.exports = InventoryModel;