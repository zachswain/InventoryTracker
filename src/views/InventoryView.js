var m = require("mithril");
var InventoryFilterComponent = require("./components/InventoryFilterComponent");
var InventoryListComponent = require("./components/InventoryListComponent");
var InventoryModel = require("../models/InventoryModel");
var BottomNavBar = require("./components/BottomNavBar");
var AddNewInventoryItemComponent = require("./components/AddNewInventoryItemComponent");

var InventoryView = {
    oninit : function(vnode) {
        InventoryModel.fetch();    
    },
    
    view : function(vnode) {
        return m("div", { class : "container-fluid mt-3"}, [
            m(InventoryFilterComponent),
            m(InventoryListComponent),
            m(BottomNavBar)
        ]);
    }
};

module.exports = InventoryView;