let $searchWrapper = $('.header__search-wrapper'),
	$searchInput   = $('.header__search-input'),
	$searchBtn     = $('.header__actions-item--search')

function handlerSearchPopup(e) {
	if ( e.keyCode === 27 ) {
		closeSearchPopup()
	}
}

function openSearchPopup () {
	$searchWrapper.fadeIn(400)
	$searchBtn.addClass('is-open')
	$searchInput.focus()
	$(document).bind('keyup', handlerSearchPopup)
}
function closeSearchPopup() {
	$searchWrapper.fadeOut(400)
	$searchBtn.removeClass('is-open')
	$(document).unbind('keyup', handlerSearchPopup)
}
$searchBtn.click(function (){
	if ($searchBtn.hasClass('is-open')) {
		closeSearchPopup()
	} else {
		openSearchPopup()
	}
})
$searchInput.keyup(function (){
	let countWord = $searchInput.val().length,
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
