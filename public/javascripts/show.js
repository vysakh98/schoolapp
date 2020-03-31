
var items=document.querySelectorAll('.dropdown-item')


$(".dropdown-item").eq(2).click(function(event){
	console.log(event)
	sessionStorage.setItem("click", "parent");
});
$(".dropdown-item").eq(3).click(function(event){
	console.log(event)
	sessionStorage.setItem("click", "stream");
});
$(".dropdown-item").eq(0).click(function(event){
	console.log(event)
	sessionStorage.setItem("click", "student");
});
$(".dropdown-item").eq(1).click(function(event){
	console.log(event)
	sessionStorage.setItem("click", "teacher");
});
$(".dropdown-item").eq(4).click(function(event){
	console.log(event)
	sessionStorage.setItem("click", "classMaster");
});
$(".dropdown-item").eq(5).click(function(event){
	console.log(event)
	sessionStorage.setItem("click", "department");
});




var clicked = sessionStorage.getItem("click");
console.log(clicked)

if(clicked=='classMaster'){
	$(".dropdown-item").eq(4).css('background-color','yellow')
}
if(clicked=='stream'){
	$(".dropdown-item").eq(3).css('background-color','yellow')
}
if(clicked=='student'){
	$(".dropdown-item").eq(0).css('background-color','yellow')
}
if(clicked=='teacher'){
	$(".dropdown-item").eq(1).css('background-color','yellow')
}
if(clicked=='department'){
	$(".dropdown-item").eq(5).css('background-color','yellow')
}
if(clicked=='parent'){
	$(".dropdown-item").eq(2).css('background-color','yellow')
}

$(".Logout").click(function(){
	sessionStorage.clear();
});

$("#deptnam").on('change',function(){
	var inner=$("#deptnam").val()
	console.log(inner)
	var param={'search':inner}
	$.get("/department/hod",param,function(data){
		option=''
		data.forEach(function(dat){
			console.log(dat)
			option += "<option value=" +dat.tid +'>'+ dat.tname +'</option>'
			$("#hod").html(option)
		});
	});
});