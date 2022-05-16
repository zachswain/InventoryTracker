var m = require("mithril");

var InventoryFilterModel = {
    filterText : null,
    
    matchesItem : function(item) {
        if( !item ) return false;
        
        if( !InventoryFilterModel.filterText ) return true;
        
        if( InventoryFilterModel.filterText.indexOf(":")!=-1 ) {
            var tag = InventoryFilterModel.filterText.split(":")[0].trim();
            var value = InventoryFilterModel.filterText.split(":")[1].trim();
            
            for( var i=0 ; i<item.tags.length ; i++ ) {
                if( item.tags[i].tagDefinition.label.toLowerCase().trim()==tag.toLowerCase().trim() && item.tags[i].value.toLowerCase().trim()==value.toLowerCase().trim() ) {
                    return true;
                }
            }
            
            return false;
        }
        
        if( item.name && item.name.toLowerCase().match(InventoryFilterModel.filterText.toLowerCase()) ) {
            return true;
        }
        
        if( item.description && item.description.toLowerCase().match(InventoryFilterModel.filterText.toLowerCase()) ) {
            return true;
        }
    }
}

module.exports = InventoryFilterModel;