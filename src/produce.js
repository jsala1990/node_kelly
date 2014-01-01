var _ = require("underscore");

var BASIC = ["basic",2,3,2,5];
var EXEMPT = ["book", "chocolate", "chocolates", "pills"];
var IMPORTED = ["imported", "import"];

var Produce = module.exports = function (type) {
	this._type = type;
	this._price = _.last(type);
};

Produce.prototype.getTypes = function(){
	var types = [];

	for(var i=0; i<this._type.length; i++) {
		if ( _.contains(EXEMPT, this._type[i]) ) types.push("exempt");
		if ( _.contains(IMPORTED, this._type[i]) ) types.push("imported");
	};

	return _.uniq(types);
};

Produce.prototype.getPrice = function(){
		return this._price;
};

Produce.prototype.getItems = function(){
		return this._type;
};