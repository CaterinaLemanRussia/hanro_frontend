$('.header__actions-item--search').click(function (){
	$('.header__search-wrapper').fadeToggle(400)
})
$('.header__search-input').keyup(function (){
	let countWord = $(this).val().length,
		$result = $('.header__search__result')

	if ( countWord >= 3 && !$result.hasClass('is-open')) {
		$result.slideDown(400)
		$result.addClass('is-open')
	}

	if ( countWord < 3 && $result.hasClass('is-open')) {
		$result.slideUp(400)
		$result.removeClass('is-open')
	}
})
