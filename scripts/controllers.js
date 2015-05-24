angular.module('app.controllers', [])

	.controller('homeCtrl', function($scope, $rootScope, $location, $stateParams, $detection) {
    $scope.posts = posts;
    $scope.post = 0;
    console.log($detection.isiOS());
    $detection.isAndroid();
    $detection.isiOS();
    $detection.isWindowsPhone();
    $detection.isBB10();
  })

  .controller('paginator', function($scope, $rootScope, $location, $stateParams){
    $scope.$on('$viewContentLoaded', function() {
      if($stateParams.p <= $scope.pageMax ) {
        console.log($scope.pageMax);
        $scope.current = $stateParams.p;
        _setPage($scope.current);
      } else {
        $scope.current =1;
        _setPage($scope.current);
      }
    });
    

    $scope.paginate = function(index) {
      if (index <= $scope.pagination)
        return true;
    }

    $scope.pageIndex = function(num) {
      var pages = []; 

      for (var i = 1; i <= num; i++) { 
          pages.push(i) 
      } 

      return pages;
    }

    $scope.pageTo = function(page) {
      $scope.current = page;
      _setPage($scope.current);
    }

    $scope.show = function(page) {
      if($scope.current == page)
        return true;
    }

    $scope.nextPage = function() {
      if($scope.current < $scope.pageMax){
        console.log($scope.pageMax);
        $scope.current ++;
      }
        _setPage($scope.current);
    }

    $scope.prevPage = function() {
      if($scope.current > 1) {
        $scope.current --;
      }
        _setPage($scope.current);
    }

    function _setPage(p) {
      $location.search('p', p);
    }
  })

  .controller('disqusCtrl', function(){
  	/* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = '50wordsaday';
    
    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  })
;
