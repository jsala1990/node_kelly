var assert = require("assert");
var cashRegister = require("./cash_register");
var _ = require("underscore");
var fs = require("fs");

describe("getTotalCost", function(){
	it("should get total cost for 1 basic item", function(){
		var cost = cashRegister.getTotalCost("1.5", "15.00");
		assert.equal(cost, 16.5);
	});

	it("should get total cost for imported basic item", function(){
		var cost = cashRegister.getTotalCost("10", "100");
		assert.equal(cost, 110);
	});
});


describe("parseFile", function(){
	it("should read each input seperately", function(done){
		var lines = [];

		cashRegister.parseFile("fake_data/input_data.txt", function(line){
			lines.push(line);
		}, function(){
			assert.ok(_.contains(lines, "1 book at 12.49"));
			assert.ok(_.contains(lines, "1 music CD at 14.99"));
			assert.ok(_.contains(lines, "1 chocolate bar at 0.85"));
			done();
		});
	});
});

describe("run", function(){
	var input = "fake_data/input_data.txt";
	var output = "fake_data/output_data.txt";
	it("should read input", function(done){
		cashRegister.run(input, output, function(){
			var lines = [];
			lines = parseFile(output);
			assert.ok(_.contains(lines, "1 book: 12.49"));
			assert.ok(_.contains(lines, "1 music CD: 16.49"));
			assert.ok(_.contains(lines, "1 chocolate bar: 0.85"));
			assert.ok(_.contains(lines, "Total: 29.83"));
			assert.ok(_.contains(lines, "Sales Taxes: 1.50"));
			done();
		});
	});
});


function parseFile(path){
	return fs.readFileSync(path).toString().split('\n');
};