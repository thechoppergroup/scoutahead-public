var Js = window.Js || {};
Js.Behaviors = {};
Js.Views = {};
Js.Data = {};

// Ready function
Js.Ready = function(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// HTTP Request
Js._request = function(url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      if( typeof cb === 'function' ) {
        cb(request.responseText);
      }
    } else {
      console.log(request);
    }
  };

  request.onerror = function(msg) {
    console.log(msg);
  };
  request.send();
}


// Loops through the data-behavior creates a instance of a function based the values it finds
Js._init = function (context) {
  if (!context) {
    context = document;
  }

  // Views
  var views = context.querySelectorAll('[data-view]');

  // Views Loop
  for(i=0; i<views.length; i++) {
    var view = views[i];
    var states = view.getAttribute('data-view').split(' ');
    for(j=0; j<states.length; j++) {
      var state = states[j];
      console.log(state);
      Js.Views[state] = new _view(view);
    }
  }

  // Elements
  var elements = context.querySelectorAll('[data-behavior]');

  // Elements Loop
  for(i=0; i<elements.length; i++) {
    var element = elements[i];
    var behaviors = element.getAttribute('data-behavior').split(' ');
    for(j=0; j<behaviors.length; j++) {
      var behavior = behaviors[j];
      if(!element[behavior]) {
        try {
          element[behavior] = new Js.Behaviors[behavior](element);
        } catch (e) {
          console.log(e.stack);
        }
      }
    }
  }
}


// Runs initializeBehaviors after DOM Ready
Js.Ready(function(){
  var start = +new Date();
  Js._init();
  var end =  +new Date();  // log end timestamp
  var diff = end - start;
  console.log(diff/1000);
});

function _render(params){
  if(params.template) {
    Js._request(params.template, function(result){
      if(params.data && Handlebars) {
        var template = Handlebars.compile(result);
        params.view.innerHTML(template(params.data));
      } else {
        params.view.innerHTML(result);
      }
    });
  }
}

//Returns true if it is a DOM element
function _isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

// View container
function _view(view) {
  view.render = function(d){
    if(d) {
			var range = document.createRange();
			var frag = range.createContextualFragment(d);
			Js._init(frag);

			if(view.hasChildNodes())
				view.innerHTML = "";

      view.appendChild(frag);
    }
  }
  return view;
}

// Check if has a class
Js._hasClass = function(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add a class
Js._addClass = function(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

// Remove a class
Js._removeClass = function(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

// Find Closest Element
Js._closest = function(el, selector) {
  var matchesFn;
  ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
    if (typeof document.body[fn] == 'function') {
        matchesFn = fn;
        return true;
    }
    return false;
  })
  var parent;

  // traverse parents
  while (el) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
        return parent;
    }
    el = parent;
  }
  return null;
}

Js._throttle = function(callback, limit) {
  var wait = false;                  // Initially, we're not waiting
  return function () {               // We return a throttled function
    if (!wait) {                   // If we're not waiting
      callback.call();           // Execute users function
      wait = true;               // Prevent future invocations
      setTimeout(function () {   // After a period of time
          wait = false;          // And allow future invocations
      }, limit);
    }
  }
}
