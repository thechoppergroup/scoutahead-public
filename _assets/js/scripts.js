Js.Dash.shuttle = function (container) {
  console.log(container)
  window.addEventListener('scroll', function () {
    container.style.top = window.pageYOffset + 'px';
  })
}


Js.Dash.load = function(container){
  var hash = window.location.hash;
  var state = hash.slice(1, window.location.hash.length);
  console.log(state);

  Js._request(Js.States[state].templateUrl, function(result){
    Js.Views.successTwo.render(result);
  });
}

Js.Dash.inputsCheck = function (container) {
  setInterval(function(){
    var inputs = container.querySelectorAll('input');
    Array.prototype.forEach.call(inputs, function(el, i){
      if(el.value !== '') {
        Js._addClass(el.parentNode, 'has-content')
      } else {
        Js._removeClass(el.parentNode, 'has-content')
      }

      el.addEventListener('focus', function (e) {
        if (!Js._hasClass(e.target.parentNode, 'has-focus')) {
          Js._addClass(e.target.parentNode, 'has-focus')
        }
      })

      el.addEventListener('blur', function (e) {
        if (Js._hasClass(e.target.parentNode, 'has-focus')) {
          Js._removeClass(e.target.parentNode, 'has-focus')
        }
      })
    });
  }, 100);
}

Js.Dash.openMenu = function(container) {
  var $this = $(container);
  var target = $this.attr('data-target');
  var header = document.getElementsByClassName('js-header');
  target = $('.' + target);
  var body = $('body');

  $(container).on('click', function(){
    target.addClass('is-open');
    body.addClass('is-fixed');
  });
}

Js.Dash.menu = function(container) {
  var body = $('body');

  $(container).on('click', '.js-close', function(){
    $(container).removeClass('is-open');
    body.removeClass('is-fixed');
  });
}


Js.Dash.inView = function(container) {
  $this = $(container);
  var target = $('.' + $this.attr('data-target'));

  $(container).on('inview', function(event, inview){
    if(inview) {
      target.removeClass('not-inview');
    } else {
      target.addClass('not-inview');
    }
  })
}


Js.Dash.links = function(container) {
  var children = $(container).children('li');

  $.each(children, function(index, item){
    var child = $(item).children()[0];
    if(window.location.pathname == $(child).attr('href')) {
      $(item).addClass('is-current');
    } else if(window.location.pathname == '' || window.location.pathname == undefined) {
      $(children[0]).addClass('is-current');
    }
  })
}


Js.Dash.faqScroll = function(container) {
  var children = $(container).children();
  $.each(children, function(index, item){
    $(item).on("click", function(e){
      e.preventDefault();
      var id = $(e.target).attr('href');

      $('html, body').animate({
        scrollTop: $(id).offset().top - 100
      }, 500);
    })
  })
}

Js.Dash.welcomeLink = function(container){
  function act() {
     $(container).on('click', function(e){
       e.preventDefault();

       if(userIsLoggedIn) {
         window.location.href = "/?noredirect";
       } else {
         window.location.href = "/"
       }
     });

  }

  if (typeof window.userIsLoggedIn !== 'undefined') {
    xhr.insecurePost("/login", {}, function (response) {
       window.userIsLoggedIn = response.loggedIn;
       act();
    });
  } else {
    act();
  }
}

Js.Dash.facebookShare = function(container){
  var $this = $(container);
  $this.on('click', function(e){
    e.preventDefault();
    facebookFeedDialog(window.userIsLoggedIn);
  })
};

Js.Dash.twitterShare = function(container){
  var $this = $(container);
  $this.on('click', function(e){
    e.preventDefault();
    twitterFeedDialog(window.userIsLoggedIn);
  })
};

// Js.Dash.loggedInHide = function(container) {
//   if (_.isUndefined(window.userIsLoggedIn)) {
//     xhr.insecurePost("/login", {}, function (response) {
//       window.userIsLoggedIn = response.loggedIn;
//       if (userIsLoggedIn) {
//         $(container).addClass('is-hidden');
//       }
//     });
//   } else {
//      if (userIsLoggedIn) {
//        $(container).addClass('is-hidden');
//      }
//   }
// }

Js.Dash.OlympicsTimer = function(container) {
  function zeroPad(x) {
    var text = (x + '');
    return text.length > 1 ? text : '0' + text;
  }
  function setTicker() {
    var leftMillis = moment.utc('2016-08-22 06:00:00').diff(moment());
    if ( leftMillis > 0 ) {
      var leftTo = moment.duration(leftMillis);
      $('.js-days').text(zeroPad(leftTo.days()));
      $('.js-hours').text(zeroPad(leftTo.hours()));
      $('.js-minutes').text(zeroPad(leftTo.minutes()));
      $('.js-seconds').text(zeroPad(leftTo.seconds()));
    } else {
      $('.js-days').text('00');
      $('.js-hours').text('00');
      $('.js-minutes').text('00');
      $('.js-seconds').text('00');
    }
  }
  setTicker();
  setInterval(setTicker, 500);
}


