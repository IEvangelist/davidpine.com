/*
	Future Imperfect by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$menu = $('#menu'),
			$shareMenu = $('#share-menu'),
			$sidebar = $('#sidebar'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// IE<=9: Reverse order of main and sidebar.
			if (skel.vars.IEVersion <= 9)
				$main.insertAfter($sidebar);

		$menu.appendTo($body);
		$shareMenu.appendTo($body);

		$menu.panel({
			delay: 500,
			hideOnClick: true,
			hideOnEscape: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-menu-visible'
		});

		$shareMenu.panel({
			delay: 500,
			hideOnClick: true,
			hideOnEscape: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-share-visible'
		});

		// Menu.
			/*$menu
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});*/

		// Search (header).
			var $search = $('#search'),
				$search_input = $search.find('input');

			$body
				.on('click', '[href="#search"]', function(event) {

					event.preventDefault();

					// Not visible?
						if (!$search.hasClass('visible')) {

							// Reset form.
								$search[0].reset();

							// Show.
								$search.addClass('visible');

							// Focus input.
								$search_input.focus();

						}

				});

			$search_input
				.on('keydown', function(event) {

					if (event.keyCode == 27)
						$search_input.blur();

				})
				.on('blur', function() {
					window.setTimeout(function() {
						$search.removeClass('visible');
					}, 100);
				});

		// Intro.
			var $intro = $('#intro');

			// Move to main on <=large, back to sidebar on >large.
				skel
					.on('+large', function() {
						$intro.prependTo($main);
					})
					.on('-large', function() {
						$intro.prependTo($sidebar);
					});

	});

})(jQuery);

!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){"use strict";function e(e,s,n){if(!e||!1 in e)return void i(n);t('link[href="'+e.stylesheet+'"]').length||t(document.head).append('<link href="'+e.stylesheet+'" rel="stylesheet">');var r=e.div.replace(/id="[^"]*"/,"");n.$gist.html(r)}function i(t){var e=t.url.replace(".json","").replace("?file=","#file-");t.$gist.html('<a href="'+e+'" target="_blank">View gist</a>')}function s(e){return this.each(function(){var i=t(this),s=i.data("gist-initialized"),r=t.extend({},n.DEFAULTS,i.data(),"object"==typeof e&&e);s||i.data("gist-initialized",s=new n(this,r))})}var n=function(e,i){this.options=i,this.$gist=t(e),this.request()};n.DEFAULTS={timeout:1e3,success:e,error:i},n.prototype.request=function(){var e=this,i=this.$gist.data("gist"),s=this.$gist.data("file")||!1,n="https://gist.github.com/"+i+".json";s&&(n+="?file="+s),t.ajax({url:n,dataType:"jsonp",cache:!0,beforeSend:function(t){t.url=n,t.$gist=e.$gist},timeout:e.options.timeout,success:e.options.success,error:e.options.error})};var r=t.fn.gist;t.fn.gist=s,t.fn.gist.Constructor=n,t.fn.gist.noConflict=function(){return t.fn.gist=r,this}});