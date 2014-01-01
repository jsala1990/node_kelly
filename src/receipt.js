var fs = require("fs");

exports.parseLine = function(line){	
	return line.split(" ");
};

var Receipt = module.exports = function() {
	this._produceLine = [];
	this._totalSalesTax = 0;
	this._totalCost = 0;
};

Receipt.prototype.produceLine = function(){
	return this._produceLine;
}

Receipt.prototype.processItem = function(produce, salesTax){	
	var itemLine = produce.getItems();
	var price = produce.getPrice();
	var itemCost = parseFloat(salesTax) + parseFloat(price);
	this._totalSalesTax += salesTax;
	this._totalCost += itemCost;
	itemLine.pop();
	itemLine.push(itemCost.toFixed(2));
	this._produceLine.push(itemLine.join(" ").replace(" at", ":"));
};

Receipt.prototype.printReceipt = function(outputFile, callback) {
	this._produceLine.push("Total: " + this._totalCost.toFixed(2));
	this._produceLine.push("Sales Taxes: " + this._totalSalesTax.toFixed(2));

	fs.writeFile(outputFile, this._produceLine.join("\n"), function (err) {
	  if (err) throw err;
	  callback();
	});
};