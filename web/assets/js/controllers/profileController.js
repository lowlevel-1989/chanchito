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
        function(data) {}
    );

});