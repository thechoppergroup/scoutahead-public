Js.Behaviors.video = function (container) {
  console.log('video loaded')
  var sectionHeight = 2000;

    // select video element
  var vid = document.getElementById('vault');
  var body = document.body;

  // Seconds into the video the looping part starts and ends
  var vidLoopStart = 5;
  var vidLoopEnd = 20;

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
    videoDirection = Math.sign(scrollpos - oldPos);

    if (state === "starting" && videoDirection > 0) {
      state = "intro";
      body.style.overflow = 'hidden';
      vid.play();
    } else if (state === "looping" && videoDirection < 0 && scrollpos < sectionHeight){
      state = "ending";
      body.style.overflow = 'hidden';
      Js._addClass(vid.parentElement, 'fadeout');
      setTimeout(function () {
        Js._removeClass(vid.parentElement, 'fadeout');
        vid.currentTime = vidLoopEnd + 1;
      }, 1000);
    }

    vid.addEventListener('ended', function () {
      state = "starting";
      $(window).scrollTop(0);
      body.style.overflow = 'auto';
    });
  };

  setInterval(function() {
    console.log(state + " " + vid.currentTime);
    if (vid.currentTime > vidLoopStart && state == "intro") {
      body.style.overflow = 'auto';
      state = "looping";
      if (window.pageYOffset < sectionHeight)
        $(window).scrollTop(sectionHeight);
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

Js.Behaviors.shuttle = function (container) {
  console.log(container)
  window.addEventListener('scroll', function () {
    container.style.top = window.pageYOffset + 'px';
  })
}

//
// Js.Behaviors.load = function(container){
//   var hash = window.location.hash;
//   var state = hash.slice(1, window.location.hash.length);
//   console.log(state);
//
//   Js._request(Js.States[state].templateUrl, function(result){
//     Js.Views.successTwo.render(result);
//   });
// }
//
// Js.Behaviors.inputsCheck = function (container) {
//   setInterval(function(){
//     var inputs = container.querySelectorAll('input');
//     Array.prototype.forEach.call(inputs, function(el, i){
//       if(el.value !== '') {
//         Js._addClass(el.parentNode, 'has-content')
//       } else {
//         Js._removeClass(el.parentNode, 'has-content')
//       }
//
//       el.addEventListener('focus', function (e) {
//         if (!Js._hasClass(e.target.parentNode, 'has-focus')) {
//           Js._addClass(e.target.parentNode, 'has-focus')
//         }
//       })
//
//       el.addEventListener('blur', function (e) {
//         if (Js._hasClass(e.target.parentNode, 'has-focus')) {
//           Js._removeClass(e.target.parentNode, 'has-focus')
//         }
//       })
//     });
//   }, 100);
// }

// Js.Behaviors.openMenu = function(container) {
//   var $this = $(container);
//   var target = $this.attr('data-target');
//   var header = document.getElementsByClassName('js-header');
//   target = $('.' + target);
//   var body = $('body');
//
//   $(container).on('click', function(){
//     target.addClass('is-open');
//     body.addClass('is-fixed');
//   });
// }
//
// Js.Behaviors.menu = function(container) {
//   var body = $('body');
//
//   $(container).on('click', '.js-close', function(){
//     $(container).removeClass('is-open');
//     body.removeClass('is-fixed');
//   });
// }

//
// Js.Behaviors.inView = function(container) {
//   $this = $(container);
//   var target = $('.' + $this.attr('data-target'));
//
//   $(container).on('inview', function(event, inview){
//     if(inview) {
//       target.removeClass('not-inview');
//     } else {
//       target.addClass('not-inview');
//     }
//   })
// }
//
//
// Js.Behaviors.links = function(container) {
//   var children = $(container).children('li');
//
//   $.each(children, function(index, item){
//     var child = $(item).children()[0];
//     if(window.location.pathname == $(child).attr('href')) {
//       $(item).addClass('is-current');
//     } else if(window.location.pathname == '' || window.location.pathname == undefined) {
//       $(children[0]).addClass('is-current');
//     }
//   })
// }


// Js.Behaviors.faqScroll = function(container) {
//   var children = $(container).children();
//   $.each(children, function(index, item){
//     $(item).on("click", function(e){
//       e.preventDefault();
//       var id = $(e.target).attr('href');
//
//       $('html, body').animate({
//         scrollTop: $(id).offset().top - 100
//       }, 500);
//     })
//   })
// }

// Js.Behaviors.welcomeLink = function(container){
//   function act() {
//      $(container).on('click', function(e){
//        e.preventDefault();
//
//        if(userIsLoggedIn) {
//          window.location.href = "/?noredirect";
//        } else {
//          window.location.href = "/"
//        }
//      });
//
//   }
//
//   if (typeof window.userIsLoggedIn !== 'undefined') {
//     xhr.insecurePost("/login", {}, function (response) {
//        window.userIsLoggedIn = response.loggedIn;
//        act();
//     });
//   } else {
//     act();
//   }
// }

// Js.Behaviors.facebookShare = function(container){
//   var $this = $(container);
//   $this.on('click', function(e){
//     e.preventDefault();
//     facebookFeedDialog(window.userIsLoggedIn);
//   })
// };
//
// Js.Behaviors.twitterShare = function(container){
//   var $this = $(container);
//   $this.on('click', function(e){
//     e.preventDefault();
//     twitterFeedDialog(window.userIsLoggedIn);
//   })
// };

// Js.Behaviors.loggedInHide = function(container) {
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

// Js.Behaviors.OlympicsTimer = function(container) {
//   function zeroPad(x) {
//     var text = (x + '');
//     return text.length > 1 ? text : '0' + text;
//   }
//   function setTicker() {
//     var leftMillis = moment.utc('2016-08-22 06:00:00').diff(moment());
//     if ( leftMillis > 0 ) {
//       var leftTo = moment.duration(leftMillis);
//       $('.js-days').text(zeroPad(leftTo.days()));
//       $('.js-hours').text(zeroPad(leftTo.hours()));
//       $('.js-minutes').text(zeroPad(leftTo.minutes()));
//       $('.js-seconds').text(zeroPad(leftTo.seconds()));
//     } else {
//       $('.js-days').text('00');
//       $('.js-hours').text('00');
//       $('.js-minutes').text('00');
//       $('.js-seconds').text('00');
//     }
//   }
//   setTicker();
//   setInterval(setTicker, 500);
// }


// Js.Behaviors.slick = function(container){
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

// Js.Behaviors.tagShow = function (container) {
//   var tags = container.getAttribute('data-tags');
//   var parser = document.createElement('a');
//   parser.href = window.location.href;
//
//   if (parser.search) {
//     container.style.display = 'none';
//     var search = parser.search;
//     var index = search.indexOf('=');
//     var tag = search.substring(index + 1)
//
//     if (tags.indexOf(tag) > 0) {
//       container.style.display = 'block';
//     }
//   }
// }

// Js.Behaviors.replaceSection = function (container) {
//   var section = new ContentSection(container.getAttribute('data-container-class'));
//   var queryParams = (container.getAttribute('data-query-params') || "").split(/\s*,\s*/);
//   var url = container.getAttribute('data-snip-url');
//   var started = false;
//   queryParams.forEach(function(param) {
//       if (! param) return;
//       var paramValue = queryParameter(param);
//       if (!paramValue) return;
//       if (!started) {
//         started = true;
//         url += '?';
//       }
//       url += param + '=' + paramValue; // should be subject to URL escaping if it comes up.
//   });
//
//   section.replaceSection(null, url, function () {
//     section.revealMain();
//   }, function(){
//     Js._init(section);
//   });
// }

// Js.Behaviors.product = function (container) {
//   container.style.display = '0';
//   $(container).on('inview', function(event, inview){
//     if(inview) {
//       container.style.opacity = '1';
//     } else {
//       container.style.opacity = '0';
//     }
//   })
// }

Js.Behaviors.waypoints = function (container) {


  var nav = document.getElementById('section:nav');
  var sections = [
    document.getElementById('section:intro'),
    document.getElementById('section:product'),
    document.getElementById('section:beyond')
  ];

  function switchTo (index) {
    for (var i = 0; i < sections.length; i++)
    sections.forEach(function (section, i) {
      var section = sections[i];
      var navItem = nav.children[i];
      if (index === i) {
        section.style.opacity = '1';
        Js._addClass(navItem,"active");
      } else {
        section.style.opacity = '0';
        Js._removeClass(navItem,"active");
      }
    });
  }

  switchTo(0);

  window.addEventListener('scroll', function (e) {
    console.log(e.currentTarget.pageYOffset);
    var sectionIndex = getSectionIndex();
    switchTo(sectionIndex);
  });
}

function getSectionIndex () {
    var sectionHeight = 2000;
    var scrollPos = window.pageYOffset;
    return Math.floor(scrollPos / sectionHeight);
}
