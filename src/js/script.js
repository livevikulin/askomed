import "jquery";
import "slick-slider";


$(document).ready(function() {

	//Инициализация слайдера на главной
	$('.hero-slider').slick({
		arrows: true,
		// autoplay: true,
		// autoplaySpeed: 4000
	});
	
	//Слайдер с рекомендациями
	$('.recommendations-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
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
	
	//Выпадашки в блоке с частыми вопросами
	$('.faq-box__button').on('click', function() {
		if ($('.faq-box__content').is(':visible')) {
			$('.faq-box__content').slideUp();
			$('.faq-box__minus').css({display: 'none'});
			$('.faq-box__plus').show();
		}
		$(this).next('.faq-box__content').slideDown();
		$(this).find('.faq-box__plus').hide();
		$(this).find('.faq-box__minus').css({display: 'flex'});
	});
	
	//Выпадающий текст в боксе с инфойрмацией о специалисте
	$('.specialists-box__next').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('.specialists-text__next').slideDown();
		$(this).hide();
		$(this).parent().find('.specialists-box__back').show();
	});
	$('.specialists-box__back').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('.specialists-text__next').slideUp();
		$(this).hide();
		$(this).parent().find('.specialists-box__next').show();
	});

	//Слайдер в блоке "О компании"
	(function(window) {
	
		'use strict';
	
		var support = { animations : Modernizr.cssanimations },
			animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			onEndAnimation = function( el, callback ) {
				var onEndCallbackFn = function( ev ) {
					if( support.animations ) {
						if( ev.target != this ) return;
						this.removeEventListener( animEndEventName, onEndCallbackFn );
					}
					if( callback && typeof callback === 'function' ) { callback.call(); }
				};
				if( support.animations ) {
					el.addEventListener( animEndEventName, onEndCallbackFn );
				}
				else {
					onEndCallbackFn();
				}
			};
	
		function extend( a, b ) {
			for( var key in b ) { 
				if( b.hasOwnProperty( key ) ) {
					a[key] = b[key];
				}
			}
			return a;
		}
	
		function Stack(el, options) {
			this.el = el;
			this.options = extend( {}, this.options );
			extend( this.options, options );
			this.items = [].slice.call(this.el.children);
			this.itemsTotal = this.items.length;
			if( this.options.infinite && this.options.visible >= this.itemsTotal || !this.options.infinite && this.options.visible > this.itemsTotal || this.options.visible <=0 ) {
				this.options.visible = 1;
			}
			this.current = 0;
			this._init();
		}
	
		Stack.prototype.options = {
			// stack's perspective value
			perspective: 1000,
			// stack's perspective origin
			perspectiveOrigin : '150% 50%',
			// number of visible items in the stack
			visible : 4,
			// infinite navigation
			infinite : true,
			// callback: when reaching the end of the stack
			onEndStack : function() {return false;},
			// animation settings for the items' movements in the stack when the items rearrange
			// object that is passed to the dynamicsjs animate function (see more at http://dynamicsjs.com/)
			// example:
			// {type: dynamics.spring,duration: 1641,frequency: 557,friction: 459,anticipationSize: 206,anticipationStrength: 392}
			stackItemsAnimation : {
				duration : 500,
				type : dynamics.bezier,
				points : [{'x':0,'y':0,'cp':[{'x':0.25,'y':0.1}]},{'x':1,'y':1,'cp':[{'x':0.25,'y':1}]}]
			},
			// delay for the items' rearrangement / delay before stackItemsAnimation is applied
			stackItemsAnimationDelay : 0,
			// animation settings for the items' movements in the stack before the rearrangement
			// we can set up different settings depending on whether we are approving or rejecting an item
			/*
			stackItemsPreAnimation : {
				reject : {
					// if true, then the settings.properties parameter will be distributed through the items in a non equal fashion
					// for instance, if we set settings.properties = {translateX:100} and we have options.visible = 4, 
					// then the second item in the stack will translate 100px, the second one 75px and the third 50px
					elastic : true,
					// object that is passed into the dynamicsjs animate function - second parameter -  (see more at http://dynamicsjs.com/)
					animationProperties : {},
					// object that is passed into the dynamicsjs animate function - third parameter - (see more at http://dynamicsjs.com/)
					animationSettings : {} 
				},
				accept : {
					// if true, then the settings.properties parameter will be distributed through the items in a non equal fashion
					// for instance, if we set settings.properties = {translateX:100} and we have options.visible = 4, 
					// then the second item on the stack will translate 100px, the second one 75px and the third 50px
					elastic : true,
					// object that is passed into the dynamicsjs animate function - second parameter -  (see more at http://dynamicsjs.com/)
					animationProperties : {},
					// object that is passed into the dynamicsjs animate function (see more at http://dynamicsjs.com/)
					animationSettings : {}
				}
			}
			*/
		};
	
		// set the initial styles for the visible items
		Stack.prototype._init = function() {
			// set default styles
			// first, the stack
			this.el.style.WebkitPerspective = this.el.style.perspective = this.options.perspective + 'px';
			this.el.style.WebkitPerspectiveOrigin = this.el.style.perspectiveOrigin = this.options.perspectiveOrigin;
	
			var self = this;
	
			// the items
			for(var i = 0; i < this.itemsTotal; ++i) {
				var item = this.items[i];
				if( i < this.options.visible ) {
					item.style.opacity = 1;
					item.style.pointerEvents = 'auto';
					item.style.zIndex = i === 0 ? parseInt(this.options.visible + 1) : parseInt(this.options.visible - i);
					item.style.WebkitTransform = item.style.transform = 'translate3d(0px, 0px, ' + parseInt(-1 * 50 * i) + 'px)';
				}
				else {
					item.style.WebkitTransform = item.style.transform = 'translate3d(0,0,-' + parseInt(this.options.visible * 50) + 'px)';
				}
			}
	
			classie.add(this.items[this.current], 'stack__item--current');
		};
	
		Stack.prototype.reject = function(callback) {
			this._next('reject', callback);
		};
	
		Stack.prototype.accept = function(callback) {
			this._next('accept', callback);
		};
	
		Stack.prototype.restart = function() {
			this.hasEnded = false;
			this._init();
		};
	
		Stack.prototype._next = function(action, callback) {
			if( this.isAnimating || ( !this.options.infinite && this.hasEnded ) ) return;
			this.isAnimating = true;
	
			// current item
			var currentItem = this.items[this.current];
			classie.remove(currentItem, 'stack__item--current');
	
			// add animation class
			classie.add(currentItem, action === 'accept' ? 'stack__item--accept' : 'stack__item--reject');
	
			var self = this;
			onEndAnimation(currentItem, function() {
				// reset current item
				currentItem.style.opacity = 0;
				currentItem.style.pointerEvents = 'none';
				currentItem.style.zIndex = -1;
				currentItem.style.WebkitTransform = currentItem.style.transform = 'translate3d(0px, 0px, -' + parseInt(self.options.visible * 50) + 'px)';
	
				classie.remove(currentItem, action === 'accept' ? 'stack__item--accept' : 'stack__item--reject');
	
				self.items[self.current].style.zIndex = self.options.visible + 1;
				self.isAnimating = false;
	
				if( callback ) callback();
				
				if( !self.options.infinite && self.current === 0 ) {
					self.hasEnded = true;
					// callback
					self.options.onEndStack(self);
				}
			});
	
			// set style for the other items
			for(var i = 0; i < this.itemsTotal; ++i) {
				if( i >= this.options.visible ) break;
	
				if( !this.options.infinite ) {
					if( this.current + i >= this.itemsTotal - 1 ) break;
					var pos = this.current + i + 1;
				}
				else {
					var pos = this.current + i < this.itemsTotal - 1 ? this.current + i + 1 : i - (this.itemsTotal - this.current - 1);
				}
	
				var item = this.items[pos],
					// stack items animation
					animateStackItems = function(item, i) {
						item.style.pointerEvents = 'auto';
						item.style.opacity = 1;
						item.style.zIndex = parseInt(self.options.visible - i);
						
						dynamics.animate(item, {
							translateZ : parseInt(-1 * 50 * i)
						}, self.options.stackItemsAnimation);
					};
	
				setTimeout(function(item,i) {
					return function() {
						var preAnimation;
	
						if( self.options.stackItemsPreAnimation ) {
							preAnimation = action === 'accept' ? self.options.stackItemsPreAnimation.accept : self.options.stackItemsPreAnimation.reject;
						}
						
						if( preAnimation ) {
							// items "pre animation" properties
							var animProps = {};
							
							for (var key in preAnimation.animationProperties) {
								var interval = preAnimation.elastic ? preAnimation.animationProperties[key]/self.options.visible : 0;
								animProps[key] = preAnimation.animationProperties[key] - Number(i*interval);
							}
	
							// this one remains the same..
							animProps.translateZ = parseInt(-1 * 50 * (i+1));
	
							preAnimation.animationSettings.complete = function() {
								animateStackItems(item, i);
							};
							
							dynamics.animate(item, animProps, preAnimation.animationSettings);
						}
						else {
							animateStackItems(item, i);
						}
					};
				}(item,i), this.options.stackItemsAnimationDelay);
			}
	
			// update current
			this.current = this.current < this.itemsTotal - 1 ? this.current + 1 : 0;
			classie.add(this.items[this.current], 'stack__item--current');
		}
	
		window.Stack = Stack;
	
	})(window);
	
	//Инициализация слайдера
	(function() {
				
		var support = { animations : Modernizr.cssanimations },
			animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			onEndAnimation = function( el, callback ) {
				var onEndCallbackFn = function( ev ) {
					if( support.animations ) {
						if(ev.target != this) return;
						this.removeEventListener( animEndEventName, onEndCallbackFn);
					}
					if(callback && typeof callback === 'function') {callback.call();}
				};
				if( support.animations ) {
					el.addEventListener(animEndEventName, onEndCallbackFn);
				}
				else {
					onEndCallbackFn();
				}
			};

		function nextSibling(el) {
			var nextSibling = el.nextSibling;
			while(nextSibling && nextSibling.nodeType != 1) {
			nextSibling = nextSibling.nextSibling
			}
			return nextSibling;
		}
		
		const clickeventtype = 'click';

		var wangi = new Stack(document.getElementById('stack_wangi'), {
				stackItemsAnimationDelay: 240,
				stackItemsAnimation : {
					duration : 360,
					type : dynamics.bezier,
					points : [{'x':0,'y':0,'cp':[{'x':0.4,'y':1}]},{'x':1,'y':1,'cp':[{'x':0.3,'y':1}]}]
				},
			});

		// controls the click ring effect on the button
		var buttonClickCallback = function(bttn) {
			var bttn = bttn || this;
			bttn.setAttribute('data-state', 'unlocked');
		};

		document.querySelector('.button--accept[data-stack = stack_wangi]').addEventListener(clickeventtype, function() { wangi.accept(buttonClickCallback.bind(this)); });
		document.querySelector('.button--reject[data-stack = stack_wangi]').addEventListener(clickeventtype, function() { wangi.reject(buttonClickCallback.bind(this)); });

		[].slice.call(document.querySelectorAll('.button--sonar')).forEach(function(bttn) {
			bttn.addEventListener(clickeventtype, function() {
				bttn.setAttribute('data-state', 'locked');
			});
		});

		[].slice.call(document.querySelectorAll('.button--material')).forEach(function(bttn) {
			var radialAction = nextSibling(bttn.parentNode);

			bttn.addEventListener(clickeventtype, function(ev) {
				var boxOffset = radialAction.parentNode.getBoundingClientRect(),
					offset = bttn.getBoundingClientRect();

				radialAction.style.left = Number(offset.left - boxOffset.left) + 'px';
				radialAction.style.top = Number(offset.top - boxOffset.top) + 'px';

				classie.add(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
				classie.add(radialAction, 'material-circle--active');
				onEndAnimation(radialAction, function() {
					classie.remove(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
					classie.remove(radialAction, 'material-circle--active');
				});
			});
		});
	})();
	
	
});

