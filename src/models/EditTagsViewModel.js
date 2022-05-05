var m = require("mithril");
var TagDefinitionModel = require("./TagDefinitionModel");

var EditTagsViewModel = {
    tagDefinitions : null,
    
    addNewTagDefinition : function() {
        TagDefinitionModel.create().then(function(results) {
            if( results.status == "success" ) {
                console.log(results);
                EditTagsViewModel.tagDefinitions.push(results.result)
            }    
        })
        
    },
    
    remove : function(index) {
        EditTagsViewModel.tagDefinitions.splice(index,1);
        m.redraw();
    }
}

module.exports = EditTagsViewModel;
