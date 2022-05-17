var m = require("mithril");
const keys = require('../../../config/keys.json');

var GoogleAuthentication = {
    oninit : function(vnode) {
        window.handleCredentialResponse = function(response) {
            console.log(response);
        }    
    },
    
    oncreate : function(vnode) {
        // google.accounts.id.initialize({
        //      client_id: keys.web.client_id,
        //      callback: GoogleAuthentication.handleCredentialResponse
        //  });
        // google.accounts.id.renderButton(
        //      document.getElementById("buttonDiv"),
        //      { theme: "outline", size: "large" }  // customization attributes
        // );
        // google.accounts.id.prompt();
    },
    
    handleCredentialResponse : function(response) {
        console.log(response);
    },
    
    view : function(vnode) {
        return [
            m("script", { "src" : "https://accounts.google.com/gsi/client", "async" : "", "defer" : "" }, []),
            m("div", { "id" : "g_id_onload", "data-auto_select" : true, "data-client_id" : keys.web.client_id, "data-callback" : "handleCredentialResponse" }, []), //"data-login_uri" : "/authenticated" "data-auto_prompt" : false
            m("div", { "class" : "g_id_signin", "data-type" : "standard", "data-size" : "large", "data-theme" : "outline", "data-text" : "sign_in_with", "data-shape" : "rectangular", "data-logo_alignment" : "left" }, [])
        ];
    }
}

module.exports = GoogleAuthentication;