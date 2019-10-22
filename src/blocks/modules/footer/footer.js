$(document).ready(function() {

	$('.js-footer').on('click', function(e) {
		e.preventDefault();
		$(this).next().slideToggle();
	})

});