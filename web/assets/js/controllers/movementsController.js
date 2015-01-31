(function(){

    var movements = angular.module('chanchito.movementsController', []);

    movements.controller('movementsController', ['$scope', '$http', 'chanchitoApi',
    function ($scope, $http, chanchitoApi) {
		$scope.serializerDeposit = {};

		$scope.successDeposit = false;

		this.changeDeposit = function (){
			if ($scope.successDeposit)
				$scope.successDeposit = false;
		}

		this.deposit = function (){
			var request = $http({
			    method: 'post',
			    url: chanchitoApi.host+'movements/',
			    data: this.serializerDeposit
			});

			request.success(
			    function(data) {
			    	$scope.successDeposit = true;
					$scope.serializerDeposit = {};
					console.log(data);
			    }
			);

			request.error(
			    function(data) {
					console.log(data);
			    }
			);
	    };
	}]);

})();