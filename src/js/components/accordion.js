function init() {
	$('.accordion').on('click', '.accordion-control', function(e){
		e.preventDefault();
		$(this)
			.next('.accordion-panel')
			.not(':animated')
			.slideToggle()

		$(this)
			.toggleClass('is-active')
	})
}

export default {
	init
};
