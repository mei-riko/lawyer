import $ from 'jquery'
$(document).ready(() =>{
    $(".header .header__btn#open-nav").on("click", function(){
        $(".header .header__nav").toggleClass("header__nav--active");
        $("body").toggleClass("hidden");
        $("body").toggleClass("open-navbar");
    });
    $(".navbar.navbar_header #close-nav").on("click", function(){
        $(".navbar.navbar_header").removeClass("navbar_header--active");
        $(".navbar .navbar-inside.navbar-inside--active").removeClass("navbar-inside--active");

        $(".overlay").removeClass("overlay--navbar");
        $(".overlay").addClass("overlay--disable");
        
        $("body").removeClass("hidden");
        $("body").removeClass("open-navbar");
    });
    
    $(document).mouseup(function (e){ // событие клика по веб-документу
        let navActive = $(".header .header__nav.header__nav--active"); // элемент
        if (!navActive.is(e.target) // клик был не по блоку
            && navActive.has(e.target).length === 0 // и не по его дочерним элементам
            && !$("#open-nav").is(e.target) ) { 
                if( $("body").hasClass("open-navbar") ){ 
                    $("body").removeClass("hidden"); 
                    $("body").removeClass("open-navbar");
                }
                $(".header .header__nav").removeClass("header__nav--active");
            }
    });
});