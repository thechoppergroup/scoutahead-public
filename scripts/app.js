var app = angular.module( 'app', [
	'ngRoute',
	'ui.router',
	'adaptive.detection',
	'aj.controllers',
	'aj.directives',
	'aj.filters',
	'app.controllers',
	'app.filters',
	'app.directives',
	], function($interpolateProvider) {
	  $interpolateProvider.startSymbol('[[');
	  $interpolateProvider.endSymbol(']]');
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('page',{
		url: '/*path',
		controller: 'homeCtrl',
		templateUrl: function ($stateParams){
			if($stateParams.path) {
				return $stateParams.path;
			} else {
				return base+'home'
			}
  	}
	})
	$urlRouterProvider.otherwise('/');
});