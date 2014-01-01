var assert = require("assert");
var Produce = require("./produce");
var _ = require("underscore");

var exempt;

describe("basic test", function(){
	it("should fail", function(){
		assert.ok(true);
	});
});

describe("one type", function(){
	it("should return exempt for book", function(){
		exempt = new Produce(["book"]);
		assert.ok(_.contains(exempt.getTypes(), "exempt"));
	});

	it("should return exempt for chocolate", function(){
		exempt = new Produce(["chocolate"]);
		assert.ok(_.contains(exempt.getTypes(), "exempt"));
	});

	it("should return exempt for pills", function(){
		exempt = new Produce(["pills"]);
		assert.ok(_.contains(exempt.getTypes(), "exempt"));
	});

	it("should return imported for import", function(){
		exempt = new Produce(["import"]);
		assert.ok(_.contains(exempt.getTypes(), "imported"));
	});

	it("should return imported for imported", function(){
		exempt = new Produce(["imported"]);
		assert.ok(_.contains(exempt.getTypes(), "imported"));
	});
});

describe("accepts parsed lines", function(){
	it("should return exempt for book", function(){
		exempt = new Produce(["book"]);
		assert.ok(_.contains(exempt.getTypes(), "exempt"));
	});

	it("should return basic for music", function(){
		exempt = new Produce(["music", "CD"]);
		assert.ok(_.isEmpty(exempt.getTypes()));
	});

	it("should return exempt for chocolate", function(){
		exempt = new Produce(["chocolate", "bar"]);
		assert.ok(_.contains(exempt.getTypes(), "exempt"));
	});

	it("should return imported and exempt for imported food", function(){
		exempt = new Produce(["imported", "box", "of", "chocolates"]);
		assert.equal((_.difference(exempt.getTypes(), ["imported", "exempt"]).length, null));
	});

});

describe("edge case", function(){
	it("should return unique types", function(){
		exempt = new Produce(["book", "pills", "chocolate"]);
		assert.ok(_.contains(exempt.getTypes(), "exempt"));
		assert.equal(exempt.getTypes().length, 1);
	});
});

describe("should get object price", function(){
	var p = new Produce(["type", "2.99"]);

	it("should return price", function(){
		assert.equal(2.99, p.getPrice());
	});
});