var assert = require("assert");
var Produce = require("./produce");
var tax = require("./sales_tax");
var produce;

describe("should get tax for all three types", function(){
	it("should return tax for basic", function(){
		assert.equal(10, tax.getTaxAndCostFor(new Produce(["", 100])));
		assert.equal(10, tax.getTaxAndCostFor(new Produce(["basic", 100])), "same as empty");
	});

	it("should return tax for basic and imported type", function(){
		assert.equal(15, tax.getTaxAndCostFor(new Produce(["imported", "", 100])));
		assert.equal(15, tax.getTaxAndCostFor(new Produce(["imported", "basic", 100])));
	});

	it("should return tax for exempt type", function(){
		assert.equal(0.0, tax.getTaxAndCostFor(new Produce(["book", 100])));
	});

	it("should return tax for exempt and imported type", function(){
		assert.equal(5.0, tax.getTaxAndCostFor(new Produce(["imported", "book", 100])));
	});
});





// describe("should get object price", function(){
// 	it("should return price", function(){
// 		assert.equal(2.99, p.getPrice());
// 	});
// });

// describe("")