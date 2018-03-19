$(document).ready(function () {
  var indexColor;
  var safe = true;
  $('.navbar-mobile .botao-mobile').click(function () {

    var menu = $('.menu-mobile .topicosMenu');
    if (menu.is(":visible") && safe){
      //Fazer o menu desaparecer
      safe = false;
      $(document.body).css({"overflow": "initial"});
      $('.menu-mobile .topicosMenu ul').slideToggle("slow", function () {});
      $('.menu-mobile .topicosMenu').slideToggle("slow", function () {
        $('.index .zonaMenu').animate({backgroundColor: indexColor}, 'slow', function(){safe = true;});
      });
      $('.menu-mobile .topicosMenu .menu-contentor').slideToggle("slow", function () {
        if(document.body.className.indexOf("index") == -1)
          safe = true;
      });
    } //if

    else if(safe) {
      //Fazer o menu reaparecer
      safe = false;
      indexColor = $('.index .zonaMenu').css("background-color");
      $('.index .zonaMenu').css("background-color", "rgba(6, 41, 64, 1)");
      $('.menu-mobile .topicosMenu').slideToggle("fast", function () {
        $(".menu-mobile .topicosMenu").css({"position": "absolute"}, {"overflow": "scroll"}, {"z-index": "10"});
        $(document.body).css({"overflow": "hidden"});
        safe = true;
      });
      $('.menu-mobile .menu-contentor').slideToggle("slow", function () {});
    } //else
  });

  $('.menu-mobile button').click(function() {
    if(safe) {
      //Fazer o menu desaparecer
      safe = false;
      $(document.body).css({"overflow": "initial"});
      $('.menu-mobile .topicosMenu ul').slideToggle("slow", function () {});
      $('.menu-mobile .topicosMenu').slideToggle("slow", function () {
        $('.index .zonaMenu').animate({backgroundColor: indexColor}, 'slow', function(){safe = true;});
      });
      $('.menu-mobile .topicosMenu .menu-contentor').slideToggle("slow", function () {
        if(document.body.className.indexOf("index") == -1)
          safe = true;
      });
    } //if
  });

  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();
      if (scrollTop >= 100)
        $('.index .zonaMenu').css("background-color", "rgba(6, 41, 64, 1)");
      else
        $('.index .zonaMenu').css("background-color", "rgba(6, 41, 64, " + (scrollTop/100) + ")");
    });
});
