'use strict';

module.exports = {
	type: 'service',
	prerequisites: {
		cpu: '',
		memory: ''
	},
	serviceVersion: 1,
    serviceName: "jsconf1",
    serviceGroup: "JSConf",
    servicePort: 4111,
    requestTimeout: 30,
    requestTimeoutRenewal: 5,
    extKeyRequired: false,
	oauth: false,
    "errors": {},
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
        }
    }
};