var app = angular.module( 'app', [
	'ngRoute',
	'ui.router',
	'adaptive.detection',
	'app.controllers',
	'app.filters',
	'app.directives'
	], function($interpolateProvider) {
	  $interpolateProvider.startSymbol('[[');
	  $interpolateProvider.endSymbol(']]');
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	// route to show our basic form (/form)
	.state('page',{
		url: '/*path',
		controller: 'homeCtrl',
		templateUrl: function ($stateParams){
			if($stateParams.path) {
				return $stateParams.path;
			} else {
				return base+'/home/index.html'
			}
  	}
	})
	$urlRouterProvider.otherwise('/');
});