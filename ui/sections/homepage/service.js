"use strict";
var homepageApp = jsConfApp.components;

homepageApp.service('homepageSrv', ['ngDataApi', function (ngDataApi) {

	function connect (currentScope, data) {
		currentScope.message = "";

		getSendDataFromServer(currentScope, ngDataApi, {
			'method': 'get',
			'routeName': '/jsconf1/hello',
			'params': {
				'name': data.name,
				'email': data.email
			}
		}, function (error, response) {

			if (error) {
				currentScope.$parent.displayAlert('danger', error.message);
			} else {
				currentScope.message = response.data;
			}
		});
	}

	return {
		"connect": connect
	}
}]);

