myApp.controller('MovementsCtrl', function ($scope, $http) {
    
});
myApp.controller('DepositoCtrl', function ($scope, $http) {
    $scope.insertDeposit = function(){
        if (username !== undefined && password !== undefined) {
            var request = $http({
                method: 'post',
                url: 'http://localhost:8000/api/users/', 
                data: {username: username, email: email, password: password}
            });

            request.success(
                function(data) {
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
        }
        else{
            data = {
                detail: ["Complete the fields"]
            };
           
            $scope.error = data;
        }
        
    }
});
myApp.controller('TabsMovementsCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'Depositos', content:'web/dist/templates/working.min.html' },
    { title:'Retiros', content:'web/dist/templates/home.min.html' }
  ];
});