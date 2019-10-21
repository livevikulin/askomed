$(document).ready(function() {
	
	$('.burger').on('click', function() {
		$('.mobile-nav').addClass('menu-active');
	});
	$('.close').on('click', function() {
		$('.mobile-nav').removeClass('menu-active');
	});
	
	$('.item-down a').on('click', function() {
		$(this).children().toggleClass('rotate');
		$(this).next().slideToggle();
	});
});