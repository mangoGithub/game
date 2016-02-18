jQuery(function($) {
	//八强、冠军、微信页面切换
	$('#finalTab1').on('click',function(){
		$(this).addClass('act');
		$('#finalTab2').removeClass('act');
		$('#finalTab3').removeClass('act');
		$('#tabOne').show();
		$('#tabTwo').hide();
		$('#tabThree').hide();
		$('.finalB1').show();
		$('.finalB2').hide();
		$('.finalB3').hide();
	});
	$('#finalTab2').on('click',function(){
		$(this).addClass('act');
		$('#finalTab1').removeClass('act');
		$('#finalTab3').removeClass('act');
		$('#tabOne').hide();
		$('#tabTwo').show();
		$('#tabThree').hide();
		$('.finalB2').show();
		$('.finalB1').hide();
		$('.finalB3').hide();
	})
	$('#finalTab3').on('click',function(){
		$(this).addClass('act');
		$('#finalTab1').removeClass('act');
		$('#finalTab2').removeClass('act');
		$('#tabOne').hide();
		$('#tabTwo').hide();
		$('#tabThree').show();
		$('.finalB3').show();
		$('.finalB1').hide();
		$('.finalB2').hide();
	})
	//任务结束弹出关闭特效
	var maxH = $(document.body).height()
	$('#make').css('height',maxH);
	$('.endClose').on('click',function(){
		$('#make').hide();
		$(this).parent().hide();	
	})
	$('.endBtn').on('click',function(){
		$('body,html').animate({scrollTop:maxH},1000);
		$('#make').hide();
		$(this).parent().hide();
	})
	
/*---------------------------------上面的是点球添加的js和修改部分的js------------------------------------*/
	//八强 选球队
	Dui($('#g1 img'));
	Dui($('#g2 img'));
	Dui($('#g3 img'));
	Dui($('#g4 img'));
	var sum = 0;
	function Dui(obj){
		var iNum = 0;
		obj.click(function(){
			if($(this).attr('act')){
				$(this).prev().hide();
				$(this).removeAttr('act');
				$(this).siblings().removeClass('act');
				iNum--;
				sum -=1
			}else{
				if(iNum <2){
					$(this).prev().show();
					$(this).attr('act','act');
					$(this).siblings().addClass('act');	
					iNum++;
					sum +=1
				}
			}
		
		});
		obj.hover(
			function(){
				$(this).siblings().addClass('colff');	
			},
			function(){
				$(this).siblings().removeClass('colff');
			}
		);
	}
	//32选8，判断够8项
	$('#tabOne .btn_tijiao').on('click',function(){
		if( sum != 8){
			$('#popup').show();
		}
	})
	//弹出框关闭
	$('#pclose').on('click',function(){
		$('#popup').hide();
	})
	$('#popup a.btn_que').on('click',function(){
		$('#popup').hide();
	})
	//冠军，球队选择
	$('#tabTwo img').click(function(){
		if($(this).attr('act')){
			$(this).prev().hide();
			$(this).removeAttr('act');
			$(this).siblings().removeClass('act');
		}else{
			for(var i=0; i<$('#tabTwo img').length; i++){
				$('#tabTwo i').eq(i).hide();
				$('#tabTwo img').eq(i).removeAttr('act');
			}
			$(this).prev().show();
			$(this).attr('act','act');
			$('#guanDui').attr('src',$(this).attr('src'));
			$(this).siblings().addClass('act');	
		}	
	})
	$('#tabTwo img').hover(
		function(){
			$(this).siblings().addClass('colff');	
		},
		function(){
			$(this).siblings().removeClass('colff');
		}
	);
	
})