var myApp = angular.module('chanchitoApp', ['ngRoute']);
myApp.factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false
    }
    return auth;
});

myApp.factory('UserService', function ($http) {
    return {
        logIn: function(username, password) {
            return $http({
                method: 'post',
                url: 'http://formatcom.alwaysdata.net/chanchito/api/token/', 
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
        controller: 'AdminUserCtrl',
        access: { requiredLogin: false }
    })
    .when('/home', {
        templateUrl: 'web/dist/templates/home.min.html',
        controller: 'ProfileCtrl',
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
        if ($location.path() == '/' && AuthenticationService.isAuthenticated){
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
myApp.controller('AdminUserCtrl', function ($scope, $http, $rootScope, $location, $window, UserService, AuthenticationService) {
    //Admin User Controller (login, logout)
    $scope.logIn = function (username, password) {
        if (username !== undefined && password !== undefined) {
            UserService.logIn(username, password).success(function(data) {
                AuthenticationService.isAuthenticated  = true;
                $window.sessionStorage.isAuthenticated = true;
                $window.sessionStorage.token           = data.token;
                $location.path('/home');
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
        else{
            data = {
                detail: ["Complete the fields"]
            };
            $scope.isDisabled = true;
            $scope.error = data;
        }
    };

   $scope.logOut = function (){
        if (AuthenticationService.isAuthenticated) {
            AuthenticationService.isAuthenticated = false;
            delete $window.sessionStorage.isAuthenticated;
            delete $window.sessionStorage.token;
            $location.path('/login');
        }
    };

    $scope.focusInput = function (){
         $scope.isDisabled = false;
    };
});

myApp.controller('ProfileCtrl', function ($scope, $http) {
    $scope.user = [];
    var request = $http({
        method: 'get',
        url: 'http://formatcom.alwaysdata.net/chanchito/api/token/user/'
    });

    request.success(
        function(data) {
            $scope.user = data;
            console.log('success');
            console.log(data);
        }
    );

    request.error(
        function(data) {
            console.log('error');
            console.log(data);
        }
    );

});

myApp.controller('MovementsCtrl', function ($scope, $http) {
    
});
myApp.controller('DepositoCtrl', function ($scope, $http) {
    $scope.insertDeposit = function(){
        if (username !== undefined && password !== undefined) {
            var request = $http({
                method: 'post',
                url: 'http://localhost:8000/api/users/', 
                data: {username: username, email: email, password: password}
            });

            request.success(
                function(data) {
                    console.log("success");
                    console.log(data);
                }
            );

            request.error(
                function(data) {
                    $scope.error = data;
                    console.log("error");
                                    }
            );
        }
        else{
            data = {
                detail: ["Complete the fields"]
            };
           
            $scope.error = data;
        }
        
    }
});
myApp.controller('TabsMovementsCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'Depositos', content:'web/dist/templates/working.min.html' },
    { title:'Retiros', content:'web/dist/templates/home.min.html' }
  ];
});