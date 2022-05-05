var m = require("mithril");
var InventoryModel = require("../../models/InventoryModel");
var AddNewInventoryItemComponent = require("./AddNewInventoryItemComponent");
var InventoryFilterModel = require("../../models/InventoryFilterModel");
var moment = require("moment");

var InventoryListComponent = {
    view : function(vnode) {
        return m("div", { class : "row pt-3" }, [
            InventoryModel.inventory==null
            // Hasn't been loaded yet, display loading message
            ? m("div", { class : "col" }, [
                "Loading..."
            ] )
            : m("div", { class : "col position-relative" }, [
                m("div", { class : "mt-4 list-group list-group-flush"}, [
                    InventoryModel.inventory.map(function(item) {
                        if( InventoryFilterModel.filterText && InventoryFilterModel.filterText != "" ) {
                            if( (item.name && !item.name.toLowerCase().match(InventoryFilterModel.filterText.toLowerCase()))  && (item.description && !item.description.toLowerCase().match(InventoryFilterModel.filterText.toLowerCase())) ) {
                                return [];
                            }
                        }
                        return m("a", { class : "list-group-item list-group-item-action ", "href" : "#", "itemID" : item.id, "onclick" : function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("selected");
                            console.log(item.id);
                            m.route.set("/editItem/:itemID", { itemID : item.id });
                        } }, [
                            m("div", { class : "row" }, [
                                m("div", { class : "col-3" }, [
                                    m("div", { class : "thumbnail position-relative bg-light", "style" : "width: 64px; height: 64px"}, [
                                        item.thumbnail 
                                            ? m("img", { "src" : "data:image/jpg ;base64, " + item.thumbnail }, [])
                                            : m("i", { "class" : "fs-1 position-absolute top-50 start-50 translate-middle bi bi-question-circle" }, [])
                                    ]),
                                ]),
                                m("div", { class : "col-9" }, [
                                    m("div", { class : ""}, [
                                        m("div", { class : "d-flex w-100 justify-content-between"}, [
                                            m("h5", { class : "mb-1 text-truncate" }, [
                                                item.name
                                            ]),
                                            m("small", { }, [
                                                moment(item.createdAt).fromNow()
                                            ])
                                        ]),
                                        m("p", { class : "mb-1 text-truncate" }, [
                                            item.description
                                        ]),
                                        m("small", { class : "text-truncate" }, [
                                            "Some smaller text"
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    })
                ]),
                m(AddNewInventoryItemComponent)
            ])
        ]);
    }
}

module.exports = InventoryListComponent;