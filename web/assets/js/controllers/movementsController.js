myApp.controller('movementsController', function ($scope, $http, chanchitoApi) {
	$scope.deposit = function (amount, description){
		var request = $http({
		    method: 'post',
		    url: chanchitoApi.host+'movements/',
		    data: {amount: amount , description: description}
		});

		request.success(
		    function(data) {
		    	$scope.success = true;
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
    };
});