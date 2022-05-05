var m = require("mithril");

var TagsModel = {
    loadAll : function() {
        return m.request({
            method : "GET",
            url : "/api/tag"
        });
    }
};

module.exports = TagsModel;