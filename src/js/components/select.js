import 'select2';

$(document).ready(function() {
	const $selectEl = $('.select')
	if ($selectEl.length) {
		$selectEl.select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
		$('.select2-selection__arrow').find('b').append(
			'<svg><use xlink:href="/images/sprites.svg#chevron_down"></use></svg>'
		)
	}
});
