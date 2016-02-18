window.onload = function(){
	var n = -1;
	for( var i=0; i<$('#fakeFan>a').length; i++){
		//程序开始
		$('#fakeFan>a').eq(i).click(function(){
			for(var i=0; i<$('#fakeFan>a').length; i++){
				$('#fakeFan>a').eq(i).removeClass('act');
				$('#fakeK>div').eq(i).hide();
			}
			$(this).addClass('act');
			n = $(this).index();
			$('#fakeK>div').eq(n).show();
			//$('#fakeK').removeClass('kact');
			$('#popup').show();
		});
		$('#fakeFan>a').eq(i).hover(
			function(){
				for(var i=0; i<$('#fakeFan>a').length; i++){
					$('#fakeK>div').eq(i).hide();
				}
				$('#fakeK').removeClass('kact');
				$('#fakeK>div').eq($(this).index()).show();
				$('#fakeFan>a').eq($(this).index()).addClass('hover');
			},
			function(){
				for(var i=0; i<$('#fakeFan>a').length; i++){
					$('#fakeK>div').eq(i).hide();
				}
				$('#fakeK').addClass('kact');
				$('#fakeFan>a').eq($(this).index()).removeClass('hover');
				if(n!=-1){
				$('#fakeK>div').eq(n).show();
				$('#fakeK').removeClass('kact');
				}
			}
		);
	}
	$('#pclose').click(function(){
		$('#popup').hide();
	});
	
	var shake = document.getElementById('shake');
var shake1 = document.getElementById('shake01');
var shake2 = document.getElementById('shake02');
var nli = shake1.getElementsByTagName('li');
var speed=40 
if( nli.length > 5){
	MarMove(shake,shake1,shake2)
}
function MarMove(obj,obj1,obj2){
	var speed=40 
	obj2.innerHTML=obj1.innerHTML; 
	function Marquee(){ 
		//document.title=obj2.offsetTop+'|'+obj.scrollTop+'|'+(obj2.offsetTop-obj.scrollTop);
		if(obj2.offsetTop-obj.scrollTop<=394) 
			obj.scrollTop-=obj1.offsetHeight;
		else{ 
			obj.scrollTop++ 
		} 
	} 
	var MyMar=setInterval(Marquee,speed); 
	obj.onmouseover=function() {clearInterval(MyMar)};
	obj.onmouseout=function() {MyMar=setInterval(Marquee,speed)};	
} 
	
}
