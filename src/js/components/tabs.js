
	const tabs = function() {

		$(document).ready(function(){
			$('.tab-label').click(function(e){
				e.preventDefault()
				let target = '#'+$(this).attr('data-target')

				if (!$(this).hasClass('active')) {
					$(this).parent().find('.tab-label').removeClass('active')
					$(this).addClass('active')
					$(this).parent().parent().parent().find('.tab-contents').removeClass('active')
					$(target).addClass('active')
				}
			})
		})

	}

	export { tabs };
