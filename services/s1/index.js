'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var jsconfSRV = new soajs.server.service(config);

jsconfSRV.init(function () {

	jsconfSRV.get("/hello", function (req, res) {

		var txt = req.soajs.inputmaskData.name + " <" + req.soajs.inputmaskData.email + "> ";

		return res.json(req.soajs.buildResponse(null, txt));
	});

	jsconfSRV.start();
});