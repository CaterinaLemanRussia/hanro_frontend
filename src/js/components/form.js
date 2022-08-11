import tippy from "tippy.js";

function handlerTextRemoveError() {
	let $inputGroup = $(this).parent()
	$inputGroup.removeClass('is-errored')
	$inputGroup.off('input', '.form__group-input')
}

function addTextError($input, $inputGroup) {
	$inputGroup.addClass('is-errored')
	$inputGroup.on('input', '.form__group-input', handlerTextRemoveError)
	setTimeout(function () {
		$inputGroup.removeClass('is-errored')
		$inputGroup.off('input', '.form__group-input')
	}, 3000)
}

function handlerCheckboxRemoveError() {
	let $inputBox = $(this).siblings('.checkbox-box')
	const tippyInstance = tippy($inputBox.get()[0], {
		trigger: 'manual',
		popperOptions: {
			strategy: 'fixed',
		},
	})

	tippyInstance.hide()
	$(this).off('change')
}

function addCheckboxError($input) {
	let $inputBox = $input.siblings('.checkbox-box')
	const tippyInstance = tippy($inputBox.get()[0], {
		trigger: 'manual',
		popperOptions: {
			strategy: 'fixed',
		},
	})
	tippyInstance.show()
	$input.on('change', handlerCheckboxRemoveError)
	setTimeout(function () {
		tippyInstance.hide()
		$input.off('change')
	}, 3000)
}

const validation = (form) => {
	let $inputRequired = form.find('.js-form-required'),
		success = false
	$inputRequired.each( (index, input) =>  {
		let $input = $(input)
		switch ( $input.attr('type')) {
			case "text":
				if (!$input.val()) {
					addTextError($input, $input.parent())
					success = true
				}
				break

			case "checkbox":
				if (!$input.prop('checked')) {
					addCheckboxError($input)
					success = true
				}
				break
		}
	});

	return success
}
window.validation = validation

$('.js-form').submit(function (e) {
	e.preventDefault()

	let form = $(this)
	window.validation(form)
})

