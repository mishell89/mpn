require('normalize.css/normalize.css');
require('./styles/styles.scss');

import modernizr from "./js/modernizr";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import PopperJs from 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/tooltip';

import slick from 'slick-carousel';
require("@fancyapps/fancybox");
require('chosen-js/chosen.jquery.min.js');
require('./js/starrr.js');
require('./js/bootstrap-tagsinput.min');
require('sticky-kit/dist/sticky-kit.js');
import noUiSlider from "./js/nouislider.min.js";
import Scrollbar from 'smooth-scrollbar';
require('./js/bootstrap-datepicker.js');
require('./js/locales/bootstrap-datepicker.ru.js');
require('./js/moment.min.js');
require('./js/daterangepicker.min');

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
    if (typeof popup != "undefined" && popup){
        setTimeout(function () {
            $.fancybox.open({
                src: popup,
                buttons: [],
                touch: false,
                hash: false
            });
        }, 2000);
    }


    $('body').on('click',function(e){
        if( !$(e.target).closest('.header-search-toggle').length && !$(e.target).closest('.header-search').length){
            $('body').removeClass('search-active')
        }
        if( !$(e.target).closest('.js-share-toggle').length && !$(e.target).closest('.js-share-dropdown').length){
            $('.js-share').removeClass('active')
        }
        if( !$(e.target).closest('.cart-link').length && !$(e.target).closest('.header-cart-container').length){
            $('body').removeClass('cart-active')
        }
        if( !$(e.target).closest('.news-detail-top-share').length){
            $('.news-detail-top-share').removeClass('active')
        }
    })
    .on('change','input[type=file]',function () {

        var names = [];
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            names.push($(this).get(0).files[i].name);
        }

        if (names.length > 0) {
            $(this).parents('.type-file').find('.type-file-text').empty();
            for (var i = 0; i< names.length; i++){
                $(this).parents('.type-file').find('.type-file-text').append('<p>'+names[i]+'</p>')
            }
            $(this).parents('.type-file').addClass('active')
        }
        else{
            $(this).parent('.type-file').removeClass('active')
        }
    })
    .on('click', '.header-search-toggle', function (e) {
        e.preventDefault();
        $('body').toggleClass('search-active');
    })
    .on('change', '[name="children"]', function (e) {
        e.preventDefault();
        if ( $(this).val()=='Y' )
            $('.children-section').addClass('active')
        else
			$('.children-section').removeClass('active')
    })
    .on('click', '.dropdown-checkboxes .dropdown-menu', function (e) {
        e.stopImmediatePropagation();
    })
    .on('click', '.js-comment-toggle', function (e) {
        e.preventDefault();
        $(this).parents('.comment-item').toggleClass('active');
    })
    .on('click', '.cart-link', function (e) {
        e.preventDefault();
        $('body').toggleClass('cart-active');
    })
    .on('click', '.mobile-menu-toggle', function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
    })
    .on('click', '.popup-close', function (e) {
        e.preventDefault();
        $.fancybox.close();
    })
    .on('click', '.js-scroll-to', function (e) {
        e.preventDefault();
       var targ = $(this).attr('href');
       scrollToElement(targ, -100)
    })
    .on('click', '.partner-text-toggle', function (e) {
        e.preventDefault();
       $(this).parents('.sponsor-text-wrap').toggleClass('active');
    })
    .on('click','.count-inputs a.pl',function(e){
        e.preventDefault();
        $(this).parent().find('.min').removeClass('disabled');
        var curVal = parseInt($(this).parent().find('input').val())+1;
        if ($(this).parents('.count-inputs').hasClass('count-inputs-text'))
            $(this).parent().find('input').val(curVal+' шт');
        else
            $(this).parent().find('input').val(curVal);
    })
    .on('click','.count-inputs a.min',function(e){
        event.preventDefault();
        var curVal = parseInt($(this).parent().find('input').val())-1;
        if(curVal<2){
            curVal = 1;
            $(this).addClass('disabled')
        }
        if ($(this).parents('.count-inputs').hasClass('count-inputs-text'))
            $(this).parent().find('input').val(curVal+' шт');
        else
            $(this).parent().find('input').val(curVal);
    })
    .on('submit', '.popup-upload-content', function (e) {
        e.preventDefault();
        $.fancybox.close();
        $.fancybox.open({
            src: 'upload-success.html',
            type: 'ajax',
            buttons: [],
            touch: false,
            hash: false
        });
        return false;
    })
    .on('click', '.js-bonus-add', function (e) {
        $('#order_bonus_val').val($(this).data('val'))
    })
    .on('click', '.js-goods-photo', function (e) {
        e.preventDefault();
        var targ = $(this).attr('href');
        $.fancybox.open({
            src: targ,
            type: 'ajax',
            buttons: [],
            touch: false,
            hash: false
        });
    })

    .on('click', '.js-parent-row', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.'+$(this).data('target')).toggleClass('row-active');
    });


    $('.datepicker-input').datepicker({
        language: "ru",
        todayHighlight: true,
		orientation: "bottom left",
		autoclose: true
    });



    $('.rating-value').each(function () {
        var start = $(this).data('rating') ? $(this).data('rating') : 0,
            ro = $(this).data('readonly') ? true : false,
            elem = $(this);
        if (ro)
            elem.addClass('readonly')
       $(this).starrr({
           rating: start,
           readOnly: ro,
           change: function(e, value){
               $(this).parents('.rating-container').find('.star-input').val(value)
           }
       })
    });

    $('.starrr')

    $('.custom-select').chosen({
        width: "100%",
        disable_search: true,
        allow_single_deselect: true
    });
    $('#dates_range').daterangepicker({
		"autoApply": true,
		"locale": {
			"format": "DD/MM/YYYY",
			"separator": " - ",
			"applyLabel": "Применить",
			"cancelLabel": "Отменить",
			"fromLabel": "С",
			"toLabel": "По",
			"customRangeLabel": "Период",
			"weekLabel": "Н",
			"daysOfWeek": [
				"Вс",
				"Пн",
				"Вт",
				"Ср",
				"Чт",
				"Пт",
				"Сь"
			],
			"monthNames": [
				"Янваоь",
				"Фераль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь"
			],
			"firstDay": 1
		},
		"alwaysShowCalendars": true,
		"startDate": "09/06/2020",
		"endDate": "09/12/2020",
		"opens": "left"
	}, function(start, end, label) {
		console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
	});


    $('[data-fancybox="photoes"],.review-list-item-attachments-item, .js-detail-gallery').fancybox({
        buttons: [
            "zoom",
            "close"
        ],
        hash: false
    });

    $('[data-fancybox="upload-popup"]').fancybox({
        buttons: [],
        touch: false,
        hash: false
    });


    $(".js-catalogue-slider").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }

            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }

            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '30px'
                }

            }
        ]
    });


});
