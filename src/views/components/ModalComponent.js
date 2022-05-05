var m = require("mithril");
var ModalModel = require("../../models/ModalModel");

var ModalComponent = {
    view : function(vnode) {
        var message = ModalModel.message ? ModalModel.message : "Loading...";
        
        return [
            m("div", { class : "modal fade show d-block", "id" : "LoadingModalComponent", "tabindex" : -1, "role" : "dialog" }, [
                m("div", { class : "modal-dialog modal-sm", "role" : "dialog" }, [
                    m("div", { class : "modal-content" }, [
                        m("div", { class : "modal-body text-center" }, [
                            m("div", { class : "loader" }, [
                            ]),
                            m("div", { class : "loader-txt" }, [
                                m("p", {}, [
                                    message
                                ]),
                                ModalModel.spinner
                                    ? m("div", { class : "spinner-border", "role" : "status" }, [])
                                    : []
                            ])
                        ]),
                        ModalModel.closable
                            ? m("div", { class : "modal-footer" }, [
                                m("button[data-bs-dismiss=modal]", { class : "btn btn-secondary", "type" : "button", "onclick" : function(e) {
                                    ModalModel.show = false;
                                    m.redraw();
                                } }, [
                                    "Close"
                                ])
                            ])
                            : []
                    ])
                ])
            ]),
            m("div", { class : "modal-backdrop fade show" }, [])
        ]
    }
}

module.exports = ModalComponent;