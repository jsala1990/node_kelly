var Mocha = require("mocha");

task("test", function(params) {
	var files = new jake.FileList();
	files.include("**/_*_test.js");
	files.exclude("node_modules");

	var mocha = new Mocha();
	files.forEach(function(file){
		console.log(file);
	  mocha.addFile(file);

	});
	mocha.reporter("list").run();
});
