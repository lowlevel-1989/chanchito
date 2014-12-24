(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var myApp = angular.module('chanchitoApp', ['ngRoute']);
require('./factorys.js')(myApp);
require('./controladores/adminctrluser.js')(myApp);
require('./urls.js')(myApp);
},{"./controladores/adminctrluser.js":2,"./factorys.js":3,"./urls.js":4}],2:[function(require,module,exports){
module.exports = function(app){
    app.controller('AdminUserCtrl', function ($scope, $http, $rootScope, $location, $window, UserService, AuthenticationService) {
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

    app.controller('ProfileCtrl', function ($scope, $http) {
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
};

},{}],3:[function(require,module,exports){
module.exports = function(app){
    app.factory('AuthenticationService', function() {
        var auth = {
            isAuthenticated: false
        }
        return auth;
    });

    app.factory('UserService', function ($http) {
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

    app.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
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
};
},{}],4:[function(require,module,exports){
module.exports = function(app){
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    });

    app.config(function ($routeProvider) {
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
},{}]},{},[1]);
