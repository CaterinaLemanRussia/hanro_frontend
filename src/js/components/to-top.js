import helpers from "../helpers";

const $btnToTop = $('.to-top')

$btnToTop.click(function () {
	helpers.scrollTo($('body'))
})

$(window).scroll(function() {
	let scrolled = $(window).scrollTop();

	if ( scrolled > 100 ) {
		$btnToTop.addClass('is-visible');
	} else {
		$btnToTop.removeClass('is-visible');
	}
});
