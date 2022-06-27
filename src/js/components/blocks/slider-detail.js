import helpers from '../../helpers';
import Swiper, {Navigation, Pagination, Controller, Thumbs, Zoom} from 'swiper';

Swiper.use([Navigation, Pagination, Controller, Thumbs, Zoom])

window.Swiper = Swiper;

const blockSliderDetail = new Swiper(".js-slider-detail", {
	spaceBetween: 24,
	disableOnInteraction: false,
	navigation: {
		nextEl: '.block_slider-products__slider-arrow--right',
		prevEl: '.block_slider-products__slider-arrow--left',
	},
	simulateTouch: false,
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
	let galleryTop, galleryThumbs

	galleryThumbs = new window.Swiper('.catalog-element__gallery-thumbs', {
		loop: false,
		init: false,
		on: {
			reachEnd: function () {
				this.snapGrid = [...this.slidesGrid];
			},
		},
		breakpoints: {
			0: {
				slidesPerView: "auto",
				direction: "horizontal",
				spaceBetween: 8,
			},
			960: {
				slidesPerView: "auto",
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 5,
				direction: "vertical",
			},
		},
		slideToClickedSlide: true,
	});

	galleryTop = new window.Swiper('.catalog-element__gallery', {
		navigation: {
			nextEl: '.catalog-element__gallery-next',
			prevEl: '.catalog-element__gallery-prev',
		},
		loop: false,
		on: {
			init: function () {
				galleryThumbs.init()
			},
		},
	});

	galleryThumbs.on('slideChange', function (slider) {
		galleryTop.slideTo(slider.activeIndex);
	})
	galleryTop.on('slideChange', function (slider) {
		galleryThumbs.slideTo(slider.activeIndex);
	})


	const galleryThumbsPopup = new window.Swiper('.catalog-element__gallery-popup--thumbs', {
		loop: false,
		init: false,
		on: {
			reachEnd: function () {
				this.snapGrid = [...this.slidesGrid];
			},
		},
		breakpoints: {
			0: {
				slidesPerView: "auto",
				direction: "horizontal",
				spaceBetween: 8,
			},
			960: {
				slidesPerView: "auto",
				spaceBetween: 16,
			},
			1200: {
				slidesPerView: 5,
				direction: "vertical",
			},
		},
		slideToClickedSlide: true,
	});
	const galleryTopPopup = new window.Swiper('.catalog-element__gallery-popup', {
		spaceBetween: 10,
		navigation: {
			nextEl: '.catalog-element__gallery-popup--next',
			prevEl: '.catalog-element__gallery-popup--prev',
		},
		loop: false,
		zoom: true,
		on: {
			init: function () {
				galleryThumbsPopup.init()
			},
		},
	});

	galleryThumbsPopup.on('slideChange', function (slider) {
		galleryTopPopup.slideTo(slider.activeIndex);
	})
	galleryTopPopup.on('slideChange', function (slider) {
		galleryThumbsPopup.slideTo(slider.activeIndex);
	})

	window.galleryTop = galleryTop
	window.galleryThumbs = galleryThumbs

	$('.catalog-element__gallery-popup-zoom--in').click(function () {
		galleryTopPopup.zoom.in()
	})

	$('.catalog-element__gallery-popup-zoom--out').click(function () {
		galleryTopPopup.zoom.out()
	})

	let $popupGallery = $('.catalog-element__gallery-popup--window')

	$('.catalog-element__gallery').find('.swiper-slide').click(function () {
		if (helpers.isMobile()) return false;
		galleryTopPopup.slideTo(galleryTop.activeIndex)
		helpers.lockScroll(true, $popupGallery, 'element-popup')
		$popupGallery.fadeIn(400);

	})

	$('.catalog-element__gallery-popup--close').click(function () {
		if (helpers.isMobile()) return false;
		galleryTopPopup.zoom.out()
		galleryTop.slideTo(galleryTopPopup.activeIndex)
		helpers.lockScroll(false, $popupGallery, 'element-popup')
		$popupGallery.fadeOut(400);
	})

	if ($('.colors-block').length > 0) {
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



