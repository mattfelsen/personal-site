$(function() {

	// ------------------------------------------------------------
	// INIT/PAGE LOAD STUFF
	// ------------------------------------------------------------

	// Set up History.js
	var History = window.History;

    // Scroll to requested section of main page, if it exists
    var requestedPage = document.URL.split('/').pop();
    if ($('#'+requestedPage).length) {
    	scrollToElement(requestedPage);
    	// document.title = requestedPage;
    }

    History.replaceState({ type: 'scroll', html: $('#wrap').html() }, document.title, document.URL);

	// ------------------------------------------------------------
	// EVENT HANDLERS
	// ------------------------------------------------------------

	History.Adapter.bind(window,'statechange',function() {
        var State = History.getState();

        //console.log('State got changed to: ' + State.title);
        
        if (!State.title)
        	animateIn($('#wrap').html(), 'about');
        
        if ($('#wrap').html() != State.data.html)
        	animateIn(State.data.html, State.title);

        if (State.data.type == 'scroll') {
        	if ($('#'+State.title).length)
	        	scrollToElement(State.title);
        }
    });

	// Clicking project thumbnails slides carousel to that item
	$('body').on('click', '.project-thumbnails img', function() {
		$('.carousel').carousel($(this).parent().index(), { interval: false });
	});

	// Set up click handler for scrolling to links within page
	$('body').on('click', 'a[rel="smooth-scroll"]', function() {
		var target = $(this).attr('href');

		if ($('#'+target).length) {
			scrollToElement(target);
		} else {
			loadPage(target, target);
		}

		History.pushState({ type: 'scroll', html: $('#wrap').html() }, target, target);
		return false;
	});

	// Set up click handler for scrolling to links within page
	$('body').on('click', 'a[rel="load-project"]', function() {
		var target = $(this).attr('href');

		loadPage(target);
		// commented this out and moved it into loadPage()!
		// History.pushState({ type: 'project', html: $('#wrap').html() }, target, target);
		// console.log("pushed state ("+target+") onto history, html is:\n" + $('#wrap').html());

		return false;
	});

	// Image zoom-related stuff
	// Load up the zoom image for the initial page load
	$('#project-carousel').zoom({ url: $('.active').children().attr('src') });

	// When we're about to slide, remove the old zoom image
	$('body').on('slide', '#project-carousel', function() {
		$('.zoomImg').remove();
	});

	// After we slid, set up the new zoom image
	$('body').on('slid', '#project-carousel', function() {
		$('#project-carousel').zoom({ url: $('.active').children().attr('src') });
	});

	// And lastly, animate in the overly if the mouse is moving over the carousel
	// The plugin normally does this, but we  get weird behavior if we create the 
	// zoom image while the mouse is already over the carousel. Normally it will
	// only appear when the mouse moves into the carousel, so we'll do it manually
	// here since the carousel controls are located above the carousel rather than aside
	$('body').on('mousemove', '#project-carousel', function() {
		if ($('.zoomImg').css('opacity') == "0")
			$('.zoomImg').animate({ opacity: 1 }, 'fast');
	});

	// ------------------------------------------------------------
	// HELPER FUNCTIONS
	// ------------------------------------------------------------

	// Fetching new content & pass it off to animate function
	function loadPage(url, scrollTarget) {
		$.get(url, function(data) {
			animateIn(data, scrollTarget);
			// should this be here?? aghaghahljads;f
			History.pushState({ type: 'project', html: $('#wrap').html() }, url, url);
		});
	}
	window.loadPage = loadPage;

	// Animate old old content & bring new content in
	function animateIn(content, scrollTarget) {
		$('#wrap').animate({
			opacity: 0,
			'margin-top': '-150px'
		}, 'fast', function() {
			window.scrollTo(0, 0);
			$('#wrap').html(content);
			$('#wrap').css('margin-top', '150px');
			$('#wrap').animate({
				opacity: 1,
				'margin-top': 0
			}, 'fast', function(){

				if (scrollTarget) {
					if ($('#'+scrollTarget).length) {
			        	scrollToElement(scrollTarget);
			        }
				}

				// Set up image zoom on carousel
				$('#project-carousel').zoom({ url: $('.active').children().attr('src') });

			});
		});
	}
	window.animateIn = animateIn;

	function scrollToElement(target) {
		var offset = $('#'+target).offset().top - 70;
		$('body').animate({ scrollTop: offset });
	}

});