// Clicking project thumbnails slides carousel to that item
$('body').on('click', '.project-thumbnails img', function() {
	$('.carousel').carousel($(this).parent().index());
});

// Handle fetching of content & animating old/new content
function animateIn(url) {
	$('#wrap').animate({
		opacity: 0,
		'margin-top': '-150px'
	}, 'fast', function() {
		$.get(url, function(data) {
			window.scrollTo(0, 0);
			$('#wrap').html(data);
			$('#wrap').css('margin-top', '150px');
			$('#wrap').animate({
				opacity: 1,
				'margin-top': 0
			}, 'fast');
		});
	});
}