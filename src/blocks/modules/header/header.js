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
	
	$('.nav__link').on('click', function() {
		$(this).children().toggleClass('rotate');
		$(this).next().slideToggle();
	});
	
	let $thisCity = $('.city__this');
	let $otherCity = $('.city__block');
	
	$thisCity.on('click', function() {
		$otherCity.slideToggle();
		$('.city__choice').toggleClass('city-back');
	});
	
	$('.city__other').on('click', function() {
		$(this).parent().slideUp();
		$('.city__choice').removeClass('city-back');
	});
});