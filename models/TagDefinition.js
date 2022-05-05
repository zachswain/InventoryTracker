module.exports = {
    modelName : "TagDefinition"
};

const Sequelize = require("sequelize")
const Database = require("../db");

Object.assign(module.exports, {
    model : {
    	label : {
    		type : Sequelize.STRING,
    		allowNull : true,
    	},
    	type : {
    	    type : Sequelize.STRING,
    	    allowNull : false,
    	    defaultValue : "Text"
    	},
    	active : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : true
    	}
    },
    
    async getModel() {
        var model = Database.getModel(this.modelName);
        return model;
    },
    
    async findAll() {
        var model = Database.getModel(this.modelName);
        return model.findAll({ include : { all : true, nested : true } });
    },
    
    async findOneById(id) {
        var model = Database.getModel(this.modelName);
        return model.findOne({ where : { id : id }, include : { all : true, nested : true }});
    },
    
    async create(args) {
        var model = Database.getModel(this.modelName);
        let tagDefinition = await model.create({
            label : "",
            type : "Text",
            active : true
        });

        return tagDefinition;
    }
});