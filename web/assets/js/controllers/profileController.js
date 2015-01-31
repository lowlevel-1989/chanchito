(function(){

    var profile = angular.module('chanchito.profileController', []);

    profile.controller('profileController', ['$scope', '$http', 'chanchitoApi', 
    function ($scope, $http, chanchitoApi) {
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
    }]);

})();