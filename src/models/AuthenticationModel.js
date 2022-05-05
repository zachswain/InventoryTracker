var m = require("mithril");
var path = require("path");

var AuthenticationModel = {
    user : null,
    
    authenticate : function() {
        AuthenticationModel.user = {
            username : "Test"
        };
    },
    
    isAuthenticated : function() {
        return (AuthenticationModel.user!=null);
    }
}

module.exports = AuthenticationModel;