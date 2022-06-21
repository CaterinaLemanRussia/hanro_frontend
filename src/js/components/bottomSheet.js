import helpers from '../helpers';


	const bottomSheet = function() {

		window.lastModalShown

		$(document).ready(function(){

			$(".open-sheet").click(function(){

				var target = '#'+$(this).data('target')
				window.lastModalShown = target

				if ($(target).hasClass('auto-height')) {

					var height = $(target).find('.contents').height() + 80
					console.log(height)
					openBottomSheet(target, getVH(height))
				} else {
					openBottomSheet(target, 50)
				}

			})

			$('.bottom-sheet .overlay').click(function(){
				setIsSheetShown(false, '#'+$(this).parent().attr('id'))
			})

		})

		let sheetHeight // in vh

		function openBottomSheet(modalID, vh) {
			console.log('open bottom sheet', modalID)
			setSheetHeight(vh, modalID)
			setIsSheetShown(true, modalID)
		}

		function setSheetHeight(value, modalID) {
			sheetHeight = Math.max(0, Math.min(100, value))
			$(modalID).find('.contents').css('height', `${sheetHeight}vh`)

			if (sheetHeight === 100) {
				$(modalID).find('.contents').addClass("fullscreen")
			} else {
				$(modalID).find('.contents').removeClass("fullscreen")
			}
		}

		function unlockScroll() {
			$('body').css('overflow', 'inherit')
		}
		function lockScroll() {
			$('body').css('overflow', 'hidden')
		}

		const setIsSheetShown = (value, modalID) => {
			if (value == false) {
				unlockScroll()
			} else {
				lockScroll()
			}

			if (modalID !== undefined) {
				document.querySelector(modalID).setAttribute("aria-hidden", String(!value))
			} else {
				$('.bottom-sheet').attr("aria-hidden", String(!value))
			}
		}

		const touchPosition = (event) =>
		event.touches ? event.touches[0] : event

		let dragPosition

		const onDragStart = (event) => {
			console.log('drag started')
			dragPosition = touchPosition(event).pageY

			$(window.lastModalShown).find('.contents').addClass("not-selectable")
			document.body.style.cursor = "grabbing"
			$(window.lastModalShown).find(".draggable-area").css('cursor', document.body.style.cursor)
		}

		const onDragMove = (event) => {
			if (dragPosition === undefined) return

			const y = touchPosition(event).pageY
			const deltaY = dragPosition - y
			const deltaHeight = deltaY / window.innerHeight * 100
			if ($(window.lastModalShown).hasClass('from-top')) {
				setSheetHeight(getVH(y - window.scrollY), window.lastModalShown)
			} else {
				setSheetHeight(sheetHeight + deltaHeight, window.lastModalShown)
			}

			dragPosition = y
		}

		const onDragEnd = () => {
			dragPosition = undefined
			$(window.lastModalShown).find('.contents').removeClass("not-selectable")
			document.body.style.cursor = ""
			$(window.lastModalShown).find(".draggable-area").css('cursor', document.body.style.cursor)

			if (sheetHeight < 25) {
				setIsSheetShown(false, window.lastModalShown)
			} else if (sheetHeight > 75) {
				setSheetHeight(99, window.lastModalShown)
			} else {
				setSheetHeight(50, window.lastModalShown)
			}
		}

		var drags = document.querySelectorAll('.draggable-area');

		Array.from(drags).forEach(drag => {
		    drag.addEventListener("mousedown", onDragStart)
		    drag.addEventListener("touchstart", onDragStart)
		});

		window.addEventListener("mousemove", onDragMove)
		window.addEventListener("touchmove", onDragMove)

		window.addEventListener("mouseup", onDragEnd)
		window.addEventListener("touchend", onDragEnd)

	}

	function getVH(height) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		if (height > h) {
			return 100;
		} else {
			return height / h * 100;
		}
	}

export { bottomSheet };
