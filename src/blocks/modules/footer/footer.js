$(document).ready(function() {

	let $open = $('.footer-menu__item svg');
	
	$('.js-footer').on('click', function(e) {
		e.preventDefault();
		$(this).next().slideToggle();
		$(this).find($open).toggleClass('footer-active');
	})

});