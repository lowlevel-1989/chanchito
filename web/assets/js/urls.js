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
        access: { requiredLogin: true }
    })
    .when('/logout', {
        template: '{{ logOut() }}',
        controller: 'loginController',
        access: { requiredLogin: true }
    })
    .otherwise({
    	redirectTo: '/working'
    });
});