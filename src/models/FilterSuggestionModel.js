var m = require("mithril");

var FilterSuggestionModel = {
    loading : false,
    show : false,
    suggestions : null,
    timer : null,
    
    suggest : function(phrase) {
        return new Promise(function(resolve, reject) {
            clearTimeout(FilterSuggestionModel.timer);
            FilterSuggestionModel.timer = setTimeout(function() {
                FilterSuggestionModel.show = true;
                FilterSuggestionModel.loading = true;
                m.request({
                    url : "/api/suggest/" + phrase,
                    method : "GET"
                }).then(function(results) {
                    FilterSuggestionModel.suggestions = [ "a", "b", "c" ];
                    resolve(FilterSuggestionModel.suggestions);
                    FilterSuggestionModel.loading = false;
                }).catch(function(err) {
                    return err;
                })
            }, 500);
        })
    }
}

module.exports = FilterSuggestionModel;