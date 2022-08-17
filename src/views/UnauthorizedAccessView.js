var m = require("mithril");

var UnauthorizedAccessView = {
    view : function(vnode) {
        return m("div", { class : "container-fluid" }, [
            m("h1", {}, [
                "Unauthorized Access"
            ]),
            m("div", {}, [
                "You are not authorized to access this page. Please contact contact@domain.com to request access."
            ])
        ]);
    }
}

module.exports = UnauthorizedAccessView;