'use strict';

var index = 0;
(function () {
	var link = document.createElement("script");
	link.type = "text/javascript";
	link.src = "themes/" + themeToUse + "/bootstrap.js";
	document.getElementsByTagName("head")[0].appendChild(link);
})();

/* App Module */
var mkplApp = angular.module('mkplApp', ['ui.bootstrap', 'ngRoute', 'ngCookies', 'ngStorage', 'ngSanitize']);
mkplApp.config([
	'$routeProvider',
	'$controllerProvider',
	'$compileProvider',
	'$filterProvider',
	'$provide',
	'$sceDelegateProvider',
	function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $sceDelegateProvider) {
		mkplApp.compileProvider = $compileProvider;

		var whitelisted = ['self'];
		whitelisted = whitelisted.concat(whitelistedDomain);
		$sceDelegateProvider.resourceUrlWhitelist(whitelisted);

		navigation.forEach(function (navigationEntry) {
			if (navigationEntry.scripts && navigationEntry.scripts.length > 0) {
				$routeProvider.when(navigationEntry.url.replace('#', ''), {
					templateUrl: navigationEntry.tplPath,
					resolve: {
						load: ['$q', '$rootScope', function ($q, $rootScope) {
							var deferred = $q.defer();
							require(navigationEntry.scripts, function () {
								$rootScope.$apply(function () {
									deferred.resolve();
								});
							});
							return deferred.promise;
						}]
					}
				});
			}
			else {
				$routeProvider.when(navigationEntry.url.replace('#', ''), {
					templateUrl: navigationEntry.tplPath
				});
			}
		});

		$routeProvider.otherwise({
			redirectTo: navigation[0].url.replace('#', '')
		});

		mkplApp.components = {
			controller: $controllerProvider.register,
			service: $provide.service
		};

	}
]);

mkplApp.controller('mkplAppController', ['$scope', '$location', '$timeout', '$route', '$cookies', '$cookieStore', 'ngDataApi', '$localStorage', '$routeParams',
	function ($scope, $location, $timeout, $route, $cookies, $cookieStore, ngDataApi, $localStorage, $routeParams) {
		$scope.enableInterface = false;
		$scope.currentLocation = '';

		$scope.go = function (path) {
			$location.path(path);
		};

		$scope.alerts = [];
		$scope.themeToUse = themeToUse;
		$scope.translate = translate;

		$scope.LANG = LANG;

		$scope.displayFixedAlert = function (type, msg) {
			$scope.alerts = [];
			$scope.alerts.push({'type': type, 'msg': msg});
		};

		$scope.clearAlert = function () {
			overlay.hideMessage();
		};

		$scope.displayAlert = function (type, msg, isCode, service) {
			if (isCode) {
				if (errorCodes[service] && errorCodes[service][msg] && errorCodes[service][msg][LANG]) {
					msg = errorCodes[service][msg][LANG];
				}
			}
			overlay.showMessage(msg, type);
		};

		$scope.pushAlert = function (type, msg) {
			$scope.alerts.push({'type': type, 'msg': msg});
			$scope.closeAllAlerts();
		};

		$scope.closeAlert = function (index) {
			$scope.alerts.splice(index, 1);
		};

		$scope.closeAllAlerts = function () {
			$timeout(function () {
				$scope.alerts = [];
			}, 10000);
		};

		$scope.$on('$routeChangeSuccess', function () {
			$scope.currentLocation = $location.path();

			if ($routeParams) {
				for (var m in $routeParams) {
					$scope.currentLocation = $scope.currentLocation.replace('/' + $routeParams[m], '');
				}
			}
			var title = '';
			for (var entry = 0; entry < navigation.length; entry++) {
				var urlOnly = navigation[entry].url.replace('/:id', '');
				if (urlOnly === '#' + $scope.currentLocation) {
					if (navigation[entry].title && navigation[entry].title !== '') {
						title = navigation[entry].title;
						break;
					}
				}
			}

			jQuery('head title').html(title);

		});

	}]);



mkplApp.directive('overlay', function () {
	return {
		restrict: 'E',
		templateUrl: 'themes/' + themeToUse + '/directives/overlay.tmpl'
	};
});

mkplApp.directive('header', function () {
	return {
		restrict: 'E',
		templateUrl: 'themes/' + themeToUse + '/directives/header.tmpl'
	};
});

mkplApp.directive('content', function () {
	return {
		restrict: 'E',
		templateUrl: 'themes/' + themeToUse + '/directives/content.tmpl'
	};
});

mkplApp.directive('footer', function () {
	return {
		restrict: 'E',
		templateUrl: 'themes/' + themeToUse + '/directives/footer.tmpl'
	};
});

mkplApp.directive('productBlock', function () {
	return {
		restrict: 'E',
		templateUrl: 'themes/' + themeToUse + '/directives/productBlock.tmpl'
	};
});


mkplApp.directive('ngConfirmClick', [
	function () {
		return {
			priority: -1,
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.bind('click', function (e) {
					var message = attrs.ngConfirmClick;
					if (message && !confirm(message)) {
						e.stopImmediatePropagation();
						e.preventDefault();
					}
				});
			}
		}
	}
]);

var overlay = {
	show: function () {
		var overlayHeight = jQuery(document).height();
		jQuery("#overlay").css('height', overlayHeight + 'px').show();
		jQuery("#overlay .bg").css('height', overlayHeight + 'px').show(100);
		jQuery("#overlay .content").show();
	},
	hide: function (cb) {
		jQuery("#overlay .content").hide();
		jQuery("#overlay").fadeOut(200);
		if (cb && typeof(cb) === 'function') {
			cb();
		}
	},
	showMessage: function (str) {
		var overlayHeight = jQuery(document).height();
		jQuery("#notificationMessages").css('height', overlayHeight + 'px').show();
		jQuery("#notificationMessages .bg").css('height', overlayHeight + 'px').show(100);
		jQuery('#notificationMessages .content .customMessage').html(str);
		jQuery("#notificationMessages .content").show();
		// customMessage
	},
	hideMessage: function (cb) {
		jQuery("#notificationMessages .content").hide();
		jQuery("#notificationMessages").fadeOut(200);
		if (cb && typeof(cb) === 'function') {
			cb();
		}
	}
};