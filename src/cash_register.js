var Produce = require("./produce");
var _ = require("underscore");
var tax = require("./sales_tax");
var fs = require("fs");
var readline = require("readline");
var Receipt = require("./receipt")
// var 

exports.run = function(input, output, callable){
	var receipt = new Receipt();
	parseFile(input, function parseItem(line){
		var produce = new Produce(line.split(" ")); 
		var itemSalesTax = parseFloat(tax.getTaxAndCostFor(produce)); 
		receipt.processItem(produce, itemSalesTax);
	}, function closeRegister(){
		receipt.printReceipt(output, callable);
	});
};

var getTotalCost = exports.getTotalCost = function(totalSalesTax, price){
	this._totalSalesTax = parseFloat(totalSalesTax);
	this._price = parseFloat(price);
	var totalCost = this._totalSalesTax + this._price;
	return totalCost.toFixed(2);
}

var parseFile = exports.parseFile = function(path, parseItem, closeRegister){
	var rd = readline.createInterface({
    input: fs.createReadStream(path),
    terminal: false
	});

	rd.on('line', function(line) {
    parseItem(line);
	});

	rd.on('close', function(){
		closeRegister();
	});
};
