"use strict";
var homepageApp = jsConfApp.components;

homepageApp.controller('homepageCtrl', ['$scope', 'homepageSrv', function ($scope, homepageSrv) {

	$scope.message = "";

	$scope.getInfo = function (formData) {
		//call service & connect to cloud
		homepageSrv.connect($scope, formData);
	};

	$scope.initHomepage = function(){
		var form = {
			name: 'addEnvironment',
			// label: $scope.translate.form[LANG],
			entries: homepageConfig.form,
			actions: [
				{
					'type': 'submit',
					'label': $scope.translate.submit[LANG],
					'btn': 'primary',
					'action': function (formData) {
						$scope.getInfo(formData);
					}
				}
			]
		};

		buildForm($scope, null, form);
	};

	$scope.initHomepage();
}]);

