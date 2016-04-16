'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var jsconfSRV = new soajs.server.service(config);

/**
 * Declare a global variable, usage is below
 */
var myMongo;

jsconfSRV.init(function () {

	jsconfSRV.post("/standalone/add", function(req, res){

		if(!myMongo){
			/**
			 * Initializing DB Connection
			 */
			req.soajs.log.debug("Creating new DB connection to users database.");
			var dbConfiguration = req.soajs.registry.coreDB.myDatabase;
			myMongo = new soajs.mongo(dbConfiguration);
		}
		else{
			req.soajs.log.debug("Mongo Instance already created, reusing existing connection.");
		}

		/**
		 * Formulating Document to insert
		 */
		req.soajs.log.debug("Formulating new record: " + JSON.stringify(req.soajs.data));
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

	jsconfSRV.post("/multi/add", [
		function (req, res, next) {
			/**
			 * Initializing DB Connection
			 */
			req.soajs.log.debug("Creating new DB connection to users database.");
			var dbConfiguration = req.soajs.meta.tenantDB(req.soajs.registry.tenantMetaDB, "users", req.soajs.tenant.code);
			req.soajs.mongo = new soajs.mongo(dbConfiguration);

			/**
			 * Formulating Document to insert, push to request, will use it in next mw
			 */
			req.soajs.log.debug("Formulating new record: " + JSON.stringify(req.soajs.data));
			req.soajs.data = {
				'username': req.soajs.inputmaskData.username,
				'name': req.soajs.inputmaskData.name,
				'email': req.soajs.inputmaskData.email
			};
			next();

		},
		function (req, res) {

			/**
			 * Inserting Document in DB
			 */
			req.soajs.mongo.insert("data", req.soajs.data, true, function (error) {
				req.soajs.mongo.closeDb();
				if (error) {
					req.soajs.log.error(error);
					return res.jsonp(req.soajs.buildResponse({'code': 600, 'msg': config.errors[600]}));
				}

				return res.json(req.soajs.buildResponse(null, true));
			});
		}
	]);

	jsconfSRV.get("/hybrid", function (req, res) {

		var data;
		var tenantConfig = req.soajs.servicesConfig;
		switch(tenantConfig.style){
			case 'simple':
				data = "Hello i am a message!";
				break;
			case 'advanced':
				data = tenantConfig.obj.name.replace("%name%", req.soajs.inputmaskData.name);
				break;
			case 'imfv':
				data = {};
				data.name = tenantConfig.obj.name.replace("%name%", req.soajs.inputmaskData.name);
				data.email = tenantConfig.obj.email.replace("%email%", req.soajs.inputmaskData.name);
				break;
		}


		return res.json(req.soajs.buildResponse(null, data));
	});

	jsconfSRV.start();
});