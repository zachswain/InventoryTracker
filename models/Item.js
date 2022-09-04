module.exports = {
    modelName : "Item",
    TYPES : {
        STRING : "String",
        NUMBER : "Number",
        DATE : "Date"
    }
};

const Sequelize = require("sequelize")
const Database = require("../db");
const Tag = require("./Tag");
const Photo = require("./Photo");

Object.assign(module.exports, {
    model : {
    	name : {
    		type : Sequelize.STRING,
    		allowNull : false,
    	},
    	description: {
    		type: Sequelize.STRING,
    		allowNull : true
    	},
    	notes : {
    	    type : Sequelize.TEXT,
    	    allowNull : true
    	},
    	acquired_price : {
    	    type: Sequelize.DECIMAL,
    	    allowNull : true
    	},
    	acquired_dt : {
    	    type : Sequelize.DATEONLY,
    	    allowNull : true
    	},
    	listed : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	pending : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	pending_notes : {
    	    type : Sequelize.STRING,
    	    allowNull : true
    	},
    	sold : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	sold_price : {
    	    type : Sequelize.DECIMAL,
    	    allowNull : true
    	},
    	sold_dt : {
    	    type : Sequelize.DATEONLY,
    	    allowNull : true
    	},
    	donated : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	donated_value : {
    	    type : Sequelize.DECIMAL,
    	    allowNull : true
    	},
    	donated_dt : {
    	    type : Sequelize.DATEONLY,
    	    allowNull : true
    	},
    	disposed : {
    	    type : Sequelize.BOOLEAN,
    	    allowNull : false,
    	    defaultValue : false
    	},
    	disposed_dt : {
    	    type : Sequelize.DATEONLY,
    	    allowNull : true
    	}
    },
    
    relationships : [
        { modelName : Tag.modelName, relationship : "hasMany", as : "tags" },
        { modelName : Photo.modelName, relationship : "hasMany", as : "photos" }
        //{ modelName : Sector.modelName, relationship : "belongsTo" },
        //{ modelName : Port.modelName, relationship : "belongsTo" }
    ],
    
    async findAll() {
        var model = Database.getModel(this.modelName);
        return model.findAll({ include : { all : true, nested : true } });
    },
    
    async create(args) {
        var model = Database.getModel(this.modelName);
        let item = await model.create(args);

        return item;
    },
    
    async getByItemId(id) {
        var model = Database.getModel(this.modelName);
		return model.findOne({ where : { id : id }, include : { all : true, nested : true } });
    }
});