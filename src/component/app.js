import $ from 'jquery'
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

  // Modal
  $('[data-fancybox]').fancybox({
    autoFocus: false
  });
  // Отмена стандартного поведения ссылки
  $('a[data-trigger="click"]').click(function(e){
    e.preventDefault();
  })
  // Раскрытие блока
  $('.toggle-item').on("click", function(e){
    e.preventDefault();
    let toggle = $(this);
    if( !toggle.hasClass("toggle-item--active")){
      toggle.addClass("toggle-item--active");
      toggle.find(".toggle-item__title").addClass("toggle-item__title--active");
      toggle.find(".toggle-item__content").slideDown();
		}else{
			toggle.removeClass("toggle-item--active");
      toggle.find(".toggle-item__title").removeClass("toggle-item__title--active");
      toggle.find(".toggle-item__content").slideUp();
    }
  });
  // Слайдер
	if( $('.slider').length > 0 ){
    // Review Block Col
    let $slickReview = $('#reviews');
		$slickReview.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows      : true,
			dots        : true,
      autoplay  : false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            arrows: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            arrows: false,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            arrows: false,
            dots: true
          }
        }
      ]
    });
  }
	// Mobile Navbar
  $(".navbar-toggle#nav").on("click", function(e){
		e.preventDefault();
    let navbar = $(".navbar-collapse");
		if( !navbar.hasClass("navbar-collapse--active")){
			navbar.addClass("navbar-collapse--active");
			$(".navbar-overlay").addClass("navbar-overlay--active");
		}else{
			navbar.removeClass("navbar-collapse--active");
			$(".navbar-overlay").removeClass("navbar-overlay--active");
		}
  });
  $(".navbar-close").on("click", function(e){
    e.preventDefault();
    $(".navbar-collapse").removeClass("navbar-collapse--active");
    $(".navbar-overlay").removeClass("navbar-overlay--active");
  });
  $(document).mouseup(function (e){ // событие клика по веб-документу
    let dropdownActive = $(".navbar-collapse.navbar-collapse--active"); // элемент
    if (!dropdownActive.is(e.target) // клик был не по блоку
          // && dropdownActive.has(e.target).length === 0 // и не по его дочерним элементам
          && !$(".navbar-toggle#nav").is(e.target) ) { 
              $(".navbar-collapse").removeClass("navbar-collapse--active");
              $(".navbar-overlay").removeClass("navbar-overlay--active");
            }
  });
  // Hide Navigation on Desktop
  $(window).resize(function(){
    if ( $(window).width() > 991 || !window.matchMedia('screen and (max-width: 992px)').matches ){
      $(".navbar-toggle").removeClass("navbar-toggle--active");
        $(".navbar-collapse").removeClass("navbar-collapse--active");
        $(".navbar-overlay").removeClass("navbar-overlay--active");
    }
  });
});