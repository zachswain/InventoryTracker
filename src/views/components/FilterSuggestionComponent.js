var m = require("mithril");
var FilterSuggestionModel = require("../../models/FilterSuggestionModel")

var FilterSuggestionComponent = {
    view : function(vnode) {
        return FilterSuggestionModel.show
            ? m("ul", { class : "list-group ms-4" }, [
                FilterSuggestionModel.loading
                    ? m("li", { class : "list-group-item" }, [
                        "Loading..."
                    ])
                    : (FilterSuggestionModel.suggestions && FilterSuggestionModel.suggestions.length>0)
                        ? FilterSuggestionModel.suggestions.map(function(suggestion) {
                            return m("li", { class : "list-group-item" }, [
                                suggestion
                            ])
                        })
                        : m("li", { class : "list-group-item" }, [
                            "No suggestions"
                        ])
            ])
            : [];
    }
}

module.exports = FilterSuggestionComponent;