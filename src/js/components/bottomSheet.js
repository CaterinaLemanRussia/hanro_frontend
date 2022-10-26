import helpers from '../helpers';
import {hideAll} from 'tippy.js';


const bottomSheet = function () {

	window.lastModalShown

	$(document).ready(function () {

		window.openBottomModal = openBottomModal
		window.closeBottomModal = closeBottomModal
		window.closeModal = closeModal

		$(".js-open-modal").click(function () {
			var target = '#' + $(this).data('target')
			openModal(target)
		})

		$('.bottom-sheet .overlay').click(function () {
			setIsSheetShown(false, '#' + $(this).parent().attr('id'))
		})


		const openModal = function (modalID) {
			if ($(modalID).length > 0) {
				if ($(window).width() > 959) {
					$.fancybox.open({
						src: modalID,
						scrolling: 'hidden',
					})
				} else {
					window.openBottomModal(modalID)
				}
			}
		}

		const closeModal = function() {
			if ($(window).width() > 959) {
				$.fancybox.close()
			} else {
				window.closeBottomModal()
			}
		}

		window.closeModal = closeModal

		const setModalHeight = function(height, modalID) {
			console.log(modalID)

			if (modalID == undefined) {
				modalID = window.lastModalShown
			}

			setSheetHeight(getVH(height), window.lastModalShown)
		}

		const modalAutoHeight = function(modalID = 'auto') {
			if (modalID == 'auto') {
				modalID = window.lastModalShown
			}

			var newHeight = $(modalID).find('.body > *').outerHeight() + 80
			console.log(newHeight)
			setSheetHeight(getVH(newHeight), modalID)

		}

		window.setModalHeight = setModalHeight
		window.modalAutoHeight = modalAutoHeight
		window.openModal = openModal

		// openModal('#subscription-modal');

	})

	let sheetHeight // in vh

	const openBottomModal = function (target) {
		window.lastModalShown = target

		if ($(target).hasClass('auto-height')) {

			var height = $(target).find('.body > *').outerHeight() + 80
			openBottomSheet(target, getVH(height))
		} else {
			openBottomSheet(target, 50)
		}

	}

	const closeBottomModal = function (target) {
		window.lastModalShown = target

		closeBottomSheet(target)

	}

	function openBottomSheet(modalID, vh) {
		setSheetHeight(vh, modalID)
		setIsSheetShown(true, modalID)
	}

	function closeBottomSheet(modalID) {
		setSheetHeight(0, modalID)
		setIsSheetShown(false, modalID)
	}
	
	function setSheetHeight(value, modalID) {

		// if (value === 100) {
		// 	value = 99
		// }

		// if ($('html').hasClass('is-os-ios') && value > 90) {
		// 	value = 90
		// }

		if (value > 90) {
			value = 90
		}		

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

		hideAll()

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

		if (sheetHeight < 30) {
			setIsSheetShown(false, window.lastModalShown)
		} else if (sheetHeight > 75) {
			setSheetHeight(99, window.lastModalShown)
		} else {
			// setSheetHeight(50, window.lastModalShown)
			modalAutoHeight( window.lastModalShown)
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

export {bottomSheet};
