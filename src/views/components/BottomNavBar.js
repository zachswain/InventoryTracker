var m = require("mithril");

var BottomNavBar = {
    view : function(vnode) {
        return m("nav", { class : "navbar fixed-bottom navbar-expand-sm navbar-light bottom-navbar" }, [
            m("div", { class : "container-fluid" }, [
                m("div", { class : "row" }, [
                    m("div", { class : "col" }, [
                        m(m.route.Link, { href : "/" }, [
                            m("i", { class : "bi bi-house" }, [])
                        ])
                    ]),
                    m("div", { class : "col" }, [
                        m(m.route.Link, { href : "/editTags" }, [
                            m("i", { class : "bi bi-tags" }, [])
                        ])
                    ])
                ])
            ])
        ])
    }
};

module.exports = BottomNavBar;