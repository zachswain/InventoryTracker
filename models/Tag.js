module.exports = {
    modelName : "Tag"
};

const Sequelize = require("sequelize")
const Database = require("../db");
const TagDefinition = require("./TagDefinition");

Object.assign(module.exports, {
    model : {
    	value : {
    	    type : Sequelize.STRING,
    	    allowNull : true
    	}
    },
    
    relationships : [
        { modelName : TagDefinition.modelName, relationship : "belongsTo", as : "tagDefinition" }
    ],
    
    async create(args, options) {
        var model = Database.getModel(this.modelName);
        let item = await model.create(args, options);

        return item;
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