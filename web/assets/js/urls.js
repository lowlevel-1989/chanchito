module.exports = function(app){
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    });

    app.config(function ($routeProvider) {
        // Router
        $routeProvider.when('/working', {
        	templateUrl: 'web/dist/templates/working.min.html',
            access: { requiredLogin: false }
        })
        .when('/login', {
            templateUrl: 'web/dist/templates/login.min.html',
            controller: 'AdminUserCtrl',
            access: { requiredLogin: false }
        })
        .when('/home', {
            templateUrl: 'web/dist/templates/home.min.html',
            controller: 'ProfileCtrl',
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

    app.run(function ($rootScope, $location, $window, AuthenticationService) {
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
};