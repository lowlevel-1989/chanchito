(function(){
    
    var url = angular.module('chanchito.urls', ['ngRoute']);
    
    url.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/working', {
            templateUrl: 'web/dist/templates/working.min.html',
            access: { requiredLogin: false }
        })
        .when('/login', {
            templateUrl: 'web/dist/templates/login.min.html',
            controller: 'loginController as logInCtrl',
            access: { requiredLogin: false }
        })
        .when('/home', {
            templateUrl: 'web/dist/templates/home.min.html',
            access: { requiredLogin: true }
        })
        .otherwise({
            redirectTo: '/working'
        });
    }]);

})();