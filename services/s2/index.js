'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var jsconfSRV = new soajs.server.service(config);

/**
 * Declare a global variable, usage is below
 */
var myMongo;

jsconfSRV.init(function () {

	jsconfSRV.get("/hello", function (req, res) {

		var txt = req.soajs.inputmaskData.name + " <" + req.soajs.inputmaskData.email + "> ";

		return res.json(req.soajs.buildResponse(null, txt));
	});

	jsconfSRV.post("/standalone/add", function(req, res){

		if(!myMongo){
			/**
			 * Initializing DB Connection
			 */
			req.soajs.log.debug("Creating new DB connection to 'myDatabase' database.");
			var dbConfiguration = req.soajs.registry.coreDB.myDatabase;
			console.log (dbConfiguration);
			myMongo = new soajs.mongo(dbConfiguration);
		}
		else{
			req.soajs.log.debug("Mongo Instance already created, reusing existing connection.");
		}

		/**
		 * Formulating Document to insert
		 */
		req.soajs.log.debug("Formulating new record: " + JSON.stringify(req.soajs.inputmaskData));
		var record = {
			'username': req.soajs.inputmaskData.username,
			'name': req.soajs.inputmaskData.name,
			'email': req.soajs.inputmaskData.email
		};

		myMongo.insert("data", record, true, function (error) {
			if (error) {
				req.soajs.log.error(error);
				return res.jsonp(req.soajs.buildResponse({'code': 600, 'msg': config.errors[600]}));
			}

			return res.json(req.soajs.buildResponse(null, true));
		});
	});

	jsconfSRV.start();
});