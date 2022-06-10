import Swiper, {Navigation} from 'swiper';

Swiper.use([Navigation])

const blockHeadingUnderSlider = new Swiper(".block_heading-under__slider", {
	spaceBetween: 24,
	disableOnInteraction: false,
	navigation: {
		nextEl: '.block_heading-under__slider-arrow--right',
		prevEl: '.block_heading-under__slider-arrow--left',
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
			loop: true,
		},
		960: {
			slidesPerView: 4,
			loop: false,
		},
		1200: {
			slidesPerView: 4,
			loop: false,
		},
	},
});
