
Js.States = {
  "/": {
    templateUrl: '/pages/index.html'
  },
  "/about": {
    templateUrl: '/pages/about.html'
  }
}


Js.Behaviors.load = function(container){
  var hash = window.location.hash;
  var state = hash.slice(1, window.location.hash.length);
  console.log(state);
  
  Js._request(Js.States[state].templateUrl, function(result){
    Js.Views.successTwo.render(result);
  });
}
