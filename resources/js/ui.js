//vh 값 계산 (for IOS)
let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
});

$(function(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('body').addClass('mobile');
  }
});

//Cursor
// $(window).on('scroll mousemove', function(e){
//   $('.cursor').css('left', e.pageX-60 + 'px');
//   $('.cursor').css('top', e.pageY-60 + 'px');
// });
/*$(document).on('hover','button,a',function(){
  $('.cursor').toggleClass('on');
});*/

//Menu
$(document).on('click','#header>div>button',function(){
  if($('#header').hasClass('opened')){
    $('#header').removeClass('opened');
  }
  else {
    $('#header').addClass('opened').removeClass('fixed');
  }
});
$(document).on('click','#header>div>div>button',function(){
  $('#header').removeClass('opened');
});
$(document).on('click','#header h1 button',function(){
  $("html, body").animate({ scrollTop: 0 }, 300);
  $('#header').removeClass('opened');
  return false;
});
$(document).on('click','#header nav a',function(){
  target = $(''+$(this).attr('href')+'').offset().top;
  $("html, body").animate({ scrollTop: target }, 300);
  $('#header').removeClass('opened');
  return false;
});

let lastScroll = 0;
$(window).on('scroll', function(){
  let scrollTop = $(this).scrollTop();
  headerHeight = $('#header').outerHeight();
  if(scrollTop > $('#howitworks').offset().top - 10) {
    $('#header nav a:nth-child(1)').addClass('current').siblings('a').removeClass('current');
  }
  if(scrollTop > $('#production').offset().top - 10) {
    $('#header nav a:nth-child(2)').addClass('current').siblings('a').removeClass('current');
  }
  if(scrollTop > $('#logistics').offset().top - 10) {
    $('#header nav a:nth-child(3)').addClass('current').siblings('a').removeClass('current');
  }
  if(scrollTop > $('#fulfillment_new').offset().top - 10) {
    $('#header nav a:nth-child(4)').addClass('current').siblings('a').removeClass('current');
  }
  if(scrollTop > $('#management').offset().top - 10) {
    $('#header nav a:nth-child(5)').addClass('current').siblings('a').removeClass('current');
  }
  if(scrollTop > lastScroll) {
    $('#header').removeClass('fixed');
    if(scrollTop > headerHeight){
      $('#header').addClass('temp');
    }
  }
  else {
    if(scrollTop > 0){
      $('#header').addClass('fixed').removeClass('temp');
    }
    else {
      $('#header').removeClass('fixed');
    }
  }
  lastScroll = scrollTop;
});

//Production, Logistics, Fulfillment
$(window).on('scroll',function(){
  $('.production .swiper-slide,.logistics .swiper-slide').each(function(){
    $this = $(this);
    index = $this.index() +1;
    $target = $this.closest('.swiper').siblings('.thumb').find('>li:nth-child('+index+')');
    if ($(window).scrollTop() > $this.offset().top - 400){
      $target.addClass('selected').siblings('li').removeClass('selected');
    }
  });
  $('.metrics li').each(function(){
    $this = $(this);
    if ($(window).scrollTop() > $this.offset().top - 700) {
      $this.addClass('on');
    }
    else {
      $this.removeClass('on');
    }
  });

  // var fulfillmentTop = $('.fulfillment').offset().top;
  // if($(window).scrollTop() > fulfillmentTop - 50) {
  //   $("html, body").animate({ scrollTop: fulfillmentTop }, 300);
  //   setTimeout(function(){
  //     $('.fulfillment').addClass('sticky');
  //     $('body').css('overflow', 'hidden');
  //   },300);
  // }

  // if($(window).scrollTop() > $('.fulfillment').offset().top - 50) {
  //   if($(window).scrollTop() < $('.metrics').offset().top){
  //     $('.fulfillment').addClass('sticky');
  //     $('body').css('overflow', 'hidden');
  //   }
  //   else {
  //     $('.fulfillment').removeClass('sticky');
  //     $('body').css('overflow', 'auto');
  //   }
  // }
  // else {
  //   $('.fulfillment').removeClass('sticky');
  //   $('body').css('overflow', 'auto');
  // }
});

