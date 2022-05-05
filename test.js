var Item = require("./models/Item");
var Tag = require("./models/Tag");

var item = Item.getByItemId(1);

console.log(item);