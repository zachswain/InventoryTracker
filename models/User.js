module.exports = {
    modelName : "User"
};

const Sequelize = require("sequelize")
const Database = require("../db");

Object.assign(module.exports, {
    model : {
    	email : {
    	    type : Sequelize.STRING,
    	    allowNull : false
    	},
    	access_type : {
    	    type : Sequelize.STRING,
    	   allowNull : false
    	}
    },
    
    relationships : [
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
    
    async findOneByEmail(email) {
        var model = Database.getModel(this.modelName);
        return model.findOne({ where : { email : email } });
    },
    
    async getModel() {
        var model = await Database.getModel(this.modelName);
        return model;
    }
});