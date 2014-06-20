

jQuery(document).ready(function($) {

	initAnimation();
	//$('.trigger-anim-replay').on('click', resetAnimation);

	$('.button').click(function(){
		$('#window').toggleClass('flip');
	});

	function initAnimation() {
		instruct('fill #username then fill #password then press #submit', {
			startDelay: 3*1000,
			complete: function() {
				/*$('#submit').addClass('loading');
				setTimeout(function() {
					$('#window').addClass('flip');
				}, 3000);*/
			}
		});
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



(function($) {

	window.instruct = function(instruction, config) {

		var instr = window.instruct;

		instr.config = $.extend({}, {
			actionDelay: 500,
			startDelay: 500,
			keyPressInterval: 100,
			humanisePressInterval: true,
			complete: false
		}, config);
		
		instr.splitToQueue = function(instruction) {
			var then = instruction.split('then');
			
			for(var i=0; i < then.length; ++i) {
				then[i] = window.instruct.betterTrim(then[i]);
			}
			return then;
		}

		// Removes all double whitespace. Also trims beginning and end.
		instr.betterTrim = function(text) {
			return text.replace(/\s+(?=\s)/g, '').trim();
		};

		instr.getPressInterval = function() {
			var interval = instr.config.humanisePressInterval ? instr.config.keyPressInterval + ((Math.random()*1.5-.5)*100) : instr.config.keyPressInterval;
			return interval;
		}

		instr.actions = {
			fill: function(target, callback) {
				var value = target.data('fill');

				// Check if there is a value to fill with
				if(value.length) {
					var letters = value.split('').reverse();

					// Empty input
					target.val('');

					// Add focus class
					target.addClass('focus');

					// Wait a keystroke after focus
					setTimeout(function() {

						var pressFunc = function() {
							target.val(target.val() + letters.pop());

							// Last letter, let's run the callback
							if(letters.length < 1) {
								setTimeout(function() {
									target.removeClass('focus');
									setTimeout(callback, instr.getPressInterval());
								}, instr.getPressInterval());
							} else {
								setTimeout(pressFunc, instr.getPressInterval());
							}
						}

						pressFunc();

					}, instr.getPressInterval());
				}
			},
			press: function(target, callback) {
				target.addClass('focus');
				setTimeout(function() {
					target.removeClass('focus');
					callback();
				}, instr.config.keyPressInterval*2);
			}
		};

		instr.actionHelpers = {
			setFocus: function(target) {

			},
			setBlur: function() {

			}
		}

		instr.loop = function() {
			if(!instr.queue.length) {
				if(typeof instr.config.complete === 'function') {
					instr.config.complete();
				}
				return false;
			}
			var instruct = instr.queue.pop(),
				keyValue = instruct.split(' ');

			if(keyValue.length === 2) {
				var action = keyValue[0],
					target = $(keyValue[1]);

				if(target.length) {

					if(typeof instr.actions[action] === 'function') {
						instr.actions[action](target, function() {
							setTimeout(instr.loop, instr.config.actionDelay);
						});
					}
				}
			}
		}

		instr.queue = instr.splitToQueue(instruction).reverse();
		if(instr.queue) {
			setTimeout(instr.loop, instr.config.startDelay);
		}

	};

})(jQuery);