myapp.controller('AdminUserCtrl', function ($scope, $http, $rootScope, $location, $window, UserService, AuthenticationService) {
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

myapp.controller('ProfileCtrl', function ($scope, $http) {
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
