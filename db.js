const Sequelize = require("sequelize");
const fs = require("fs");
const config = require("config");

class Database {
  static init() {
    if( this._sequelize ) {
        console.log("Database is already initialized");
        return;
    }
    
    this._sequelize = new Sequelize({
    	dialect: 'sqlite',
    	storage: "./database.sqlite",
    	logging : console.log,
    	pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
    });
    
    let self=this;
    self._models=[];    
    var relationships=[];
    
    fs.readdirSync(__dirname + "/models").forEach(function(name){
    		if( !name.startsWith("_") ) {
				var object = require(__dirname + "/models" + "/" + name);
				var options = object.options || {}
				var modelName = object.modelName || name.replace(/\.js$/i, "");
				self._models[modelName] = self._sequelize.define(modelName, object.model, options);
				if( object.skipSync===true ) {
						console.log("Setting sync=false on " + modelName);
						self._models[modelName].sync = () => Promise.resolve();
				}
				if("relationships" in object){
					relationships.push({
					  modelName : modelName,
					  relationships : object.relationships
					});
				}
				console.log("added model " + modelName);
    		}
		});

		relationships.forEach(relationship  => {
		  var source = self._models[relationship.modelName];

		  relationship.relationships.forEach(relatedTo => {
		    var target = self._models[relatedTo.modelName];
		    
		    let options = relationship.options || {};
		    if( relatedTo.as ) {
		    	options.as = relatedTo.as;
		    }
		    if( relatedTo.through ) {
		    	options.through = relatedTo.through;
		    }
		    if( relatedTo.sourceKey ) {
		    	options.sourceKey = relatedTo.sourceKey;
		    }
		    if( relatedTo.foreignKey ) {
		    	options.foreignKey = relatedTo.foreignKey;
		    }

		    switch( relatedTo.relationship ) {
		      case "hasOne":
		        source[target.modelName] = source.hasOne(target, options);
		        break;
		      case "hasMany":
		      	//options.sourceKey = "id";
		        source[target.modelName] = source.hasMany(target, options);
		        break;
		      case "belongsTo":
		      	source[target.modelName] = source.belongsTo(target, options);
		        break;
		      case "belongsToMany":
		      	source[target.modelName] = source.belongsToMany(target, options);
		      	break;
		    }
		    
		    console.log("added relationship, " + source.name + " " + relatedTo.relationship + " " + target.name);
		  })
		});
		
		console.log("Database initialized");
  }
  
  static async sync() {
  	var options = {};
  	if( config.get("Database").sync ) {
  		options.force = true;
  	}
  	return this._sequelize.sync(options);
  }
  
  static initialized() {
      return this._sequelize!=null;
  }
  
  static getModel(modelName) {
    return this._models[modelName];
  }
  
  static query(query, options) {
  	return this._sequelize.query(query, options);
  }
  
	static async transaction() {
		return await this._sequelize.transaction();
	}
}

module.exports = Database;