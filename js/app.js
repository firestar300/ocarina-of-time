(function($) {

	$(document).ready(function() {

		// initSounds();
		keyPress();
		instrument();
	});

	var instrumental = '';
	var length = 'short';

	function instrument() {
		$(document).on('click', '#instrumental a', function(e) {
			e.preventDefault();

			$('#instrumental a').removeClass('active');
			$(this).addClass('active');

			instrumental = $(this).attr('data-instrument');
			length = $(this).attr('data-length');
		});
	}

	function keyPress() {
		var keys = [37, 38, 39, 40, 68, 81, 83, 90, 65];
		var key = null;
		var n = 0;

		$(document).keydown(function (e) {
			e.preventDefault();
			var random = Math.floor((Math.random() * 1000) + 1);
			if(isInArray(e.keyCode, keys) === true) {
				n++;

				if(n === 9) {
					n = 1;
					$('.writing .key').remove();
				}

				if(e.keyCode === 37 || e.keyCode === 81) {
					// Left
					key = 'left';
					$('.writing').append('<div class="key key-' + key + '"></div>');
				} else if(e.keyCode === 38 || e.keyCode === 90) {
					// Top
					key = 'top';
					$('.writing').append('<div class="key key-' + key + '"></div>');
				} else if(e.keyCode === 39 || e.keyCode === 68) {
					// Right
					key = 'right';
					$('.writing').append('<div class="key key-' + key + '"></div>');
				} else if(e.keyCode === 40 || e.keyCode === 83) {
					// Btm
					key = 'btm';
					$('.writing').append('<div class="key key-' + key + '"></div>');
				} else if(e.keyCode === 65) {
					// A
					key = 'a';
					$('.writing').append('<div class="key key-' + key + '"></div>');
				}

				initSounds(key, random);
			}
		});

		$(document).on('click', '#keys a', function(e) {
			e.preventDefault();
			var random = Math.floor((Math.random() * 1000) + 1);
			var href = $(this).attr('href');
			var key = href.substring(1);

			n++;
			if(n === 9) {
				n = 1;
				$('.writing .key').remove();
			}

			$('.writing').append('<div class="key key-' + key + '"></div>');

			initSounds(key, random);
		});
	}

	function initSounds(key, random) {
		$('.audio').append('<audio class="' + key + random + '"><source class="mp3" src="sounds/' + instrumental + key + '_'+ length +'.mp3"><source class="ogg" src="sounds/' + instrumental + key + '_' + length + '.ogg"></audio>');

		$('audio.' + key + random)[0].load();
		$('audio.' + key + random)[0].play();
		$('audio.' + key + random).on('ended', function() {
			$('audio.' + key + random).remove();
		});
	}

	function isInArray(value, array) {
		return array.indexOf(value) > -1;
	}

})(jQuery);
