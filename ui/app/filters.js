"use strict";

jsConfApp.filter('fulldate', function () {
	return function (text) {
		if (!text) {
			return '';
		}
		return new Date(text).toISOString();
	};
});

jsConfApp.filter('toTrustedHtml', ['$sce', function ($sce) {
	return function (text) {
		return $sce.trustAsHtml(text);
	};
}]);

jsConfApp.filter('trimmed', function () {
	function hed(text) {
		if (!text) {
			return "";
		}
		return text.replace(/(<([^>]+)>)/ig, "").toString();
	}

	return function (value, length) {
		value = hed(value);
		if (!length) {
			length = 70
		}
		if (value.length > length) {
			value = value.slice(0, length) + "...";
		}
		return value;
	};
});
