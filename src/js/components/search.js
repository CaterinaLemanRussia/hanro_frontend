import helpers from "../helpers"; helpers

let $searchWrapper = $('.header__search-wrapper'),
	$searchInput   = $('.header__search-input'),
	$searchBtn     = $('.js-search-open-modal')

function handlerSearchPopup(e) {
	if ( e.keyCode === 27 ) {
		closeSearchPopup()
	}
}

function openSearchPopup () {
	if ( !helpers.isMobile() ) {
		$searchWrapper.fadeIn(400)
		$searchBtn.addClass('is-open')
		$searchInput.focus()
		$(document).bind('keyup', handlerSearchPopup)
	} else {
		window.openModal('#modal-search')
	}

}
function closeSearchPopup() {
	if ( !helpers.isMobile() ) {
		$searchWrapper.fadeOut(400)
		$searchBtn.removeClass('is-open')
		$(document).unbind('keyup', handlerSearchPopup)
	} else {

	}
}
$searchBtn.click(function (){
	if ($searchBtn.hasClass('is-open')) {
		closeSearchPopup()
	} else {
		openSearchPopup()
	}
})
$searchInput.keyup(function (){
	let countWord = $(this).val().length,
		$result

	if ( !helpers.isMobile() ) {
		$result = $('.header__search__result--modal');
	} else {
		$result = $('.header__search__result--sheet');
	}

	console.log($result)

	if ( countWord >= 3 && !$result.hasClass('is-open')) {
		$result.slideDown(400)
		$result.addClass('is-open')
	}

	if ( countWord < 3 && $result.hasClass('is-open')) {
		$result.slideUp(400)
		$result.removeClass('is-open')
	}
})
