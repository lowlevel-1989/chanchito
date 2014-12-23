myapp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

myapp.config(function ($routeProvider) {
    // Router
    $routeProvider.when('/working', {
    	templateUrl: 'web/templates/working.html',
        access: { requiredLogin: false }
    })
    .when('/login', {
        templateUrl: 'web/templates/login.html',
        controller: 'AdminUserCtrl',
        access: { requiredLogin: false }
    })
    .when('/home', {
        templateUrl: 'web/templates/home.html',
        controller: 'ProfileCtrl',
        access: { requiredLogin: true }
    })
    .when('/logout/', {
        templateUrl: 'web/templates/logout.html',
        controller: 'AdminUserCtrl',
        access: { requiredLogin: true }
    })
    .otherwise({
    	redirectTo: '/working'
    });
});

myapp.run(function ($rootScope, $location, $window, AuthenticationService) {
    AuthenticationService.isAuthenticated = $window.sessionStorage.isAuthenticated;
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
    try {
        if ($location.path() == '/' && AuthenticationService.isAuthenticated){
            $location.path('/home/');
        }

        if (nextRoute.access.requiredLogin && !AuthenticationService.isAuthenticated) {
            $location.path('/');
        }
    }
    catch(err) {
        console.log('Redirect: #/');
    }

    });
});