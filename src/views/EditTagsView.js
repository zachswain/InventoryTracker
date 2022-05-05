var m = require("mithril");
const BottomNavBar = require("./components/BottomNavBar");
var ModalModel = require("../models/ModalModel");
var ModalComponent = require("./components/ModalComponent");
var TagDefinitionModel = require("../models/TagDefinitionModel");
var EditTagsViewModel = require("../models/EditTagsViewModel");

var EditTagsView = {
    oninit : function(vnode) {
        ModalModel.show = true;
        ModalModel.message = "Loading...";
        ModalModel.spinner = true;
        ModalModel.closable = false;
        
        TagDefinitionModel.loadAll().then(function(results) {
            ModalModel.show = false;
            if( results && results.status && results.status=="success" ) {
                EditTagsViewModel.tagDefinitions = results.results;
            }
        })
    },
    
    view : function(vnode) {
        return [
            m("div", { class : "d-grid gap-2 p-2" }, [
                m("h3", { }, [ "Tags Editor"]),
                EditTagsViewModel.tagDefinitions==null
                    ? m("div", {}, [
                        "Loading..."
                    ])
                    : EditTagsViewModel.tagDefinitions.length==0
                        ? m("div", {}, [
                            "No tags defined"
                        ])
                        : m("ul", { class : "list-group list-group-flush" }, [
                            EditTagsViewModel.tagDefinitions.map(function(tagDefinition, index) {
                                return m("li", { class : "list-group-item" }, [
                                    m("form", { class : "form" }, [
                                        m("div", { class : "row" }, [
                                            m("div", { class : "col-auto" }, [
                                                m("div", { class : "form-check form-switch mt-2 mb-0" }, [
                                                    m("input" + (tagDefinition.active ? "[checked=checked]" : ""), { class : "form-check-input", "type" : "checkbox", "oninput" : function(e) {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        tagDefinition.active = (e.target.checked == true)
                                                        
                                                        clearTimeout(tagDefinition.timeout);
                                                        tagDefinition.timeout = setTimeout(function() {
                                                            TagDefinitionModel.save(tagDefinition);
                                                        }, 500);
                                                    } })
                                                ]),
                                            ]),
                                            m("div", { class : "col" }, [
                                                m("input", { class : "form-control", "type" : "text", "placeholder" : "Label", "value" : tagDefinition.label, "oninput" : function(e) {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    e.redraw = false;
                                                    tagDefinition.label = e.target.value;
                                                    
                                                    clearTimeout(tagDefinition.timeout);
                                                    tagDefinition.timeout = setTimeout(function() {
                                                        TagDefinitionModel.save(tagDefinition);
                                                    }, 500);
                                                } }, []),
                                            ]),
                                            m("div", { class : "col" }, [
                                                m("select", { class : "form-select", "oninput" : function(e) {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    e.redraw = false;
                                                    tagDefinition.type = e.target.value;
                                                    
                                                    clearTimeout(tagDefinition.timeout);
                                                    tagDefinition.timeout = setTimeout(function() {
                                                        TagDefinitionModel.save(tagDefinition);
                                                    }, 500);
                                                } }, [
                                                    m("option" + (tagDefinition.type=="Text" ? "[selected]" : ""), { "value" : "Text" }, [ "Text" ]),
                                                    m("option" + (tagDefinition.type=="Number" ? "[selected]" : ""), { "value" : "Number" }, [ "Number" ]),
                                                    m("option" + (tagDefinition.type=="Date" ? "[selected]" : ""), { "value" : "Date" }, [ "Date" ]),
                                                ])
                                            ]),
                                            m("div", { class : "col-auto" }, [
                                                m("button", { class : "btn btn-link" }, [
                                                    m("i", { class : "bi bi-x-circle", "onclick" : function(e) {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        TagDefinitionModel.delete(tagDefinition).then(function(results) {
                                                            if( results && results.status == "success" ) {
                                                                EditTagsViewModel.remove(index);
                                                            }
                                                        })
                                                    } }, [])
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            })
                        ]),
                m("button", { class : "btn btn-success", "onclick" : function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    
                    EditTagsViewModel.addNewTagDefinition();
                } }, [
                    "Add"
                ])
            ]),
            m(BottomNavBar),
            ModalModel.show ? m(ModalComponent) : []
        ]
    }
};

module.exports = EditTagsView;