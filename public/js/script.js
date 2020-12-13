$(window).on("load",function(){
	'use strict';
    
	$('.loader-screen').fadeOut('slow');

    /* header active on scroll more than 50 px*/
    if ($(this).scrollTop() >= 30) {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }

    $(window).on('scroll', function () {
        /* header active on scroll more than 50 px*/
        if ($(this).scrollTop() >= 30) {
            $('.header').addClass('active');
        } else {
            $('.header').removeClass('active');
        }
    });

});/*--- window.load end here ---*/


$(document).ready(function(){
  'use strict';
	
// topbar toogle setting dropdown 
	$('#night-mode').on('change', function() {
		if ($(this).is(':checked')) {
			// Show popup window
			$(".app-layout").addClass('theme-black');	
		}
		else {
			$(".app-layout").removeClass("theme-black");
		}
	});
	
//------ scrollbar plugin
	if ($.isFunction($.fn.perfectScrollbar)) {
		$('.app-layout').perfectScrollbar();
	}	
	
//chosen select plugin
	if ($.isFunction($.fn.chosen)) {
		$("select").chosen();
	}	
	
//----- popup display on window load	
	function delay(){
		$(".ad-wraper").fadeIn();
	}
	window.setTimeout( delay, 4000 );

	$('#timer, .close').on('click', function() {
	  $('.ad-wraper').addClass('closed');
	  return false;
	});
	
// calendar date picker	
	
	
if ($.isFunction($.fn.datepicker)) {
	$('#datepicker').datepicker({
		dateFormat: "dd-mm-yy",	
		duration: "fast"
	});
}
	
	
//----- add item plus minus button
	if ($.isFunction($.fn.userincr)) {
		$(".manual-adjust").userincr({
			buttonlabels:{'dec':'-','inc':'+'},
		}).data({'min':0,'max':20,'step':1});
	}	
	
//----- sticky header
    if ($.isFunction($.fn.stickit)) {
        $('.topbar').stickit({scope: StickScope.Document});
    }

// delete cart item
	$('.del-cart-item').on("click", function(){
		$(this).parent().slideUp();
		return false;
	  });


// Stories slide show
	$('.story-user').on('click', function () {
		$('.stories-wraper').addClass('active');
	});
		$('.close-story').on('click', function () {
		$('.stories-wraper').removeClass('active');
	});	
	
// chat attachments
	$('.more-attachments').on('click', function () {
		$('.attach-options').addClass('active');
		$(this).addClass('active');
	});
		$('.closed').on('click', function () {
		$('.more-attachments, .attach-options').removeClass('active');
	});	
	
 // Slide Panel Toggle ***//
	  $(".ac-settings").on("click", function(){
	     $(".side-slide").toggleClass('active');
		  $(".app-layout").toggleClass('active');
		  return false;
	  });

	  $('.close-btn').on("click",function(){
		  $(".app-layout").removeClass('active');
	     $(".side-slide").removeClass('active');
	  });

 // top search ***//
	  $(".top-search").on("click", function(){
	     $(".search-post").addClass('active');
		  return false;
	  });

	  $('.close-btn').on("click",function(){
		  $(".search-post").removeClass('active');
	  });

 // create new popup ***//
	  $(".new-post").on("click", function(){
	     $(".create-new").addClass('active');
		  return false;
	  });

	  $('.close-btn').on("click",function(){
		  $(".create-new").removeClass('active');
	  });

 // share post popup //
	  $(".share-to").on("click", function(){
	     $(".share-wraper").addClass('active');
		  return false;
	  });

	  $('.close-btn').on("click",function(){
		  $(".share-wraper").removeClass('active');
	  });

// add class on click	
	$('.share-options > ul > li a').on('click', function () {
		$(this).toggleClass('active');
	});		   	   

// top menu list	
	$('.comment-to, .reply-coment').on('click', function () {
		$(this).siblings('.new-comment').slideToggle(300);
	});

// new post options	
	$('.more-alt').on('click', function () {
		$('.more-alt-options').slideToggle(300);
	});		 

// add class on click	
	$('.stat-tools > a').on('click', function () {
		$(this).toggleClass('active');
	});

// share to friends	
	$('li.friends').on('click', function () {
		$('.friends-to').slideToggle(300);
	});	

	$('li.socialz').on('click', function () {
		$('.social-media').slideToggle(300);
	});				 
	
//---- nav button hamburger style	
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
 
//--- menu open on click hamburger button 	
	$('.menu-button').on('click', function(){
	  $('body').toggleClass('open');
	});

//--- add class on mouse hover 
	$('.loacation > ul > li').mouseover(function(){
		$('.loacation > ul > li').removeClass("active");
		$(this).addClass("active");
		$('.location-pins > span').addClass("active");

	});

	
//--- owl carousel 
	if ($.isFunction($.fn.owlCarousel)) {
		$('.page-caro').owlCarousel({
			items: 5,
			loop: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: true,
			dots: false,
			responsiveClass:true,
				responsive:{
					0:{
						items:5,
					},
					600:{
						items:5,

					},
					1000:{
						items:5,
					}
				}

		});
		
		$('.story-status').owlCarousel({
			items: 5,
			loop: true,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			responsiveClass:true,
				responsive:{
					0:{
						items:5,
					},
					600:{
						items:5,

					},
					1000:{
						items:5,
					}
				}

		});
		
		$('.suggested-groups').owlCarousel({
			items: 3,
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			responsiveClass:true,
				responsive:{
					0:{
						items:3,
					},
					600:{
						items:5,

					},
					1000:{
						items:5,
					}
				}

		});
		
		$('.event-caro').owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			responsiveClass:true,
				responsive:{
					0:{
						items:1,
					},
					600:{
						items:1,

					},
					1000:{
						items:1,
					}
				}

		});
		
		$('.product-caro').owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: true,
			responsiveClass:true,
				responsive:{
					0:{
						items:1,
					},
					600:{
						items:1,

					},
					1000:{
						items:1,
					}
				}

		});
		
		$('.prod-categ').owlCarousel({
			items: 5,
			loop: true,
			margin: 30,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			responsiveClass:true,
				responsive:{
					0:{
						items:5,
					},
					600:{
						items:5,

					},
					1000:{
						items:5,
					}
				}

		});
		
		
		$('.welcome-caro').owlCarousel({
			items: 1,
			loop: false,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: true,
			responsiveClass:true,
				responsive:{
					0:{
						items:1,
					},
					600:{
						items:1,

					},
					1000:{
						items:1,
					}
				}

		});
		
		$('.mov-caro').owlCarousel({
			items: 1,
			loop: false,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: true,
			responsiveClass:true,
				responsive:{
					0:{
						items:1,
					},
					600:{
						items:1,

					},
					1000:{
						items:1,
					}
				}

		});
		
		$('.movie-cat').owlCarousel({
			items: 5,
			loop: true,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 2500,
			smartSpeed: 1000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			responsiveClass:true,
				responsive:{
					0:{
						items:5,
					},
					600:{
						items:5,

					},
					1000:{
						items:5,
					}
				}

		});
		
		
	}
	
