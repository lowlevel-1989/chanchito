(function(){
    
    var tab = angular.module('chanchito.tabsController', []);

    tab.controller('tabsController', function () {
		this.tabs = [
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

		this.currentTab = '';

	    this.onClickTab = function (tab) {
	        this.currentTab = tab.url;
	    }
	    
	    this.isActiveTab = function(tabUrl) {
	        return tabUrl == this.currentTab;
	    }
	});

})();