var myApp = angular.module('chanchito', ['ngRoute']);
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
    .when('/logout/', {
        template: '{{ logOut() }}',
        controller: 'loginController',
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
myApp.controller('loginController', function ($scope, $http, $location, $window, UserService, AuthenticationService) {
    $scope.logIn = function (username, password) {
        if (username !== undefined && password !== undefined) {
            UserService.logIn(username, password).success(function(data) {
                AuthenticationService.isAuthenticated  = true;
                $window.sessionStorage.isAuthenticated = true;
                $window.sessionStorage.token           = data.token;
                $location.path('/home');
            }).error(function(status, data) {
                $scope.error = true;
            });
        }
    };

   $scope.logOut = function (){
        if (AuthenticationService.isAuthenticated) {
            AuthenticationService.isAuthenticated = false;
            delete $window.sessionStorage.isAuthenticated;
            delete $window.sessionStorage.token;
            $location.path('/');
        }
    };
});


myApp.controller('profileController', function ($scope, $http, chanchitoApi) {
    var request = $http({
        method: 'get',
        url: chanchitoApi.host+'token/user/'
    });

    request.success(
        function(data) {
            $scope.user = data;
        }
    );

    request.error(
        function(data) {
            //data contiene la informacion del error
        }
    );

});
myApp.factory('chanchitoApi', function() {
    return {
        host: 'http://formatcom.alwaysdata.net/chanchito/api/'
    };
});
myApp.factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false
    }
    return auth;
});

myApp.factory('UserService', function ($http, chanchitoApi) {
    return {
        logIn: function(username, password) {
            return $http({
                method: 'post',
                url: chanchitoApi.host+'token/', 
                data: {username: username, password: password}
            });
        }
    }
});

myApp.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'token ' + $window.sessionStorage.token;
            }
            return config;
        },
 
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
         // Set Authentication.isAuthenticated to true if 200 received 
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },
 
         // Revoke client authentication if 401 is received 
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.isAuthenticated;
                AuthenticationService.isAuthenticated = false;
                $location.path('/');
            }
 
            return $q.reject(rejection);
        }
    };
});