'use strict';

module.exports = {
	type: 'service',
	prerequisites: {
		cpu: '',
		memory: ''
	},
	serviceVersion: 1,
    serviceName: "jsconf3",
    serviceGroup: "JSConf",
    servicePort: 4113,
    requestTimeout: 30,
    requestTimeoutRenewal: 5,
    extKeyRequired: true,
	oauth: true,
    "errors": {
	    600: "Database Error"
    },
    "schema": {
        "/hello": {
            "_apiInfo": {
                "l": "Hello World",
                "group": "Hello",
                "groupMain": true
            },
	        "name": {
		        "source": ['query.name'],
		        "required": false,
		        "default": "John Doe",
		        "validation": {
			        "type": "string"
		        }
	        },
            "email": {
                "source": ['query.email'],
                "required": true,
                "validation": {
                    "type": "string",
                    "format": "email"
                }
            }
        },
	    "/standalone/add": {
		    "_apiInfo":{
			    "l": "Add Info to Standalone DB",
			    "group": "Information",
			    "groupMain": true
		    },
		    "username": {
			    "source": ['body.username'],
			    "required": true,
			    "validation": {
				    "type": "string",
				    "minLength": 4,
				    "maxLength": 8,
				    "pattern": /^[a-zA-Z][0-9a-zA-Z_\-]+$/
			    }
		    },
		    "name": {
			    "source": ['body.name'],
			    "required": false,
			    "default": "anonymous",
			    "validation": {
				    "type": "string"
			    }
		    },
		    "email": {
			    "source": ['body.email'],
			    "required": true,
			    "validation": {
				    "type": "array",
				    "items": {
					    "type": "object",
					    "properties": {
						    "address": {"type": "string", "format": "email", "required": true},
						    "primary": {"type": "boolean", "required": true}
					    }
				    },
				    "minItems": 1,
				    "maxItems": 5,
				    "uniqueItems": true
			    }
		    }
	    }
    }
};