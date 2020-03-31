$("body").mouseenter(function(){
	console.log(window.pageXOffset)
	console.log(window.pageYOffset)
});
$(".top-container").mouseenter(function(){
	$(".inner-paragraph").animate({
	right:"220px",
});

});

$("#login").click(function(){
$(".inner-right").fadeOut();
$(".error").fadeOut();
$(".login").animate({
left:'430px',
opacity:'1',
});
});

$("#features").click(function(){
	$(".middle-container").animate({
		opacity:'1',
	});
	 window.scrollBy(0,459);
});

$(".middle-container").mouseenter(function(){
	$(".middle-container").animate({
		opacity:'1',
	});
});

$("#about").click(function(){
	$(".tesitimonials").animate({
		opacity:'1',
	});
	 window.scrollBy(0,655);
});

$(".tesitimonials").mouseenter(function(){
	$(".tesitimonials").animate({
		opacity:'1',
	});
});

