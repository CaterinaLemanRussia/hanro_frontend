import Swiper, {Navigation, Pagination, Controller, Thumbs} from 'swiper';

Swiper.use([Navigation])
Swiper.use([Pagination])
Swiper.use([Controller])
Swiper.use([Thumbs])

window.Swiper = Swiper;

const blockSliderDetail = new Swiper(".js-slider-detail", {
	spaceBetween: 24,
	disableOnInteraction: false,
	navigation: {
		nextEl: '.block_slider-products__slider-arrow--right',
		prevEl: '.block_slider-products__slider-arrow--left',
	},
	// simulateTouch: false,
	breakpoints: {
		0: {
			slidesPerView: 2,
		},
		960: {
			slidesPerView: 4,
		},
		1200: {
			slidesPerView: 4,
		},
	},
});

$(document).ready(function () {
	const galleryThumbs = new window.Swiper('.gallery-thumbs', {
		slidesPerView: 5,
		allowTouchMove: false,
		loop: true,
		loopedSlides: 5,
		breakpoints: {
			0: {
				direction: "horizontal",
			},
			960: {
				direction: "vertical",
			},
			1200: {
				direction: "vertical",
			},
		},
		navigation: {
			nextEl: '.block_slider-products__slider-arrow--right',
			prevEl: '.block_slider-products__slider-arrow--left',
		},
		slideToClickedSlide: true,
	});
	const galleryTop = new window.Swiper('.gallery-top', {
		spaceBetween: 10,
		navigation: {
			nextEl: '.block_slider-products__slider-arrow--right',
			prevEl: '.block_slider-products__slider-arrow--left',
		},
		loop: true,
		loopedSlides: 5,
		thumbs: {
			swiper: galleryThumbs
		},
		on: {
			slideChange: function (slider) {
				galleryThumbs.slideTo(slider.activeIndex)
			},
		},
	});

	// galleryTop.controller.control = galleryThumbs;
	// galleryThumbs.controller.control = galleryTop;

	window.galleryTop = galleryTop
	window.galleryThumbs = galleryThumbs

	if ( $('.colors-block').length > 0 ) {
			$('.colors-block').on('click', '.color a', function (e) {
			e.preventDefault()
			$('.colors-block .color').removeClass('active')
			$(this).parent().addClass('active')
		})
	}
	

	$('.product-amount__minus').click(function () {
		changeQuantity('reduce')
	})

	$('.product-amount__plus').click(function () {
		changeQuantity('increase')
	})

})

function changeQuantity(type) {
	if (type == 'reduce') {
		if ($('.product-amount__field').val() > 1) {
			$('.product-amount__field').val($('.product-amount__field').val() - 1)
		}
	}
	if (type == 'increase') {
		$('.product-amount__field').val(parseInt($('.product-amount__field').val()) + 1)
	}
}


