(function(){
	
	var app = angular.module('chanchito', [
		'chanchito.urls',
		'chanchito.apiFactory',
		'chanchito.logInFactory',
		'chanchito.logInController',
		'chanchito.profileController',
		'chanchito.tabsController',
		'chanchito.movementsController'
	]);

	app.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('TokenInterceptor');
	}]);

	app.run(['$rootScope', '$location', '$window', 'AuthenticationService',
	function ($rootScope, $location, $window, AuthenticationService) {
		AuthenticationService.isAuthenticated = $window.sessionStorage.isAuthenticated;
		$rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
			try {
				if (($location.path() === '/' || $location.path() === '/login') 
				&& AuthenticationService.isAuthenticated){
						
					$location.path('/home');
				}

				if (nextRoute.access.requiredLogin && !AuthenticationService.isAuthenticated) {
					$location.path('/');
				}
			}catch(err) {
				console.log('Redirect: #/');
			}
		});
	}]);

})();