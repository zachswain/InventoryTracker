var m = require("mithril");
var BottomNavBar = require("./components/BottomNavBar");
var ModalModel = require("../models/ModalModel");
var AuthenticationModel = require("../models/AuthenticationModel");
var ModalComponent = require("./components/ModalComponent");

var ConfigurationView = {
    oninit : function(vnode) {
        // if( !AuthenticationModel.isAuthenticated() ) {
        //     m.route.set("/login");
        // } else {
        // }
    },
    
    view : function(vnode) {
        console.log("Configuration view");
        
        return m("div", {}, [
            m("p", {}, "TBD"),
            m(BottomNavBar),
            ModalModel.show ? m(ModalComponent) : []
        ]);
    }
}

module.exports = ConfigurationView;