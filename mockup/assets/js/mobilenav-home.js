$(document).ready(function() {
	
	/* ==========================================================================
		Mobile Nav & Blog Sidebar
	   ========================================================================== */
	$(document).on('click', '.mobile-nav a, .logo a', function(e) {
		e.preventDefault();
		$('body').removeClass('nav-open');

		let link = $(this).attr('href'),
			currentTop = $(window).scrollTop(),
			rate = 0.2, 
			target = $(link).offset();
			distance = Math.abs(currentTop - target.top);
		setTimeout(function(){ 
			$([document.documentElement, document.body]).animate({
				scrollTop: $(link).offset().top
			}, distance * rate);
		}, 100);
	});

	$(window).on('scroll', function(){
		if ($(window).width() < 960){
			$('.page').each(function(){
				let page = $(this);
				if(page.visible(true)){
					page.addClass('active')
					page.siblings().removeClass('active');
					page.find('.content').css('display', 'block');
					page.siblings().find('.content').removeAttr('style');
				}
			});
		}
	});
});