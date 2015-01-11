(function(){

    var profile = angular.module('chanchito.profileController', []);

    profile.controller('profileController', ['$http', 'chanchitoApi', 
    function ($http, chanchitoApi) {
        self = this;
        var request = $http({
            method: 'get',
            url: chanchitoApi.host+'token/user/'
        });

        request.success(
            function(data) {
                self.user = data;
            }
        );

        request.error(
            function(data) {
                //data contiene la informacion del error
            }
        );
    }]);

})();