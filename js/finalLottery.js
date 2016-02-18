var GROUP_AB = "BRA,MEX,CRO,CAM,SPA,CHI,NET,AUS";
var AB_array = GROUP_AB.split(",");

var GROUP_CD = "COL,COT,GRE,JAP,URU,COS,ENG,ITA";
var CD_array = GROUP_CD.split(",");

var GROUP_EF = "SWI,FRA,ECU,HON,ARG,IRA,BOS,NIG";
var EF_array = GROUP_EF.split(",");

var GROUP_GH = "GER,GHA,POR,USA,BEL,RUS,ALG,KOR";
var GH_array = GROUP_GH.split(",");

var final_eight_array = new Array();
//var final_array = new Array();
var champion = new Array();

var sel_final_eight = $('.final_eight').val();
var sel_final_champion = $('.final_champion').val();


$(function() {
	
	if(sel_final_eight != ''){
		var sel_final_eight_array = sel_final_eight.split("|");
		var temp_array = new Array();
		for ( var index in sel_final_eight_array) {
			temp_array.push(sel_final_eight_array[index]);
		}
		for (var i = 0; i < temp_array.length; i++) {
				$("#tabOne span:contains(\'"+temp_array[i]+"\')").prev().prev().show();
				$("#tabOne span:contains(\'"+temp_array[i]+"\')").prev().attr('act', 'act');
				$("#tabOne span:contains(\'"+temp_array[i]+"\')").prev().siblings().addClass('act');
		}
	}
	
	if(sel_final_champion != ''){
		$("#tabTwo span:contains(\'"+sel_final_champion+"\')").prev().prev().show();
		$("#tabTwo span:contains(\'"+sel_final_champion+"\')").prev().attr('act', 'act');
		$("#tabTwo span:contains(\'"+sel_final_champion+"\')").prev().siblings().addClass('act');
		$('#guanDui').attr('src',$("#tabTwo span:contains(\'"+sel_final_champion+"\')").prev().attr('src'));
	}
	

	$('#pclose').click(function() {
		$('#popup2').hide();
		closeMask();
	});
	$('.ml20').click(function() {
		$('#popup2').hide();
		closeMask();
	});

	// 八强 选球队
	Dui($('#tabOne #g1 img'));
	Dui($('#tabOne #g2 img'));
	Dui($('#tabOne #g3 img'));
	Dui($('#tabOne #g4 img'));
	//var sum = 0;
	function Dui(obj) {
		//var iNum = 0;
		obj.click(function() {
			if ($(this).attr('act')) {
				$(this).prev().hide();
				$(this).removeAttr('act');
				$(this).siblings().removeClass('act');
//				final_array.splice(
//						$.inArray($(this).attr('code'), final_array), 1);
				final_eight_array.splice(
						$.inArray($(this).attr('code'), final_eight_array), 1);
//				iNum--;
//				sum -= 1
			} else {
				if($(this).parents(".group").find("span.act").length<2){
					$(this).prev().show();
					$(this).attr('act', 'act');
					$(this).siblings().addClass('act');
					//final_array.push($(this).attr('code'));
					final_eight_array.push($(this).attr('code'));
					
//					iNum++;
//					sum += 1
				}
			}

		});
		obj.hover(function() {
			$(this).siblings().addClass('colff');
		}, function() {
			$(this).siblings().removeClass('colff');
		});
	}
	
	$('#tabOne i').click(function(){
		if ($(this).next().attr('act')) {
			$(this).hide();
			$(this).siblings('img').removeAttr('act');
			$(this).siblings('span').removeClass('act');
			final_eight_array.splice(
					$.inArray($(this).next().attr('code'), final_eight_array), 1);
		}else{
			if($(this).parents(".group").find("span.act").length<2){
				$(this).show();
				$(this).next().attr('act', 'act');
				$(this).next().siblings().addClass('act');
				//final_array.push($(this).attr('code'));
				final_eight_array.push($(this).next().attr('code'));
				
//				iNum++;
//				sum += 1
			}
		}
		
		//sum -=1
	});
	
	$('#tabTwo i').click(function(){
		$(this).hide();
		$(this).siblings('img').removeAttr('act');
		$(this).siblings('span').removeClass('act');
		//sum -=1
	});

	// 冠军，球队选择
	$('#tabTwo .finalL img').click(
			function() {
				var temp_array = new Array();
				if ($(this).attr('act')) {
					$(this).prev().hide();
					$(this).removeAttr('act');
					$(this).siblings().removeClass('act');
					temp_array.splice($.inArray($(this).attr('code'),
							champion_array), 1);
				} else {
					for (var i = 0; i < $('#tabTwo  .finalL img').length; i++) {
						$('#tabTwo  .finalL i').eq(i).hide();
						$('#tabTwo  .finalL img').eq(i).removeAttr('act');
						$('#tabTwo  .finalL img').eq(i).siblings().removeClass('act');
					}
					$(this).prev().show();
					$(this).attr('act', 'act');
					$('#guanDui').attr('src', $(this).attr('src'));
					$(this).siblings().addClass('act');
					temp_array.push($(this).attr('code'));
				}
				champion = temp_array;
			});
	
});

