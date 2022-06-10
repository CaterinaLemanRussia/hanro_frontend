


function inputInsideOtpInput(el) {
    if (el.value.length > 1){
        el.value = el.value[el.value.length - 1];
    }
    try {
        if(el.value == null || el.value == ""){
            foucusOnInput(el.previousElementSibling);
        }else {
            foucusOnInput(el.nextElementSibling);
        }
    }catch (e) {
        console.log(e);
    }
}

function foucusOnInput(ele){
    ele.focus();
    let val = ele.value;
    ele.value = "";
    // ele.value = val;
    setTimeout(()=>{
        ele.value = val;
    })
}

function init() {
	if ($('.sms-code').length > 0) {
		$('.sms-code input').on('input', function() {
			inputInsideOtpInput(this)

		});
		foucusOnInput($('.sms-code input').first())
	}

}


export default {
	init
};
