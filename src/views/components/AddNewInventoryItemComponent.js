var m = require("mithril");
var InventoryItemModel = require("../../models/InventoryItemModel");

var AddNewInventoryItemComponent = {
    view : function(vnode) {
        return m(m.route.Link, { href : "/addNewItem" }, [
            m("button", { class : "btn btn-danger position-fixed rounded-circle add-new-inventory-btn", "onclick" : function(e) {
                console.log("Initializing new item");
                InventoryItemModel.newItem();
            } }, [
                m("i", { class : "bi bi-plus-lg text-light"})
            ])
        ]);
    }
};

module.exports = AddNewInventoryItemComponent;