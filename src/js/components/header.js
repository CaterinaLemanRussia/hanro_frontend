import helpers from '../helpers';

import Swiper, { Autoplay } from 'swiper';
Swiper.use([Autoplay]);

function slider() {
	let headerSlider = new Swiper(".header__slider", {
		loop: true,
		autoplay: {
			delay: 3000
		},
		autoHeight: true,
		speed: 1000
	});
}


function init() {
	slider()

	$('.js-dropdown--button').hover(
		function () {
			$(this).addClass('is-active')
			$(`.js-dropdown--container[data-dropdown=${$(this).data('dropdown')}]`).addClass('is-active')
		},
		function () {
			$(this).removeClass('is-active')
			$(`.js-dropdown--container[data-dropdown=${$(this).data('dropdown')}]`).removeClass('is-active')
		}
	)

	$('.js-dropdown--container').hover(
		function () {
			$(this).addClass('is-active')
			$(`.js-dropdown--button[data-dropdown=${$(this).data('dropdown')}]`).addClass('is-active')
		},
		function () {
			$(this).removeClass('is-active')
			$(`.js-dropdown--button[data-dropdown=${$(this).data('dropdown')}]`).removeClass('is-active')
		}
	)

	$('.header__burger-btn').click( function (e) {
		e.preventDefault();
		let $btn = $(this)
		$btn.toggleClass('is-active')
		$('.header__burger').fadeToggle(300)
		helpers.lockScroll($btn.hasClass('is-active'), $('.header__burger'), 'header__burger')
	});

	$('.header__burger-item--parent').click(function (e) {
		e.preventDefault();
		console.log($(this).data('dropdown'))
		$(`.header__burger-child[data-dropdown=${$(this).data('dropdown')}]`).addClass('is-active')
	})

	$('.header__burger-item--back').click(function (e) {
		if ( $(this).data('dropdown') === "main" ) {
			$('.header__burger-child').removeClass('is-active')
		} else {
			$(this).parents('.header__burger-child').removeClass('is-active')
		}
	})
}




export default {
	init
};
