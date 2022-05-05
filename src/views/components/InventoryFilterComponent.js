var m = require("mithril");
var InventoryFilterModel = require("../../models/InventoryFilterModel");
var debounce = require("debounce");
var FilterSuggestionComponent = require("./FilterSuggestionComponent");
var FilterSuggestionModel = require("../../models/FilterSuggestionModel");

var InventoryFilterComponent = {
    view : function(vnode) {
        console.log("InventoryFilterComponent view");
        return m("nav", { class : "navbar fixed-top navbar-expand-sm navbar-light top-navbar" }, [
            m("div", { class : "container-fluid" }, [
                m("div", { class : "input-group" }, [
                    m("input", { class : "form-control border border-end-0 rounded-pill", "type" : "search", "placeholder" : "Search for items", "value" : InventoryFilterModel.filterText, oninput : function(e) {
                        InventoryFilterModel.filterText = e.target.value;
                        FilterSuggestionModel.suggest(InventoryFilterModel.filterText);
                    }, "onblur" : function(e) {
                        FilterSuggestionModel.show = false;
                    } })
                ])
            ]),
            m(FilterSuggestionComponent)
        ])
    }
}

module.exports = InventoryFilterComponent;