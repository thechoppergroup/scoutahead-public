angular.module('app.controllers', [])

	.controller('homeCtrl', function($scope, $rootScope) {

  })

  .controller('disqusCtrl', function($scope, $rootScope){
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