var m = require("mithril");

var PreferencesModel = {
    hideListed : null,
    hidePending : null,
    hideSold : null,
    hideDisposed : null,
    hideDonated : null,
    
    init : function() {
        console.log("Initializing user preferences");
        PreferencesModel.hideListed = false;
        PreferencesModel.hidePending = false;
        PreferencesModel.hideSold = true;
        PreferencesModel.hideDisposed = true;
        PreferencesModel.hideDonated = true;
        
        console.log(PreferencesModel);
        
        PreferencesModel.save();
    },
    
    save : function() {
        console.log("Saving user preferences cookie");
        var preferences = {
            hideListed : PreferencesModel.hideListed,
            hidePending : PreferencesModel.hidePending,
            hideSold : PreferencesModel.hideSold,
            hideDisposed : PreferencesModel.hideDisposed,
            hideDonated : PreferencesModel.hideDonated,
        };
        var json = JSON.stringify(preferences);
        var expiration = new Date("1-1-2100");
        var name = "preferences";
        
        document.cookie = name + "=" + escape(json) + "; expires=" + expiration.toGMTString() + "; path=/";
        
        console.log(document.cookie);
        
        console.log("User preferences cookie saved");
    },
    
    load : function() {
        console.log("Loading user preferences from cookies");
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookies  = decodedCookie.split(';');
  
        for(var i = 0; i <cookies.length; i++) {
            var cookie = cookies[i].trim();
    
            if (cookie.indexOf("preferences=") == 0) {
                console.log("Found user preferences cookie: " + cookie);
                var json = cookie.substring("preferences=".length, cookie.length);
                var preferences = JSON.parse(json);
                PreferencesModel.hideListed = preferences.hideListed;
                PreferencesModel.hidePending = preferences.hidePending;
                PreferencesModel.hideSold = preferences.hideSold;
                PreferencesModel.hideDisposed = preferences.hideDisposed;
                PreferencesModel.hideDonated = preferences.hideDonated;
                
                return;
            }
        }
        
        console.log("No user preference cookie found, initializing");
        
        PreferencesModel.init();
    }
};

module.exports = PreferencesModel;