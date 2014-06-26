

jQuery(document).ready(function($) {

	initAnimation();
	$('.trigger-anim-replay').on('click', resetAnimation);

	function initAnimation() {
		setTimeout(function() {
			fyll.go('fill username then fill password then click submit', function() {
				$('#submit').addClass('loading');
				setTimeout(function() {
					$('#submit').addClass('done').closest('#window').addClass('flip');
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

		// Reset loading buttons
		$('.load-btn.loading').removeClass('loading done');

		// Restart animation
		initAnimation();
	}

});