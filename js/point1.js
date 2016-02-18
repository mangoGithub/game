/*
1,试玩：切换到试玩场景，
2,正式：切换到正式场景
3,点击动作——球（top，left）；人（left）
	中：球动人动，球进网人倒下，球数可变
	不中：球动人动，球停止在人的前面，球数可变
4，其次试玩由两种情况即：中和不中
（1）鼠标滑过方向可以使方向高亮
（2）鼠标按下一个方向去判断是中球还是不中（球的left、top 人的left true or false）
（3）鼠标放开执行动作（调用把鼠标按下的参数传递过去）
	方向三种情况：
	1>left：球——left：254；bottom：450（中）left：254;bottom:370（没中）
			人——left：348；（中）left：230；（没中）
	2>center: 球——left：不变；bottom：520——540（中）bottom：310没中
			人——top：300；（中）top：250
	3>right:球——left:700; botttom:450(z)left:700； bottom:370
			人——left：568（z）left：672
	

iLeft球的left值
iTop 球队top值
pLeft人的left值
pTop人的top值
offOn 球进还是不经的判断值			
*/
$.cookie('flag',true);
$.cookie('isMove',false);
var point = {
	iLeft: 0, 
	iTop : 0,
	pLeft: 0,
	pTop : 0,
	offOn: true,
	iN :2,
	arrQL :[
		[{'left':294,'bottom':420},{'left':260,'bottom':370}],
		[{'left':300,'top':220},{'left':230,'top':200}]
	],
	arrQC :[
		[{'left':475,'bottom':450},{'left':475,'bottom':310}],
		[{'left':448,'top':300},{'left':448,'top':250}]
	],
	arrQR :[
		[{'left':660,'bottom':420},{'left':700,'bottom':370}],
		[{'left':570,'top':220},{'left':672,'top':200}]
	],
	init : function(n){
		this.iN = n;
		//试玩切换
		$('.gbtn1').on('click',function(){
			$.cookie('flag',false);
			$.cookie('isMove',true);
			$(this).addClass('none');
			$('.gbtn2').addClass('none');
			$('.gNum').removeClass('none');
			$('.gbtn').removeClass('none');
			$('.gtag').removeClass('none');
			var Btnarr= [1,0,0,0]
			var Btn_array = getArrayItems(Btnarr,1);
			if(Btn_array == 1){
				This.offOn = true;
				$('.try-info').html('矮油，进球了？脚法太好挡不住啊！O(∩_∩)O');
			}else{
				This.offOn = false;
				$('.try-info').html('啊哦~球没进！%>_<%');
			}
		});
		//正式
		$('.gbtn2').on('click',function(){
			ajaxPostJson(
					basePath() + "/worldcup/init_penalty_kick.jspx",
					function(data, status) {
						if (data.FINALEIGHT) {

						}
						if (data.FINALEIGHT) {

						}
						if (data.FINALEIGHT) {

						}
						
						
					});
			$.cookie('flag',true);
			$(this).addClass('none');
			$('.gbtn1').addClass('none');
			$('.gNum').removeClass('none');
			$('.gbtn').removeClass('none');
			$('.gtag').removeClass('none');
		});
		//返回
		var This = this;
		$('.gbtn').on('click',function(){
			This.resets();	
		})
		//弹出框关闭
		$('#qiuClose').on('click',function(){
			This.resets();	
			$('#clickPopup').hide();
		});
		$('.btn_que').on('click',function(){
			This.resets();	
			$('#clickPopup').hide();
		});
		//选择方向
		this.target($('.gleft'),this.arrQL,'left');
		this.target($('.gcenter'),this.arrQC,'center');
		this.target($('.gright'),this.arrQR,'right');
		
	},
	target : function (obj,arrN,tag){
		obj.hover(
		function(){
			$(this).addClass('hover');
		},
		function(){
			$(this).removeClass('hover');
		});
		var This = this;
		obj.click(function(){
			if ($.cookie('flag')=='true') {
				ajaxPostJson(
						basePath() + "/worldcup/execute_penalty_kick.jspx",
						function(data, status) {
							if (data.COFFEE) {
								This.offOn = false;
								$.cookie('isMove',true);
								$('.try-info').html('%>_<% 纳尼？我的神脚竟沒踢中！ 运气不足而已，有机会再来吧，送您一张品牌咖啡代码券！');
								This.iLeft = arrN[0][1].left;
								This.iTop = arrN[0][1].bottom;
								This.pLeft = arrN[1][1].left;
								This.pTop = arrN[1][1].top;
								This.lose(tag);
							}
							if (data.NONE) {
								$('.try-info').html('%>_<%  这里什么也没有啊。。。。点球大战机会只有一次哦！');
								$('#clickPopup').show();
								$.cookie('isMove',false);
							}
							if (data.NOCHANCE) {
								$('.try-info').html('%>_<% 您还不具备参加点球大战的资格哦~');
								$('#clickPopup').show();
								$.cookie('isMove',false);
							}
							if (data.DOUBLE_ROUND_TRIP) {
								$('.try-info').html('球进了！球进了！你不是一个人在战斗，你的奖品马上就到！恭喜你获得双人往返机票！');
								This.iLeft = arrN[0][0].left;
								This.iTop = arrN[0][0].bottom;
								This.pLeft = arrN[1][0].left;
								This.pTop = arrN[1][0].top;
								This.win(tag);
							}
							if (data.SINGLE_ROUND_TRIP) {
								$('.try-info').html('~ (^_^)∠※ 矮油,进球了?脚法太好挡不住啊！恭喜你获得单人往返机票！');
								This.iLeft = arrN[0][0].left;
								This.iTop = arrN[0][0].bottom;
								This.pLeft = arrN[1][0].left;
								This.pTop = arrN[1][0].top;
								This.win(tag);
							}
							if (data.SINGLE_ONE_WAY) {
								$('.try-info').html('~ (^_^)∠※ 矮油,进球了?脚法太好挡不住啊！单程机票归你啦！');
								This.iLeft = arrN[0][0].left;
								This.iTop = arrN[0][0].bottom;
								This.pLeft = arrN[1][0].left;
								This.pTop = arrN[1][0].top;
								This.win(tag);
							}
						});
			}
			if ($.cookie('isMove')=='true') {
				if (This.offOn) {
					This.iLeft = arrN[0][0].left;
					This.iTop = arrN[0][0].bottom;
					This.pLeft = arrN[1][0].left;
					This.pTop = arrN[1][0].top;
					This.win(tag);
				} else {
					This.iLeft = arrN[0][1].left;
					This.iTop = arrN[0][1].bottom;
					This.pLeft = arrN[1][1].left;
					This.pTop = arrN[1][1].top;
					This.lose(tag);
				}
			}
		})
		
	},
	win : function(tag){
		var This = this;
		if(tag == 'left'){
			doMove($('.gqiu')[This.iN],{'left':This.iLeft,'bottom':This.iTop},'backOut');
			$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.gif) no-repeat')
			doMove($('.gYuan')[This.iN],{'left':This.pLeft,'top':This.pTop},'easeIn',800,function(){
				$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.png) no-repeat -248px 0px');
				$('.gNum').html('');
				$('#clickPopup').show();
				$('.gtag').addClass('none');
			});
			
		}else if( tag == 'center'){
			doMove($('.gqiu')[This.iN],{'left':This.iLeft,'bottom':This.iTop},'backOut');
			$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.gif) no-repeat')
			doMove($('.gYuan')[This.iN],{'left':This.pLeft,'top':This.pTop},'easeIn',800,function(){
				$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.png) no-repeat -130px 0px');
				$('.gNum').html('');
				$('#clickPopup').show();
				$('.gtag').addClass('none');
			});
			
		}else if( tag == 'right'){
			doMove($('.gqiu')[This.iN],{'left':This.iLeft,'bottom':This.iTop},'backOut');
			$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.gif) no-repeat')
			doMove($('.gYuan')[This.iN],{'left':This.pLeft,'top':This.pTop},'easeIn',800,function(){
				$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.png) no-repeat -387px 0px');
				$('.gNum').html('');
				$('#clickPopup').show();
				$('.gtag').addClass('none');
			});
			
		}
	},
	lose : function(tag){
		var This = this;
		if( tag == 'left' ){
			doMove($('.gqiu')[This.iN],{'left':This.iLeft,'bottom':This.iTop},'');
			$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.gif) no-repeat');
			doMove($('.gYuan')[This.iN],{'left':This.pLeft,'top':This.pTop},'easeIn',1000,function(){
				$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.png) no-repeat');
				$('.gNum').html('');
				$('#clickPopup').show();
				$('.gtag').addClass('none');
			});
		}else if( tag == 'center' ){
			doMove($('.gqiu')[This.iN],{'left':This.iLeft,'bottom':This.iTop},'backOut');
			$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.gif) no-repeat');
			doMove($('.gYuan')[This.iN],{'left':This.pLeft,'top':This.pTop},'easeIn',1000,function(){
				$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.png) no-repeat');
				$('.gNum').html('');
				$('#clickPopup').show();
				$('.gtag').addClass('none');
			});
		}else if( tag == 'right' ){
			doMove($('.gqiu')[This.iN],{'left':This.iLeft,'bottom':This.iTop},'');
			$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.gif) no-repeat')
			doMove($('.gYuan')[This.iN],{'left':This.pLeft,'top':This.pTop},'easeIn',1000,function(){
				$('.gYuan').css('background','url('+basePath()+'/resources/images/worldcup/qiuYuan.png) no-repeat');
				$('.gNum').html('');
				$('#clickPopup').show();
				$('.gtag').addClass('none');
			});
		}
	},
	resets : function(){
		$('.gqiu').css({'left':475,'bottom':140});
		$('.gYuan').css({'left':448,'top':200,'background':'url('+basePath()+'/resources/images/worldcup/qiuYuan.png) no-repeat'});
		$('.gNum').html('<img src="'+basePath()+'/resources/images/worldcup/qiu.png" width="36" height="36" align="absmiddle" />');
		$('.gbtn1').removeClass('none');
		$('.gbtn2').removeClass('none');
		$('.gNum').addClass('none');
		$('.gbtn').addClass('none');
		$('.gtag').addClass('none');
	},
	
	
}
point.init(2);
//参数2是八强（0）、冠军（1）、二维码（2）的区分
//function getArrayItems(arr, num) {
//	var temp_array = new Array();
//	for ( var index in arr) {
//		temp_array.push(arr[index]);
//	}
//	var return_array = new Array();
//	for (var i = 0; i < num; i++) {
//		if (temp_array.length > 0) {
//			var arrIndex = Math.floor(Math.random() * temp_array.length);
//			return_array[i] = temp_array[arrIndex];
//			temp_array.splice(arrIndex, 1);
//		} else {
//			break;
//		}
//	}
//	return return_array;
//
//}