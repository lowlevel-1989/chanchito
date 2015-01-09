(function(){
	angular.module('chanchito', ['ngRoute'])
	.run(function ($rootScope, $location, $window, AuthenticationService) {
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
	});
})();