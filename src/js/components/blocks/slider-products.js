import Swiper, {Navigation, Pagination} from 'swiper';

Swiper.use([Navigation])
Swiper.use([Pagination])

const blockSliderProducts = new Swiper(".block_slider-products__slider", {
	spaceBetween: 24,
	disableOnInteraction: false,
	pagination: {
		el: '.block_slider-products__slider-dots',
		type: 'bullets',
		clickable: true
	},
	navigation: {
		nextEl: '.block_slider-products__slider-arrow--right',
		prevEl: '.block_slider-products__slider-arrow--left',
	},
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
