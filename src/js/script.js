import "jquery";
import "slick-slider";



$(document).ready(function() {

	//Инициализация слайдера на главной
	$('.hero-slider').slick({
		arrows: true,
		// autoplay: true,
		// autoplaySpeed: 4000
	});
	
	//Инициализация слайдера в причинах
	$('.reason-slider').slick({
		arrows: true,
		infinite: false,
	});
	//Меняем у слайдера номер
	$('.reason-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		let i = (currentSlide ? currentSlide : 0) + 1;
		$('.reason-el').text(i);
	});
})