function getRandom() {
	var final_eight_array_temp = new Array();
	for (var i = 0; i < $('#tabOne img').length; i++) {
		if ($('#tabOne img').eq(i).attr('act')) {
			$('#tabOne img').eq(i).prev().hide();
			$('#tabOne img').eq(i).removeAttr('act');
			$('#tabOne img').eq(i).siblings().removeClass('act');
			AB_array = GROUP_AB.split(",");
			CD_array = GROUP_CD.split(",");
			EF_array = GROUP_EF.split(",");
			GH_array = GROUP_GH.split(",");
		}
	}
	AB_array = getArrayItems(AB_array, 2);
	for (i = 0; i < AB_array.length; i++) {
		var na = AB_array[i].toString();
		$('#tabOne '+'.' + na).prev().show();
		$('#tabOne '+'.' + na).attr('act', 'act');
		$('#tabOne '+'.' + na).siblings().addClass('act');
		final_eight_array_temp.push($('.' + na).attr('code'));
	}
	CD_array = getArrayItems(CD_array, 2);
	for (i = 0; i < CD_array.length; i++) {
		var na = CD_array[i].toString();
		$('#tabOne '+'.' + na).prev().show();
		$('#tabOne '+'.' + na).attr('act', 'act');
		$('#tabOne '+'.' + na).siblings().addClass('act');
		final_eight_array_temp.push($('.' + na).attr('code'));
	}
	EF_array = getArrayItems(EF_array, 2);
	for (i = 0; i < EF_array.length; i++) {
		var na = EF_array[i].toString();
		$('#tabOne '+'.' + na).prev().show();
		$('#tabOne '+'.' + na).attr('act', 'act');
		$('#tabOne '+'.' + na).siblings().addClass('act');
		final_eight_array_temp.push($('.' + na).attr('code'));
	}
	GH_array = getArrayItems(GH_array, 2);
	for (i = 0; i < GH_array.length; i++) {
		var na = GH_array[i].toString();
		$('#tabOne '+'.' + na).prev().show();
		$('#tabOne '+'.' + na).attr('act', 'act');
		$('#tabOne '+'.' + na).siblings().addClass('act');
		final_eight_array_temp.push($('.' + na).attr('code'));
	}
	final_eight_array = final_eight_array_temp;
}
var jiathis_config = {
	url : "http://toumi.yixin.com",
	title : "投米网“激情桑巴节，猜队带你飞”，世界杯咱也过把瘾~国内双人往返机票很诱惑，何况猜对就有咖啡券！你也来试试吧！！",
	summary : " "
};

function submitResult(actvietType) {

	var resultdata="";
	if (actvietType == 8) {
		if (final_eight_array.length == 8) {
				resultdata = final_eight_array.join(",");
		} else {
			openMask();
			$("#popup2").show();
			return;
		}
	}
	if (actvietType == 1) {
		if (champion.length !='') {
			resultdata = champion.join(",");
		} else {
			openMask();
			$("#showresult").html('');
			$("#showresult").html('请选择冠军球队！');
			$("#popup2").show();
			return;
		}
	}
	ajaxPostJson(basePath() + "/worldcup/execute_master.jspx", function(data,
			status) {
		if(data.SUCCESS){
			if(actvietType == 8){
				$(".finalChange").attr("href","###");
				$("#tabOne .btn_tijiao").attr("href","###");
				$(".finalChange").addClass('not');
				$("#tabOne .btn_tijiao").addClass('not');	
			}else if(actvietType == 1){
				$("#tabTwo .btn_tijiao").addClass('not');
				$("#tabTwo .btn_tijiao").attr("href","###");
			}			
		}
		openMask();
		$("#showresult").html('');
		$("#showresult").html(data.MESSAGE);
		$("#popup2").show();
		
		
	}, {
		'activeType' : actvietType,
		'activeAnswer' : resultdata
	});
}

function shareUrl(activetType, actshare) {

	if (activetType == '1') {
		jiathis_config = {
			url : "http://toumi.yixin.com",
			title : "投米网“激情桑巴节，猜队带你飞”，猜冠军，赢机票，并有咖啡券相送哦！",
			summary : " "
		};
	}
	if (actshare == 'tsina') {
		$('.jiathis_button_tsina').trigger('click');
	} else if (actshare == 'dou') {
		$('.jiathis_button_douban').trigger('click');
	} else if (actshare == 'weixin') {
		$('.jiathis_button_weixin').trigger('click');
	} else if (actshare == 'renren') {
		$('.jiathis_button_renren').trigger('click');
	} else {
		$('.jiathis_button_tqq').trigger('click');
	}

}

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