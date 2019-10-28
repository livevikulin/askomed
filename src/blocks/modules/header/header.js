$(document).ready(function() {
	
	let mobileNav = $('.mobile-nav');
	let _body = $('body');
	$('.burger').on('click', function() {
		mobileNav.addClass('menu-active');
		_body.css('overflow', 'hidden');
	});
	$('.close').on('click', function() {
		mobileNav.removeClass('menu-active');
		_body.css('overflow', 'auto');
	});
	
	$('.item-down a').on('click', function() {
		$(this).children().toggleClass('rotate');
		$(this).next().slideToggle();
	});
});