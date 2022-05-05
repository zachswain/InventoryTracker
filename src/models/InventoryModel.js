var m = require("mithril");

var InventoryModel = {
    inventory : null,
    error : null,
    
    fetch : function() {
        var data = {};
        
        console.log("InventoryModel fetch");
        
        return m.request({
            method : "POST",
            body : data,
            url : "/api/Inventory/GetInventory"
        }).then(function(results) {
            console.log("InventoryModel data fetched");
            console.log(results);
            if( results.status=="success" ) {
                InventoryModel.inventory = results.results.inventory;
                InventoryModel.error = null;
                
                console.log(InventoryModel.inventory);
            } else {
                InventoryModel.inventory = null;
                InventoryModel.error = results.message;
            }
        })
    }
}

module.exports = InventoryModel;