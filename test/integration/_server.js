"use strict";
var assert = require('assert');
var shell = require('shelljs');
var helper = require("../helper.js");
var utilities = require("soajs.mongodb.data/modules/jsconf/");
var controller, oauth, s1, s2, s3, s4;

describe("importing sample data", function () {
	
	it("do import", function (done) {
		shell.pushd(utilities.dir);
		process.env.SOAJS_PROFILE = utilities.dir + "/profile.js";
		
		console.log(process.env.SOAJS_PROFILE);
		shell.exec("mongo data.js", function (code) {
			assert.equal(code, 0);
			shell.popd();
			done();
		});
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
