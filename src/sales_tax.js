var _ = require("underscore");

exports.getTaxAndCostFor = function(produce){
	var typeArgs = produce.getTypes();
	var price = produce.getPrice();
	var totalTax = 0;

	if( _.contains(typeArgs, "exempt") ) {
		totalTax+=0.00;
	} else {
		totalTax+=0.10;
	}
	if( _.contains(typeArgs, "imported") ) {
		totalTax+=0.05;
	}

	var totalSalesTax = parseFloat(totalTax * price);

	return totalSalesTax.toFixed(2);
};