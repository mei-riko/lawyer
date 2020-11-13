import $ from 'jquery'
import '../../node_modules/popper.js/dist/umd/popper';
import '../../node_modules/bootstrap/js/dist/util';
import '../../node_modules/bootstrap/js/dist/tooltip';
import '../../node_modules/bootstrap/js/dist/collapse';

import './navbar/navbar';


$(document).ready(() =>{
  $(".scroll").click(function() {
    $("html, body").animate({
       scrollTop: $($(this).attr("href")).offset().top + "px"
    }, {
       duration: 500,
       easing: "swing"
    });
    return false;
  });
  // Input mask
  if( $('.phone').length > 0 ) {
    $(".phone").inputmask({
      mask: "+7 999 999 99 99",
      placeholder: " ",
      showMaskOnHover: true,

      onincomplete: function(){ 
        $(this).closest("form").addClass('error-phone'); 
        $(this).addClass('error'); 
        $(this).siblings(".error_phone").addClass('error').html('Укажите корректный номер'); 
      }, 
      oncomplete: function(){ 
        $(this).closest("form").removeClass('error-phone'); 
        $(this).removeClass('error'); 
        $(this).siblings(".error_phone").removeClass('error').html(''); 
      },
    })
  }
  $('input.phone').on('keydown', function(event) {
    if (event.keyCode === 13 && !$(this).inputmask("isComplete") ) {
      event.preventDefault();
      $(this).blur();
      return false;
    }
  });
  if( $('.phoneEN').length > 0 ) {
    $(".phoneEN").inputmask({
      mask: "+7 999 999 99 99",
      placeholder: " ",
      showMaskOnHover: true,

      onincomplete: function(){ 
        $(this).closest("form").addClass('error-phone'); 
        $(this).addClass('error'); 
        $(this).siblings(".error_phone").addClass('error').html('Enter the correct number'); 
      }, 
      oncomplete: function(){ 
        $(this).closest("form").removeClass('error-phone'); 
        $(this).removeClass('error'); 
        $(this).siblings(".error_phone").removeClass('error').html(''); 
      },
    })
  }
  $('input.phoneEN').on('keydown', function(event) {
    if (event.keyCode === 13 && !$(this).inputmask("isComplete") ) {
      event.preventDefault();
      $(this).blur();
      return false;
    }
  });
  
  // Подсказка
	$('[data-toggle="tooltip"]').tooltip();
  // Modal
  $('[data-fancybox]').fancybox({
    touch: false,
    autoFocus: false
  });
  // Отмена стандартного поведения ссылки
  $('a[data-trigger="click"]').click(function(e){
    e.preventDefault();
  })
  

  // Maps
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2Vic29obyIsImEiOiJja2d0YnU3aWowY3F4MnluYXlibG5iZ2NpIn0.DQPwEXGmBRF4POGeXYf1Sw';
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');

  if( $('#map').length > 0){
    let map = new mapboxgl.Map({
      container: 'map',
      center: [30.329028, 59.942980],
      zoom: 12,
      style: 'mapbox://styles/mapbox/light-v9'
    }); 
    let marker = new mapboxgl.Marker()
                      .setLngLat([30.329028, 59.942980])
                      .addTo(map);

    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
    map.addControl(new MapboxLanguage({
      defaultLanguage: 'ru'
    }));
  }
  if( $('#mapEN').length > 0){
    let map = new mapboxgl.Map({
      container: 'mapEN',
      center: [30.329028, 59.942980],
      zoom: 12,
      style: 'mapbox://styles/mapbox/light-v9'
    }); 
    let marker = new mapboxgl.Marker()
                      .setLngLat([30.329028, 59.942980])
                      .addTo(map);

    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
  }
  if( $('#map-modal').length > 0){
    var mapModal = new mapboxgl.Map({
      container: 'map-modal',
      center: [30.329028, 59.942980],
      zoom: 12,
      style: 'mapbox://styles/mapbox/light-v9'
    }); 
    let marker = new mapboxgl.Marker()
                      .setLngLat([30.329028, 59.942980])
                      .addTo(mapModal);

    let nav = new mapboxgl.NavigationControl();
    mapModal.addControl(nav, 'top-left');
    mapModal.addControl(new MapboxLanguage({
      defaultLanguage: 'ru'
    }));
  }
  if( $('#map-modalEN').length > 0){
    var mapModal = new mapboxgl.Map({
      container: 'map-modalEN',
      center: [30.329028, 59.942980],
      zoom: 12,
      style: 'mapbox://styles/mapbox/light-v9'
    }); 
    let marker = new mapboxgl.Marker()
                      .setLngLat([30.329028, 59.942980])
                      .addTo(mapModal);

    let nav = new mapboxgl.NavigationControl();
    mapModal.addControl(nav, 'top-left');
  }
  $('[data-fancybox="maps"]').fancybox({
    autoFocus: false,
    touch: false,
    afterShow : function( instance, current ) {
      mapModal.resize();
    }
  });

  // Switch Lang
  $(".header .header__lang").on("click", function(){
    var pathname = window.location.pathname;
    var origin   = window.location.origin;

    if( !$(this).hasClass("header__lang--active") ){
      $(".header .header__lang.header__lang--active").removeClass("header__lang--active");
      let lang = $(this).data("href");
      if ( lang == "ru" ){
        window.location.href = origin + pathname.replace('/en', '');
        // console.log( origin + pathname.replace('/en', '') );
      }
      if ( lang == "en" ){
        window.location.href = origin + "/" + lang + pathname;
        // console.log( origin + "/" + lang + pathname);
      }
      $(this).addClass("header__lang--active");
    }
  });
});