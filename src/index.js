require('normalize.css/normalize.css');
require('./styles/styles.scss');

import modernizr from "./js/modernizr";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
require('chosen-js/chosen.jquery.min.js');

import Swiper, { Navigation, Pagination, Controller, EffectFade } from 'swiper'

Swiper.use([
    Navigation,
    Pagination,
    Controller,
    EffectFade,
])

function scrollToElement(el, offset)
{
    if (offset === undefined)
        offset = 0;

    var duration = 600;
    var element = $(el).offset();
    var pos = element.top + offset;
    $('html, body').animate({scrollTop: pos}, duration);
}


$(document).ready(function () {

    $('body').on('click',function(e){
        if( !$(e.target).closest('.header-search-toggle').length && !$(e.target).closest('.header-search').length){
            $('body').removeClass('search-active')
        }
    })
    .on('click', '.mobile-menu-toggle', function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
    })
    .on('click', '.js-scroll-to', function (e) {
        e.preventDefault();
       var targ = $(this).attr('href');
       scrollToElement(targ, -100)
    })
    .on('click', '.map-objects-toggle', function (e) {
        e.preventDefault();
       $('.map-container').toggleClass('list-active');
    })
    .on('click', '.header-menu a', function (e) {
    	e.preventDefault();
       	var targ = $(this).attr('href');
       	scrollToElement(targ, -100);
       	$('.header-menu a').removeClass('active');
       	$(this).addClass('active');
    });

    $(window).scroll(function () {
        if ( $(this).scrollTop() > 80 )
            $('.header').addClass('header-fxd');
        else
			$('.header').removeClass('header-fxd');
	})

    $('.custom-select').chosen({
        width: "100%",
        disable_search: true,
        allow_single_deselect: true
    });


	new Swiper(document.querySelector('.js-main-slider'), {
		loop: false,
		pagination: {
			el: '.js-main-slider .swiper-pagination',
			clickable: true
		},
		slidesPerView: 'auto',
	});


});
