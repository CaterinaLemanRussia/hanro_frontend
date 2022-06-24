import tippy from "tippy.js";

tippy(
	'.js-copy-to-clipboard',
	{
		trigger: 'click',
		popperOptions: {
			strategy: 'fixed',
		},
	}
);

$('.js-copy-to-clipboard').click(function () {
	$(this).select();
	document.execCommand("copy");
})
