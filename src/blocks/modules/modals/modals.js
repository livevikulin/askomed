import 'jquery';
import "izimodal/js/iziModal.js";

$(document).ready(function() {
	$('#modal').iziModal();
	
	$(document).on('click', '.header-address__btn', function (e) {
		e.preventDefault();
		$('#modal').iziModal('open');
	});
})