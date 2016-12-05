"use strict";
var assert = require("assert");
var helper = require("../helper.js");
var soajs = require("soajs");

var dbConfiguration = require("./db.config.test.js");
var mongo = new soajs.mongo(dbConfiguration);

var access_token;

//S1

describe("Testing hello in S1", function() {
	it("fails since email is a required field but is missing in query string", function (done) {
		
		helper.requester("get", {
			uri: 'http://127.0.0.1:4111/hello',
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Missing required field: email");
			done();
		});
	});
});

describe("Testing hello in S1 again", function() {
	it("passes since all input requirements are met", function (done) {
		helper.requester("get", {
			uri: 'http://127.0.0.1:4111/hello?email=team@soajs.org',
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, "John Doe \<team@soajs.org> ");
			done();
		});
	});
});

describe("Testing hello in S1 with override", function() {
	it("passes since all input requirements are met and overrides defauly name", function (done) {
		helper.requester("get", {
			uri: 'http://127.0.0.1:4111/hello?email=team@soajs.org&name=mike',
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, "mike \<team@soajs.org> ");
			done();
		});
	});
});




//S2

describe("Testing hello in S2", function() {
	it("fails since no tenant key is provided", function (done) {
		
		helper.requester("get", {
			uri: 'http://dev-api.mydomain.com/jsconf2/hello?email=team@soajs.org',
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "A valid key is needed to access any API.");
			done();
		});
	});
});

describe("Testing hello in S2 again", function() {
	it("passes since tenant key is now provided", function (done) {
		
		helper.requester("get", {
			uri: 'http://dev-api.mydomain.com/jsconf2/hello?email=team@soajs.org',
			headers:{key:"9ee308d7b67d2e58a8770b99c8c0320c8d7262a72fc9516e09395bfa39f91b95190bfde9986f4e902ad5ba9de35573dbc5d087c1699c36632c1fccb91663c77529f633c8247366074d399ab326bfdeaa7211ce8c63b968c73cea7aab46296629"},
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, "John Doe \<team@soajs.org> ");
			done();
		});
	});
});

describe("Testing /standalone/add in S2", function() {
	it("fails since input key email is not in imfv", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf2/standalone/add',
			headers:{key:"9ee308d7b67d2e58a8770b99c8c0320c8d7262a72fc9516e09395bfa39f91b95190bfde9986f4e902ad5ba9de35573dbc5d087c1699c36632c1fccb91663c77529f633c8247366074d399ab326bfdeaa7211ce8c63b968c73cea7aab46296629"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"email": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Error occurred while redirecting your request to the service");
			done();
		});
	});
});

describe("Testing /standalone/add in S2 again", function() {
	it("passes since tenant key is present and all input is valid", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf2/standalone/add',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"address": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, true);
			done();
		});
	});
});

describe("Testing /standalone/add in S2 once again", function() {
	it("fails since duplicate data is in body", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf2/standalone/add',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"address": "team@soajs.org",
						"primary": true
					},
					{
						"address": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Validation failed for field: email -> The parameter 'email' failed due to: instance contains duplicate item");
			done();
		});
	});
});



//S3

describe("Testing hello in S3", function() {
	it("fails since no access token is present", function (done) {
		
		helper.requester("get", {
			uri: 'http://dev-api.mydomain.com/jsconf3/hello?email=team@soajs.org',
			headers:{key:"9ee308d7b67d2e58a8770b99c8c0320c8d7262a72fc9516e09395bfa39f91b95190bfde9986f4e902ad5ba9de35573dbc5d087c1699c36632c1fccb91663c77529f633c8247366074d399ab326bfdeaa7211ce8c63b968c73cea7aab46296629"},
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Error occurred while redirecting your request to the service");
			done();
		});
	});
});

describe("Getting oAuth token", function() {
	it("passes, providing us with the access token", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/oauth/token',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857",
					Authorization: "Basic NTcxMjAxMTAxZWJmMzQwNDFjMGIwNjI3Om9hdXRoc2VjcmV0"},
			body:null,
			form:  {
				username: "myuser",
				password: "password",
				grant_type: "password"
			}
		}, function (err, body) {
			assert.ifError(err);
			assert.ok(body);
			access_token = body.access_token;
			done();
		});
	});
});

describe("Testing hello in S3 again", function() {
	it("passes since access token is now present", function (done) {
		
		helper.requester("get", {
			uri: 'http://dev-api.mydomain.com/jsconf3/hello?email=team@soajs.org&access_token=' + access_token,
			headers:{key:"9ee308d7b67d2e58a8770b99c8c0320c8d7262a72fc9516e09395bfa39f91b95190bfde9986f4e902ad5ba9de35573dbc5d087c1699c36632c1fccb91663c77529f633c8247366074d399ab326bfdeaa7211ce8c63b968c73cea7aab46296629"},
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, "John Doe \<team@soajs.org> ");
			done();
		});
	});
});

