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
                    if( results && results.status && results.status=="success" ) {
                        FilterSuggestionModel.suggestions = results.results;
                        resolve(FilterSuggestionModel.suggestions);
                    } else {
                        reject();
                    }
                    FilterSuggestionModel.loading = false;
                }).catch(function(err) {
                    reject(err);
                })
            }, 500);
        })
    }
}

module.exports = FilterSuggestionModel;