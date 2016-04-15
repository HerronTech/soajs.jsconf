"use strict";
/*
 common function calls ngDataAPI angular service to connect and send/get data to api
 */
function getSendDataFromServer($scope, ngDataApi, options, callback) {
	var apiOptions = {
		url: (options.url) ? options.url + options.routeName : apiConfiguration.domain + options.routeName,
		headers: {
			'Content-Type': 'application/json',
			'key': apiConfiguration.key
		}
	};

	if (options.jsonp) {
		apiOptions.jsonp = true;
	}

	if (options.params) {
		apiOptions.params = options.params;
	}

	if (options.data) {
		apiOptions.data = options.data;
	}

	if (options.method) {
		apiOptions.method = options.method;
	}

	if (options.headers) {
		for (var i in options.headers) {
			if (options.headers.hasOwnProperty(i)) {
				apiOptions.headers[i] = options.headers[i];
			}
		}
	}

	ngDataApi[options.method]($scope, apiOptions, callback);

}