/*--- tabs ---*/
	$(".tabContent").hide(); 
	  $("ul.tabs li:first").addClass("active").show(); 
	  $(".tabContent:first").show(); 

	  $("ul.tabs li").click(function () {
		$("ul.tabs li").removeClass("active"); 
		$(this).addClass("active"); 
		$(".tabContent").hide(); 
		var activeTab = $(this).find("a").attr("href"); 
		$(activeTab).fadeIn(); 
		return false;
  });
	
	
/*--- like hover emojies ---*/
/*(function () {
    var likeLink = document.querySelector('.Like__link');
    likeLink.addEventListener('mouseenter', function () {
        likeLink.classList.remove('js-hover');
    });
    setTimeout(function () {
        likeLink.classList.remove('js-hover');
    }, 5000);
}());*/
	
/*--- ad timer ---*/
var timeleft = 10;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("timer").innerHTML = "Close";
  } else {
    document.getElementById("timer").innerHTML = timeleft + "";
  }
  timeleft -= 1;
}, 1000);
	
/*--- QA accordion ---*/    
jQuery(".tabs-container .tab-content").hide();
jQuery(".tabs-container .tab-content.active").show();
jQuery(".verticle-tab a").on("click", function() {
    var hash = jQuery(this).attr('href');
    jQuery(".tabs-container").find(hash).slideDown('slow');
    jQuery(".tabs-container").find(hash).siblings().slideUp('slow');
    return false;
});

  
});//===== Document Ready Ends =====//

/*--- back button ---*/
$('.back-btn').on( 'click',function (e){
	"use strict";
        e.preventDefault();
        window.history.back();
    });










