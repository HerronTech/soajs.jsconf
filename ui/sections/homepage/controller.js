"use strict";
var homepageApp = mkplApp.components;

homepageApp.controller('homepageCtrl', ['$scope', 'ngDataApi', function ($scope, ngDataApi) {

	$scope.message = "";

	$scope.getInfo = function () {

		getSendDataFromServer($scope, ngDataApi, {
			'method': 'get',
			'routeName': '/jsconfadvanced/getInfo',
			'params': {
				'email': $scope.email.address
			}
		}, function (error, response) {

			if (error) {
				$scope.$parent.displayAlert('danger', error.message);
			} else {
				$scope.message = response.data;
			}
		});
	};

	console.log(JSON.stringify(myConfig, null, 2));
}]);

