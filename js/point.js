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
var point = {
	iLeft: 0, 
	iTop : 0,
	pLeft: 0,
	pTop : 0,
	offOn: true,
	iN :2,
	classFix : '',
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
	init : function(){
		var This = this;
		this.iN = $('.gNum img').length;
		//试玩切换
		$('.gbtn1').on('click',function(){
			$(this).addClass('none');
			$('.gbtn2').addClass('none');
			$('.gNum').removeClass('none');
			$('.gbtn').removeClass('none');
			$('.gtag').removeClass('none');
			//提示文字
			$('.gStrat').removeClass('none');
			$('.gStrat01').addClass('none');
			This.classFix = 's'; //判断状态
			//选择方向
			This.target_s($('.gleft'),This.arrQL,'left');
			This.target_s($('.gcenter'),This.arrQC,'center');
			This.target_s($('.gright'),This.arrQR,'right');
			$('.qnum74').css('background','url(images/gnum.png) no-repeat -22px 0px');

		});
		//正式
		$('.gbtn2').on('click',function(){
			$(this).addClass('none');
			$('.gbtn1').addClass('none');
			$('.gNum').removeClass('none');
			$('.gbtn').removeClass('none');
			$('.gtag').removeClass('none');
			//提示文字显示
			$('.gClassfix').removeClass('none');
			This.classFix = 'z'; //正式标书
			//选择方向
			This.target_z($('.gleft'),This.arrQL,'left');
			This.target_z($('.gcenter'),This.arrQC,'center');
			This.target_z($('.gright'),This.arrQR,'right');
			$('.qnum74').css('background','url(images/gnum.png) no-repeat -66px 0px');

		});
		//返回
		$('.gbtn').on('click',function(){
			This.resetBack();	
		})
		//弹出框关闭
		$('#qiuClose').on('click',function(){
			This.resets();
		})
		//弹出框确定
		$('#g_btn_que').on('click',function(){
			This.resets();
		})
		
	},
	target_s : function(obj,arrN,tag){ //试玩选择方向
		var This = this;
		obj.hover(
		function(){
			$(this).addClass('hover');
		},
		function(){
			$(this).removeClass('hover');
		});
		obj.click(function(){
			var Btnarr= [1,0,0,0]
			var Btn_array = getArrayItems(Btnarr,1);
			if(Btn_array == 1){
				This.offOn = true;
				$('#clickPopup h1').html('亲，你进球了，恭喜！');
			}else{
				This.offOn = false;
				$('#clickPopup h1').html('亲，不要气馁，下次加油！');
			}
			$('.qnum74').css('background','url(images/gnum.png) no-repeat');
			$('.gqiuY').addClass('none');
			This.Position(arrN,tag);
			$('.gtag').addClass('none');
		});
	},
	target_z : function (obj,arrN,tag){ //正式选择方向
		obj.hover(
		function(){
			$(this).addClass('hover');
		},
		function(){
			$(this).removeClass('hover');
		});
		var This = this;
		obj.click(function(){
			if( This.iN == 2){
				$('.qnum74').css('background','url(images/gnum.png) no-repeat -44px 0px');				This.offOn = true;
				$('#clickPopup h1').html('亲，你进球了，恭喜！'+This.iN);
				$('.gClassfix').html('八强');
			}
			if( This.iN == 1 ){
				$('.qnum74').css('background','url(images/gnum.png) no-repeat -22px 0px');
				This.offOn = true;
				$('#clickPopup h1').html('亲，你进球了，恭喜！'+This.iN);
				$('.gClassfix').html('冠军');
			}
			if( This.iN == 0){
				$('.qnum74').css('background','url(images/gnum.png) no-repeat');
				This.offOn = true;
				$('#clickPopup h1').html('亲，你进球了，恭喜！'+This.iN);
				$('.gClassfix').html('二维码');
				This.resetBack();
			}
			
			This.iN--;
			$('.gqiuY').addClass('none');
			This.Position(arrN,tag);
			$('.gtag').addClass('none');
		})
		
	},
	
	Position : function(arrN,tag){ //确定球和人的运动轨迹（left、top）
		if(this.offOn){
			this.iLeft = arrN[0][0].left;
			this.iTop = arrN[0][0].bottom;
			this.pLeft = arrN[1][0].left;
			this.pTop = arrN[1][0].top;
			this.win(tag);
		}else{
			this.iLeft = arrN[0][1].left;
			this.iTop = arrN[0][1].bottom;
			this.pLeft = arrN[1][1].left;
			this.pTop = arrN[1][1].top;
			this.lose(tag);
		}
	},
	winMove : function(n){ //进球运动执行
		var This = this;
		doMove($('.gqiu')[0],{'left':This.iLeft,'bottom':This.iTop},'backOut');
		$('.gYuan').css('background','url(images/qiuYuan.gif) no-repeat')
		doMove($('.gYuan')[0],{'left':This.pLeft,'top':This.pTop},'easeIn',800,function(){
			$('.gYuan').css('background','url(images/qiuYuan.png) no-repeat -'+n+'px 0px');
			setTimeout(function(){
				$('#clickPopup').show();
				This.iTop = 0;
				This.iLeft = 0;
				This.pTop = 0;
				This.pLeft = 0;
			},500);
		});
	},
	win : function(tag){ // 进球方向判断
		if(tag == 'left'){
			this.winMove(248);
		}else if( tag == 'center'){
			this.winMove(130);
		}else if( tag == 'right'){
			this.winMove(387);
		}
	},
	loseMove : function(){ // 不进球运动轨迹
		var This = this;
		doMove($('.gqiu')[0],{'left':This.iLeft,'bottom':This.iTop},'');
		$('.gYuan').css('background','url(images/qiuYuan.gif) no-repeat')
		doMove($('.gYuan')[0],{'left':This.pLeft,'top':This.pTop},'easeIn',1000,function(){
			$('.gYuan').css('background','url(images/qiuYuan.png) no-repeat');
			setTimeout(function(){
				$('#clickPopup').show();
			},500);
		});
	},
	lose : function(tag){ // 不进球判断方向
		if( tag == 'left' ){
			this.loseMove();
		}else if( tag == 'center' ){
			this.loseMove();
		}else if( tag == 'right' ){
			this.loseMove();
		}
	},
	resets : function(){ // 返回、关闭、确定 （重置页面）
		if( this.classFix == 'z' ){
			$('.gqiu').css({'left':475,'bottom':135});
			$('.gYuan').css({'left':448,'top':200,'background':'url(images/qiuYuan.png) no-repeat'});
			$('#clickPopup').hide();
			$('.gtag').removeClass('none');
			$('.gqiuY').removeClass('none');
		}else{
			$('#clickPopup').hide();
			$('.gqiu').css({'left':475,'bottom':135});
			$('.gYuan').css({'left':448,'top':200,'background':'url(images/qiuYuan.png) no-repeat'});
			$('.gbtn1').removeClass('none');
			$('.gbtn2').removeClass('none');
			$('.gNum').addClass('none');
			$('.gbtn').addClass('none');
			$('.gtag').addClass('none');
			$('#clickPopup').hide();
			$('.gStrat').addClass('none');
			$('.gStrat01').removeClass('none');
			$('.gqiuY').removeClass('none');
			$('.gClassfix').addClass('none');
			this.classFix = '';
			//this.iN = 0;
		}
	},
	resetBack : function(){
		$('#clickPopup').hide();
		$('.gqiu').css({'left':475,'bottom':135});
		$('.gYuan').css({'left':448,'top':200,'background':'url(images/qiuYuan.png) no-repeat'});
		$('.gbtn1').removeClass('none');
		$('.gbtn2').removeClass('none');
		$('.gNum').addClass('none');
		$('.gbtn').addClass('none');
		$('.gtag').addClass('none');
		$('#clickPopup').hide();
		$('.gStrat').addClass('none');
		$('.gStrat01').removeClass('none');
		$('.gqiuY').removeClass('none');
		$('.gClassfix').addClass('none');
		this.classFix = '';
	}
	
	
}
point.init();
function getArrayItems(arr, num) {
	var temp_array = new Array();
	for ( var index in arr) {
		temp_array.push(arr[index]);
	}
	var return_array = new Array();
	for (var i = 0; i < num; i++) {
		if (temp_array.length > 0) {
			var arrIndex = Math.floor(Math.random() * temp_array.length);
			return_array[i] = temp_array[arrIndex];
			temp_array.splice(arrIndex, 1);
		} else {
			break;
		}
	}
	return return_array;

}