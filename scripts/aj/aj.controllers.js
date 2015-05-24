angular.module('aj.controllers', [])

	.controller('homeCtrl', function($scope, $rootScope, $location, $stateParams, $detection) {
    $scope.device = function() {
      if($detection.isAndroid() || $detection.isiOS() || $detection.isWindowsPhone() || $detection.isBB10()) {
        return "is-mobile";
      } else {
        return "is-desktop";
      }
    }    
  });
