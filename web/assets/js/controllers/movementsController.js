(function(){

    var movements = angular.module('chanchito.movementsController', []);

    movements.controller('movementsController', ['$http', 'chanchitoApi',
    function ($http, chanchitoApi) {
		self = this;

		this.serializerDeposit = {};

		this.successDeposit = false;

		this.changeDeposit = function (){
			if (this.successDeposit)
				this.successDeposit = false;
		}

		this.deposit = function (){
			var request = $http({
			    method: 'post',
			    url: chanchitoApi.host+'movements/',
			    data: this.serializerDeposit
			});

			request.success(
			    function(data) {
			    	self.successDeposit = true;
					self.serializerDeposit = {};
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