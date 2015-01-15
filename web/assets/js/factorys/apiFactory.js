(function(){

	var api = angular.module('chanchito.apiFactory', []);

	api.factory('chanchitoApi', function() {
		return {
			host: 'http://formatcom.alwaysdata.net/chanchito/api/'
		};
	});

})();