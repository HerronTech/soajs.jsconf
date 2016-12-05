"use strict";
var helper = require("../helper.js");
var service;

describe("Initialize & start controller and service", function () {
	
	before(function (done) {
		done();
	});
	
	it("Starting Integration tests ...", function (done) {
		service = helper.requireModule('./index.js');
		setTimeout(function () {
			require("./jsconf.tests.js");
			done();
		}, 1000);
	});
});