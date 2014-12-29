myApp.controller('tagsController', function ($scope) {
	$scope.tabs = [
		{
			"title": "Home",
			"url"  : ""
		},
		{
			"title": "Withdraw",
			"url"  : "web/dist/templates/withdraw.min.html"
		},
		{
			"title": "Deposit",
			"url"  : "web/dist/templates/deposit.min.html"
		},
		{
			"title": "Movements",
			"url"  : "web/dist/templates/movements.min.html"
		}
	];

	$scope.currentTab = '';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
});