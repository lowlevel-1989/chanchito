var myApp = angular.module('chanchitoApp', ['ngRoute']);
require('./factorys.js')(myApp);
require('./controladores/adminctrluser.js')(myApp);
require('./urls.js')(myApp);