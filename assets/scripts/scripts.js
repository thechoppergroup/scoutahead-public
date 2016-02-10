
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

Js.Behaviors.openMenu = function(container) {
  var $this = $(container);
  var target = $this.attr('data-target');
  var header = document.getElementsByClassName('js-header');
  target = $('.' + target);

  $(container).on('click', function(){
    target.addClass('is-open');
  });
}

Js.Behaviors.menu = function(container) {
  $(container).on('click', '.js-close', function(){
    $(container).removeClass('is-open');
  });
}
