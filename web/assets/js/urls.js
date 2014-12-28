myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

myApp.config(function ($routeProvider) {
    // Router
    $routeProvider.when('/working', {
    	templateUrl: 'web/dist/templates/working.min.html',
        access: { requiredLogin: false }
    })
    .when('/login', {
        templateUrl: 'web/dist/templates/login.min.html',
        controller: 'loginController',
        access: { requiredLogin: false }
    })
    .when('/home', {
        templateUrl: 'web/dist/templates/home.min.html',
        controller: 'profileController',
        access: { requiredLogin: true }
    })
    .when('/deposito', {
        templateUrl: 'web/dist/templates/depositos.min.html',
        controller: 'DepositoCtrl',
        access: { requiredLogin: true }
    })
    .when('/retiro', {
        templateUrl: 'web/dist/templates/retiros.min.html',
        access: { requiredLogin: true }
    })
    .when('/movements', {
        templateUrl: 'web/dist/templates/movements.min.html',
        access: { requiredLogin: true }
    })
    .when('/logout/', {
        templateUrl: 'web/dist/templates/logout.min.html',
        controller: 'AdminUserCtrl',
        access: { requiredLogin: true }
    })
    .otherwise({
    	redirectTo: '/working'
    });
});

myApp.run(function ($rootScope, $location, $window, AuthenticationService) {
    AuthenticationService.isAuthenticated = $window.sessionStorage.isAuthenticated;
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
    try {
        if (($location.path() == '/' || $location.path() == '/login') && AuthenticationService.isAuthenticated){
            $location.path('/home');
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