module.exports = {
    modelName : "Photo"
};

const Sequelize = require("sequelize")
const Database = require("../db");
const Item = require("./Item");

Object.assign(module.exports, {
    model : {
    	data : {
    	    type : Sequelize.BLOB,
    	    allowNull : false
    	}
    },
    
    relationships : [
        // { modelName : Item.modelName, relationship : "belongsTo", as : "item", options : { onDelete : "cascade" } }
    ],
    
    async create(args, options) {
        console.log(args);
        var model = Database.getModel(this.modelName);
        let photo = await model.create(args, options);

        return photo;
    },
    
    async findAll(args = {}) {
        var model = Database.getModel(this.modelName);
        if( args  == null ) {
            args = { include : { all : true, nested : true } }
        }
        return model.findAll(args);
    },
    
    async getModel() {
        var model = await Database.getModel(this.modelName);
        return model;
    }
});