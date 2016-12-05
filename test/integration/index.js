"use strict";
var helper = require("../helper.js");
var controller, oauth, s1, s2, s3, s4;

describe("Initialize & start controller, oauth, s1, s2, s3, and s4", function () {
	
	before(function (done) {
		done();
	});
	
	it("Starting Integration tests ...", function (done) {
		
		controller = require('soajs.controller');
		
		setTimeout(function () {
			oauth = require('soajs.oauth');
			s1 = helper.requireModule('services/s1/index.js');
			s2 = helper.requireModule('services/s2/index.js');
			s3 = helper.requireModule('services/s3/index.js');
			s4 = helper.requireModule('services/s4/index.js');
			setTimeout(function () {
				require("./jsconf.tests.js");
				done();
			}, 5000);
		}, 5000);
	});
});