describe("Testing /standalone/add in S3", function() {
	it("fails since input key email is not in imfv", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf3/standalone/add',
			headers:{key:"9ee308d7b67d2e58a8770b99c8c0320c8d7262a72fc9516e09395bfa39f91b95190bfde9986f4e902ad5ba9de35573dbc5d087c1699c36632c1fccb91663c77529f633c8247366074d399ab326bfdeaa7211ce8c63b968c73cea7aab46296629"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"email": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null,
			qs: {access_token: access_token}
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Error occurred while redirecting your request to the service");
			done();
		});
	});
});

describe("Testing /standalone/add in S3 again", function() {
	it("passes since tenant key is present and all input is valid", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf3/standalone/add',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"address": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null,
			qs: {access_token: access_token}
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, true);
			done();
		});
	});
});

describe("Testing /standalone/add in S3 once again", function() {
	it("fails since duplicate data is in body", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf3/standalone/add',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"address": "team@soajs.org",
						"primary": true
					},
					{
						"address": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null,
			qs: {access_token: access_token}
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Validation failed for field: email -> The parameter 'email' failed due to: instance contains duplicate item");
			done();
		});
	});
});




//S4

describe("Testing /multi/add in S4", function() {
	it("passes with key of tenant 1", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf4/multi/add',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: {
				"username": "mike",
				"email":[
					{
						"address":"team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, true);
			done();
		});
	});
});

describe("Testing /multi/add in S4", function() {
	it("passes with key of tenant 2", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf4/multi/add',
			headers:{key:"d1e3b418bb1a18f35954c590d0cf06ff2c255e7ba90b415f0dd0e6c426577a34f5faf726ddea8c4325f4b287f8915b8d82ec5f6af74c4f30fc9b295bc80edd8143ed046dafb0b66727eb6e7b55680dea1b5995fec3d14b6d03f7acbc5e78b87e"},
			body: {
				"username": "mike",
				"email":[
					{
						"address":"team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, true);
			done();
		});
	});
});

describe("Testing /hybrid in S4", function() {
	it("passes, returns message", function (done) {
		
		helper.requester("get", {
			uri: 'http://dev-api.mydomain.com/jsconf4/hybrid',
			headers:{key:"9ee308d7b67d2e58a8770b99c8c0320c8d7262a72fc9516e09395bfa39f91b95190bfde9986f4e902ad5ba9de35573dbc5d087c1699c36632c1fccb91663c77529f633c8247366074d399ab326bfdeaa7211ce8c63b968c73cea7aab46296629"},
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, "Hello i am a message!");
			done();
		});
	});
});

describe("Testing /hybrid in S4", function() {
	it("passes, returns name of user", function (done) {
		
		helper.requester("get", {
			uri: 'http://dev-api.mydomain.com/jsconf4/hybrid',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, "mike");
			done();
		});
	});
});

describe("Testing /hybrid in S4", function() {
	it("passes, returns name of user and email", function (done) {
		
		helper.requester("get", {
			uri: 'http://dev-api.mydomain.com/jsconf4/hybrid',
			headers:{key:"d1e3b418bb1a18f35954c590d0cf06ff2c255e7ba90b415f0dd0e6c426577a34f5faf726ddea8c4325f4b287f8915b8d82ec5f6af74c4f30fc9b295bc80edd8143ed046dafb0b66727eb6e7b55680dea1b5995fec3d14b6d03f7acbc5e78b87e"},
			body: null,
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data.name, "mike");
			assert.equal(body.data.email, "team@soajs.org");
			done();
		});
	});
});

describe("Testing /standalone/add in S4", function() {
	it("fails since input key email is not in imfv", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf4/standalone/add',
			headers:{key:"9ee308d7b67d2e58a8770b99c8c0320c8d7262a72fc9516e09395bfa39f91b95190bfde9986f4e902ad5ba9de35573dbc5d087c1699c36632c1fccb91663c77529f633c8247366074d399ab326bfdeaa7211ce8c63b968c73cea7aab46296629"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"email": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Error occurred while redirecting your request to the service");
			done();
		});
	});
});
describe("Testing /standalone/add in S4 again", function() {
	it("passes since tenant key is present and all input is valid", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf4/standalone/add',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"address": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,true);
			assert.equal(body.data, true);
			done();
		});
	});
});

describe("Testing /standalone/add in S4 once again", function() {
	it("fails since duplicate data is in body", function (done) {
		
		helper.requester("post", {
			uri: 'http://dev-api.mydomain.com/jsconf4/standalone/add',
			headers:{key:"4f9b4dbc4c8178a3983b8c0d42cd42d30e63f910ac5e4e51843b542c34d1f6790eda4c8b425470cb71ad6eed58787f59d1b9d8abd9cb43ddc1086641779752348c436a5e6d79c74b2aa59feaf4ecf1db868c7f77383d33b30208c8e31729b857"},
			body: {
				"name": "Mike Hajj",
				"username": "mike",
				"email":[
					{
						"address": "team@soajs.org",
						"primary": true
					},
					{
						"address": "team@soajs.org",
						"primary": true
					}
				]
			},
			form: null
		}, function (err, body) {
			assert.ifError(err);
			assert.equal(body.result,false);
			assert.equal(body.errors.details[0].message, "Validation failed for field: email -> The parameter 'email' failed due to: instance contains duplicate item");
			done();
		});
	});
});
