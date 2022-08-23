var m = require("mithril");
var BottomNavBar = require("./components/BottomNavBar");
var ModalModel = require("../models/ModalModel");
var ModalComponent = require("./components/ModalComponent");

var ReportsView = {
    oninit : function(vnode) {
        
    },
    
    view : function(vnode) {
        console.log("Reports view");
        
        return m("div", {}, [
            m("p", {}, "TBD"),
            m(BottomNavBar),
            ModalModel.show ? m(ModalComponent) : []
        ]);
    }
}

module.exports = ReportsView;