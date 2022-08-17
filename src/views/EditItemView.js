var m = require("mithril");
var BottomNavBar = require("./components/BottomNavBar");
var PhotosModel = require("../models/PhotosModel");
var InventoryItemModel = require("../models/InventoryItemModel");
var ModalComponent = require("./components/ModalComponent");
var ModalModel = require("../models/ModalModel");
var moment = require("moment");
var TagDefinitionModel = require("../models/TagDefinitionModel");
var EditItemViewModel = require("../models/EditItemViewModel");
var AuthenticationModel = require("../models/AuthenticationModel");

var EditItemView = {
    oninit : function(vnode) {
        EditItemViewModel.initialized = false;
        
        console.log("EditItemView oninit");
        console.log(vnode.attrs);
        

        
        if( !AuthenticationModel.isAuthenticated() ) {
            m.route.set("/login");
        } else {
            var promises = [];  
            EditItemViewModel.error = null;
            
            promises.push(new Promise(function(resolve, reject) {
                console.log("Getting TagDefinitions");
                TagDefinitionModel.loadAll().then(function(results) {
                    if( results && results.status && results.status=="success" ) {
                        EditItemViewModel.error = EditItemViewModel.error ? EditItemViewModel.error : null;
                        EditItemViewModel.tagDefinitions = results.results;
                        console.log("Tag definitions loaded");
                        console.log(EditItemViewModel.tagDefinitions);
                        resolve();
                    } else if( results && results.status && results.status == "unauthorized" ) {
                        AuthenticationModel.unauthorizedAccess();
                        EditItemViewModel.error = results.message;
                        reject();
                    } else {
                        EditItemViewModel.error = results.message;
                        reject();
                    }
                })    
            }));
            
            if( vnode && vnode.attrs && vnode.attrs.itemID ) {
                promises.push(new Promise(function(resolve, reject) {
                    console.log("Getting Item");
                    InventoryItemModel.load(vnode.attrs.itemID).then(function(results) {
                        if( results && results.status == "unauthorized" ) {
                            AuthenticationModel.unauthorizedAccess();
                            EditItemViewModel.error = results.message;
                            reject();
                        } else if( results && results.status == "error" ) {
                            EditItemViewModel.error = results.message;
                            reject();
                        } else {
                            EditItemViewModel.error = EditItemViewModel.error ? EditItemViewModel.error : null;
                            resolve();
                        }
                    }).catch(function(err) {
                        console.log(err);
                        reject();
                    })
                    
                }))
            }
            
            Promise.all(promises).then(function() {
                console.log("All promises resolved");
                EditItemViewModel.initialized = true;
                m.redraw();
            });
        }
    },
    
    view : function(vnode) {
        console.log("EditItemView view");
        
        return m("div", { class : "container-fluid mb-5" }, [
            EditItemViewModel.error != null
                ? m("div", {}, [ EditItemViewModel.error ])
                : !EditItemViewModel.initialized 
                    ? m("div", {}, [ "Loading..." ])
                    : m("form", { class : "needs-validation" }, [
                        m("div", { class : "form-group" }, [
                            m("label", { "for" : "itemNameInput" }, [
                                "Name"
                            ]),
                            m("input", { class : "form-control", "id" : "itemNameInput", "placeholder" : "Item name", "value" : InventoryItemModel.name, "oninput" : function(e) {
                                InventoryItemModel.name = e.target.value;
                            } }, [ ]),
                            m("div", { class : "invalid-feedback" }, [ "Item name is required"])
                        ]),
                        m("div", { class : "form-group pt-3" }, [
                            m("label", { "for" : "itemDescriptionInput" }, [
                                "Description"
                            ]),
                            m("input", { class : "form-control", "id" : "itemDescriptionInput", "placeholder" : "Item description", "value" : InventoryItemModel.description, "oninput" : function(e) {
                                InventoryItemModel.description = e.target.value;
                            } }, [ ])
                        ]),
                        m("div", { class : "form-group pt-3" }, [
                            m("label", { "for" : "itemAcquiredDtInput" }, [
                                "Acquired"
                            ]),
                            m("div", { class : "input-group" }, [
                                m("span", { class : "input-group-text" }, [ "$" ]),
                                m("input", { class : "form-control", "id" : "itemAcquiredPriceInput", "type" : "number", "placeholder" : "Price", "value" : InventoryItemModel.acquired_price, "oninput" : function(e) {
                                    InventoryItemModel.acquired_price = e.target.value;
                                } }, [ ]),
                                m("input", { class : "form-control", "id" : "itemAcquiredDtInput", "placeholder" : "Date", "value" : InventoryItemModel.acquired_dt, "oninput" : function(e) {
                                    InventoryItemModel.acquired_dt = e.target.value;
                                }}),
                                m("button", { class : "btn btn-outline-secondary", "onclick" : function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    InventoryItemModel.acquired_dt = moment().format("L")
                                } }, [ "Today" ])
                            ])
                        ]),
                        m("label", { "for" : "itemDisposedBtnGroup", class : "pt-3" }, [
                                "Status"
                        ]),
                        m("div", { class : "form-group" }, [
                            m("div", { class : "btn-group", "id" : "itemDisposedBtnGroup", "role" : "group" }, [
                                m("button", { class : "btn " + ((InventoryItemModel.listed) ? "btn-primary" : "btn-light"), "onclick" : function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    InventoryItemModel.listed = !InventoryItemModel.listed;
                                }  }, [ "Listed" ]),
                                m("button", { class : "btn " + ((InventoryItemModel.pending) ? "btn-primary" : "btn-light"), "onclick" : function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    InventoryItemModel.pending = !InventoryItemModel.pending;
                                }  }, [ "Pending" ]),
                                m("button", { class : "btn " + ((InventoryItemModel.sold) ? "btn-primary" : "btn-light"), "onclick" : function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    InventoryItemModel.sold = !InventoryItemModel.sold;
                                    if( InventoryItemModel.sold ) {
                                        InventoryItemModel.donated = false;
                                        InventoryItemModel.disposed = false;
                                    }
                                }  }, [ "Sold" ]),
                                m("button", { class : "btn " + ((InventoryItemModel.donated) ? "btn-primary" : "btn-light"), "onclick" : function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    InventoryItemModel.donated = !InventoryItemModel.donated;
                                    if( InventoryItemModel.donated ) {
                                        InventoryItemModel.sold = false;
                                        InventoryItemModel.disposed = false;
                                    }
                                }  }, [ "Donated" ]),
                                m("button", { class : "btn " + ((InventoryItemModel.disposed) ? " btn-primary" : "btn-light"), "onclick" : function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    InventoryItemModel.disposed = !InventoryItemModel.disposed;
                                    if( InventoryItemModel.disposed ) {
                                        InventoryItemModel.sold = false;
                                        InventoryItemModel.donated = false;
                                    }
                                    
                                }  }, [ "Disposed" ])
                            ])
                        ]),
                        InventoryItemModel.pending
                            ? m("div", { class : "input-group pt-3" }, [
                                m("input", { class : "form-control", "type" : "string", "placeholder" : "Pending notes", "value" : InventoryItemModel.pending_notes, "oninput" : function(e) {
                                    InventoryItemModel.pending_notes = e.target.value;
                                } }, [])
                            ])
                            : [],
                        InventoryItemModel.sold
                            ? m("div", { class : "input-group pt-3" }, [
                                m("span", { class : "input-group-text" }, [ "$" ]),
                                m("input", { class : "form-control", "id" : "itemSoldPriceInput", "type" : "number", "placeholder" : "Sold Price", "value" : InventoryItemModel.sold_price, "oninput" : function(e) {
                                    InventoryItemModel.sold_price = e.target.value;
                                } }, [ ]),
                                m("input", { class : "form-control", "id" : "itemSoldDtInput", "placeholder" : "Sold Date", "value" : InventoryItemModel.sold_dt, "oninput" : function(e) {
                                    InventoryItemModel.sold_dt = e.target.value;
                                }}),
                                m("button", { class : "btn btn-outline-secondary", "onclick" : function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    InventoryItemModel.sold_dt = moment().format("L")
                                } }, [ "Today" ])
                            ])
                            : [],
                        InventoryItemModel.donated
                            ? m("div", { class : "input-group pt-3" }, [
                                m("span", { class : "input-group-text" }, [ "$" ]),
                                m("input", { class : "form-control", "id" : "itemDonatedValueInput", "type" : "number", "placeholder" : "Donation Value", "value" : InventoryItemModel.donated_value, "oninput" : function(e) {
                                    InventoryItemModel.donated_value = e.target.value;
                                } }, [ ]),
                                m("input", { class : "form-control", "id" : "itemDonatedDtInput", "placeholder" : "Donated Date", "value" : InventoryItemModel.donated_dt, "oninput" : function(e) {
                                    InventoryItemModel.donated_dt = e.target.value;
                                }}),
                                m("button", { class : "btn btn-outline-secondary", "onclick" : function(e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    InventoryItemModel.donated_dt = moment().format("L")
                                } }, [ "Today" ])
                            ])
                            : [],
                            
                        // Tag Definitions
                        EditItemViewModel.tagDefinitions.map(function(tagDefinition) {
                            var tag = InventoryItemModel.getTagByTagDefinitionId(tagDefinition.id);
                            if( !tag ) {
                                tag = {
                                    value : "",
                                    tagDefinition : tagDefinition
                                }
                                InventoryItemModel.addTag(tag);
                            }
                            
                            return (tagDefinition.active
                            ? m("div", { class : "form-group pt-3"}, [
                                    m("label", { "for" : tagDefinition.label + "Input" }, [
                                        tagDefinition.label
                                    ]),
                                    m("input", { class : "form-control", "id" : tagDefinition.label + "Input", "data-label" : tagDefinition.label, "placeholder" : "", "value" : tag.value, "oninput" : function(e) {
                                        InventoryItemModel.setTagValue(tagDefinition.id, e.target.value);
                                    } }, [ ])
                                ])
                            : []);
                        }),
                        
                        // Photos
                        m("div", { class : "form-group pt-3" }, [
                            m("label", { "for" : "itemAddPhotosBtn" }, [
                                "Photos"
                            ]),
                            m("ul", { class : "list-group list-group-horizontal" }, [
                                m("li", { class  : "list-group-item border-0 px-0" }, [
                                    m("div", { class : "thumbnail-container border border-secondary rounded " }, [
                                        m("div", { class : "position-absolute top-50 start-50 translate-middle" }, [
                                            m(m.route.Link, { href : "/capturePhoto" }, [
                                                m("button", { class : "btn btn-link" }, [
                                                    m("i", { class : "bi bi-plus-circle fs-2" }, [])
                                                ])
                                            ])
                                        ])
                                    ])
                                ]),
                                PhotosModel.photos.map(function(photo) {
                                    return m("li", { class : "list-group-item border-0 pe-0" }, [
                                        m("div", { class : "thumbnail-container border border-secondary rounded" }, [
                                            m("img", { class : "thumbnail", "src" : photo }, [])
                                        ])
                                    ])
                                })
                            ])
                        ]),
                        m("div", { class : "form-group pt-3" }, [
                            m("button[type=submit]", { class : "btn btn-primary", "onclick" : function(e) {
                                e.preventDefault();
                                ModalModel.show = true;
                                ModalModel.message = "Saving...";
                                ModalModel.spinner = true;
                                
                                console.log("EditItemView onsubmit");
                                InventoryItemModel.save().then(function(result) {
                                    ModalModel.show = false;
                                    if( result && result.status == "success" ) {
                                        m.route.set("/");
                                    }
                                }).catch(function(error) {
                                    ModalModel.message = "There was an error saving the item: " + JSON.stringify(error);
                                    ModalModel.closable = true;
                                    ModalModel.spinner = false;
                                    console.log("Error");
                                    console.log(error);
                                })
                            } }, [
                                InventoryItemModel.id == null
                                    ? "Add"
                                    : "Save"
                            ]),
                            InventoryItemModel.id != null 
                                ? m("button", { class : "btn btn-danger", "onclick" : function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    
                                    ModalModel.show = true;
                                    ModalModel.message = "Deleting...";
                                    ModalModel.spinner = true;
                                
                                    InventoryItemModel.delete().then(function(result) {
                                        ModalModel.show = false;
                                        
                                        if( result && result.status=="success" ) {
                                            m.route.set("/");
                                        } else {
                                            ModalModel.show = true;
                                            ModalModel.message = result.message;
                                            ModalModel.closable = true;
                                            ModalModel.spinner = false;
                                        }
                                    }).catch(function(error) {
                                        ModalModel.show = true;
                                        ModalModel.message = "There was an error deleting item " + InventoryItemModel.id + ": " + JSON.stringify(error);
                                        ModalModel.closable = true;
                                        ModalModel.spinner = false;
                                    });
                                } }, [
                                    "Delete"
                                ])
                                : []
                        ])
                    ]),
                m(BottomNavBar),
                ModalModel.show ? m(ModalComponent) : []
        ]);
    }
};

module.exports = EditItemView;