// Js.Dash.slick = function(container){
//   xhr.insecureGet('/surveys/weekly_polls/featured', function (response) {
//     d3.selectOne('.js-featured-polls').templated(response, function (poll, pollLi) {
//       pollLi.populateFrom(poll);
//       pollLi.selectOne('.js-poll_link_ref').attr("href", poll.poll_link);
//     });
//     if (response.length > 1 ) {
// 	    $(container).slick({
// 		    dots: true,
// 		    infinite: true,
// 		    speed: 300,
// 		    slidesToShow: 1,
// 		    centerMode: true,
// 		    autoplay: true,
// 		    autoplaySpeed: 4000,
//         dots: false,
//         arrows: false,
//         centerPadding: '0px'
// 	    })
//     };
//   });
//   console.log("success");
// }

Js.Dash.tagShow = function (container) {
  var tags = container.getAttribute('data-tags');
  var parser = document.createElement('a');
  parser.href = window.location.href;

  if (parser.search) {
    container.style.display = 'none';
    var search = parser.search;
    var index = search.indexOf('=');
    var tag = search.substring(index + 1)

    if (tags.indexOf(tag) > 0) {
      container.style.display = 'block';
    }
  }
}

Js.Dash.replaceSection = function (container) {
  var section = new ContentSection(container.getAttribute('data-container-class'));
  var queryParams = (container.getAttribute('data-query-params') || "").split(/\s*,\s*/);
  var url = container.getAttribute('data-snip-url');
  var started = false;
  queryParams.forEach(function(param) {
      if (! param) return;
      var paramValue = queryParameter(param);
      if (!paramValue) return;
      if (!started) {
        started = true;
        url += '?';
      }
      url += param + '=' + paramValue; // should be subject to URL escaping if it comes up.
  });

  section.replaceSection(null, url, function () {
    Js.Init(section);
  }, function () {
    section.revealMain();
  }, noop, null, null);
}

Js.Dash.product = function (container) {
  container.style.display = '0';
  $(container).on('inview', function(event, inview){
    if(inview) {
      container.style.opacity = '1';
    } else {
      container.style.opacity = '0';
    }
  })
}

Js.Dash.video = function (container) {
  console.log('video loaded');

  // select video element
  var vid = document.getElementById('vault');
  var body = document.body;

  // Seconds into the video the looping part starts and ends
  var vidLoopStart = 3;
  var vidLoopEnd = 16;

  var scrollpos = window.pageYOffset;
  var targetscrollpos = scrollpos;
  var videoDirection = 0;
  var interval = null;
  var sectionIndex = 0;
  var state = "starting";

  // pause video on load
  vid.pause();

  window.onscroll = function(e) {
    if (state === "intro" || state === "ending") {
      return;
    }

    var oldPos = scrollpos;
    var oldDirection = videoDirection;
    var oldSectionIndex = sectionIndex;
    scrollpos = window.pageYOffset;
    videoDirection = scrollpos - oldPos < 0 ? -1 : 1;

    if (state === "starting" && videoDirection > 0) {
      state = "intro";
      vid.play();
    }

    vid.addEventListener('ended', function () {
      vid.currentTime = vidLoopStart;
      vid.play();
    });
  };

  setInterval(function() {
    if (vid.currentTime > vidLoopStart && state == "intro") {
      state = "looping";
    }
    if (vid.currentTime > vidLoopEnd && state == "looping") {
      vid.currentTime = vidLoopStart;
    }
  }, 40);

  function stopVideo() {
    videoDirection = 0;
    vid.pause();
    clearInterval(interval);
  }

  function goHome() {
    vid.currentTime = vidLoopEnd;
    vid.play();
  }
}

Js.Dash.waypoints = function (container) {
  var nav = document.getElementById('nav');
  var content = document.getElementById('content');
  var sections = content.children;
  var scrollPosition = window.pageYOffset;
  var bounceBackFunction = null;

  function switchTo (index) {
    for (var i = 0; i < sections.length; i++)
    Array.prototype.forEach.call(sections, function (section, i) {
      var section = sections[i];
      var navItem = nav.children[i];
      if (index === i) {
        Js._addClass(section, "active")
        Js._addClass(navItem,"active");
      } else {
        Js._removeClass(section, "active")
        Js._removeClass(navItem,"active");
      }
    });
  }

  switchTo(0);

  window.addEventListener('scroll', function (e) {
    var sectionHeight = window.innerHeight;
    var scrollPos = window.pageYOffset;
    var sectionIndex =  Math.max(0, Math.floor(scrollPos / sectionHeight));
    switchTo(sectionIndex);

    var scrollIndicator = document.getElementById('nav-scroll');
    var height = window.pageYOffset / sectionHeight;
    scrollIndicator.style.height = (height * 2) + 'rem';
  });
}

Js.Dash.subheadShow = function (container) {
  window.addEventListener('scroll', function (e) {
    if (e.currentTarget.pageYOffset > 250) {
      container.style.opacity = 1
    } else {
      container.style.opacity = 0
    }
  })
}
