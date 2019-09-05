$(document).ready(function(){
	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: 0
		}, 300);
	});
 
	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});
});

// const backToTopButton = document.querySelector("#ir-arriba");

// window.addEventListener("scroll", scrollfunction);

// function scrollfunction() {
// 	if(window.pageYOffset > 0){
// 		$('#ir-arriba').slideDown(300);
// 	}else{
// 		$('#ir-arriba').slideUp(300);
// 	}
// }
// backToTopButton.addEventListener("click", subir);

//  function subir() {
// 	 window.scrollTo(0,0);
//  }