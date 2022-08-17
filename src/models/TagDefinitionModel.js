var m = require("mithril");
var AuthenticationModel = require("./AuthenticationModel");

var TagDefinitionModel = {
    loadAll : function() {
        return m.request({
            method : "GET",
            url : "/api/tag/definitions?token=" + AuthenticationModel.token
        })
    },
    
    create : function() {
        return m.request({
            method : "PUT",
            url : "/api/tag/definition/?token=" + AuthenticationModel.token
        });
    },
    
    save : function(tagDefinition) {
        if( tagDefinition.id ) {
            return m.request({
                method : "POST",
                url : "/api/tag/definition/" + tagDefinition.id + "?token=" + AuthenticationModel.token,
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
                url : "/api/tag/definition/" + tagDefinition.id + "?token=" + AuthenticationModel.token
            });
        }
    }
};

module.exports = TagDefinitionModel;