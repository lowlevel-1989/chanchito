(function(){

    var logIn = angular.module('chanchito.logInController', []);

    logIn.controller('loginController', [ 
    '$http', '$location', '$window', 'UserService', 'AuthenticationService',
    function ($http, $location, $window, UserService, AuthenticationService) {
        this.logIn = function (username, password) {
            if (username !== undefined && password !== undefined) {
                UserService.logIn(username, password).success(function(data) {
                    AuthenticationService.isAuthenticated  = true;
                    $window.sessionStorage.isAuthenticated = true;
                    $window.sessionStorage.token           = data.token;
                    $location.path('/home');
                }).error(function(status, data) {
                    this.error = true;
                });
            }
        };

       this.logOut = function (){
            if (AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = false;
                delete $window.sessionStorage.isAuthenticated;
                delete $window.sessionStorage.token;
                $location.path('/');
            }
        };
    }]);

})();