var assert = require("assert");
var Receipt = require("./receipt");
var cash_register = require("./cash_register");
var _ = require("underscore");
var receipt;
var Produce = require("./produce");

var fs = require("fs");


describe("processItem", function(){
	it("should save values and print for one", function(){
		receipt = new Receipt();
		receipt.processItem(new Produce("1 book at 12.49".split(" ")), 1.00);
		assert.ok(_.contains(receipt.produceLine(), "1 book: 13.49"));
	});
	it("should do it twice", function(){
		receipt = new Receipt();
		receipt.processItem(new Produce("1 book at 12.49".split(" ")), 1.00);
		receipt.processItem(new Produce("1 book at 12.49".split(" ")), 2.00);
		assert.ok(_.contains(receipt.produceLine(), "1 book: 13.49"));
		assert.ok(_.contains(receipt.produceLine(), "1 book: 14.49"));
	})
});

describe("printReceipt", function(){
	var outputFile = "fake_data/actual_output.txt";
	it("should save array of lines into actual_file", function(done){
		receipt = new Receipt();
		receipt.processItem(new Produce("1 book at 12.49".split(" ")), 1.00);
		receipt.processItem(new Produce("1 car at 13.49".split(" ")), 1.00);
		receipt.processItem(new Produce("1 cat at 14.49".split(" ")), 1.00);
		var fakeInput = ["1 book at 12.49", "1 music CD at 14.99", "1 chocolate bar at 0.85"];
		receipt.printReceipt(outputFile, function(){
			var lines = [];
			lines = parseFile(outputFile, done);
			assert.ok(_.contains(lines, "1 book: 13.49"));
			assert.ok(_.contains(lines, "1 car: 14.49"));
			assert.ok(_.contains(lines, "1 cat: 15.49"));
			assert.ok(_.contains(lines, "Total: 43.47"));
			assert.ok(_.contains(lines, "Sales Taxes: 3.00"));
			done();
		});
	});
});

function parseFile(path){
	return fs.readFileSync(path).toString().split('\n');
};
