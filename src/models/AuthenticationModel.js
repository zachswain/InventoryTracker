var m = require("mithril");
var path = require("path");

var AuthenticationModel = {
    user : null,

    isAuthenticated : function() {
        return (AuthenticationModel.user!=null);
    }
}

module.exports = AuthenticationModel;