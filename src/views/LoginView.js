var m = require("mithril");
const keys = require('../../config/keys.json');
const jwt = require("jsonwebtoken");
var AuthenticationModel = require("../models/AuthenticationModel");

var LoginView = {
    oninit : function(vnode) {
        window.handleCredentialResponse = function(response) {
            console.log(response);
            var payload = jwt.decode(response.credential);
            console.log(payload);
            AuthenticationModel.token = response.credential;
            AuthenticationModel.user = payload;
            m.route.set("/");
        }    
    },
    
    oncreate : function(vnode) {
        // google.accounts.id.initialize({
        //      client_id: keys.web.client_id,
        //      callback: GoogleAuthentication.handleCredentialResponse
        //  });
        // google.accounts.id.renderButton(
        //      document.getElementById("signinBtn"),
        //      { theme: "outline", size: "large" }  // customization attributes
        // );
        // google.accounts.id.prompt();
    },
    
    view : function(vnode) {
        return [
            m("script", { "src" : "https://accounts.google.com/gsi/client", "async" : "", "defer" : "" }, []),
            m("div", { "id" : "g_id_onload", "data-client_id" : keys.web.client_id, "data-callback" : "handleCredentialResponse", "data-auto_prompt" : false}, []), //"data-login_uri" : "/authenticated"
            m("div", { "class" : "g_id_signin", "data-type" : "standard", "data-size" : "large", "data-theme" : "outline", "data-text" : "sign_in_with", "data-shape" : "rectangular", "data-logo_alignment" : "left" }, [])
            
            //m("div", { "id" : "signinBtn", "class" : "g-signin2", "data-onsuccess" : "handleCredentialResponse" }, [])
        ];
    }
}

module.exports = LoginView;