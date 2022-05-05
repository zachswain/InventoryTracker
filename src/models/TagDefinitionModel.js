var m = require("mithril");

var TagDefinitionModel = {
    loadAll : function() {
        return m.request({
            method : "GET",
            url : "/api/tag/definitions"
        })
    },
    
    create : function() {
        return m.request({
            method : "PUT",
            url : "/api/tag/definition/"
        });
    },
    
    save : function(tagDefinition) {
        if( tagDefinition.id ) {
            return m.request({
                method : "POST",
                url : "/api/tag/definition/" + tagDefinition.id,
                body : {
                    label : tagDefinition.label,
                    type : tagDefinition.type,
                    active : tagDefinition.active,
                }
            }).then(function(results) {
                return results;
            })
        } else {
            // TBD
        }
    },
    
    delete : function(tagDefinition) {
        if( tagDefinition.id ) {
            return m.request({
                method : "DELETE",
                url : "/api/tag/definition/" + tagDefinition.id
            });
        }
    }
};

module.exports = TagDefinitionModel;