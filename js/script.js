

jQuery(document).ready(function($) {

	initAnimation();
	$('.trigger-anim-replay').on('click', resetAnimation);

	/*
	$('.button').click(function(){
		$('#window').toggleClass('flip');
	});
	*/

	function initAnimation() {
		setTimeout(function() {
			fyll.go('fill username then fill password then click submit', function() {
				$('#submit').addClass('loading');
				setTimeout(function() {
					$('#window').addClass('flip');
				}, 1500);
			});
		}, 3*1000);
	}

	function resetAnimation() {
		var win = $('#window');

		// Clone and re-create window element
		// to trigger animation restart
		win.removeClass('flip');
		win.before(win.clone(true)).remove();

		// Reset loading state on buttons
		$('.button.loading').removeClass('loading');

		// Restart animation
		initAnimation();
	}

});