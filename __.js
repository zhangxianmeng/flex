var __ = {};
__.changePriceMoney = function(number){
	// / <summary>
    // / 千分位格式化
    // / </summary>
    // / <param name="number"></param>
    // / <returns type=""></returns>
    var num = number + "";
    num = num.replace(new RegExp(",", "g"), "");
    // 正负号处理
    var symble = "";
    if (/^([-+]).*$/.test(num)) {
        symble = num.replace(/^([-+]).*$/, "$1");
        num = num.replace(/^([-+])(.*)$/, "$2");
    }

    if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
        var num = num.replace(new RegExp("^[0]+", "g"), "");
        if (/^\./.test(num)) {
            num = "0" + num;
        }
        var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
        var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");

        var re = /(\d+)(\d{3})/;

        while (re.test(integer)) {
            integer = integer.replace(re, "$1,$2");
        }
        return symble + integer + decimal;

    } else {
        return number;
    }
}

__.getRandom = function(){ //获取随机数
	return ".json?r"+Math.ceil(Math.random()*10000)+ '=' + Math.ceil(Math.random()*10000);
}
__.getUrl = function(url){ //获取随机数
	return getGlobalUrlAdmin + url + ".json?r"+Math.ceil(Math.random()*10000)+ '=' + Math.ceil(Math.random()*10000);
}
__.getRepeatParam = function(target,arr){ //取重复参数
	var data = "";
	target.each(function(){
		var tmp = "{";
		for (var i = 0; i < arr.length; i++) {
			if(i == 0){
				tmp+= (arr[i] + ":'" + $(this).attr("data-"+arr[i])+"'");
			}else{
				tmp+= ","+ (arr[i] + ":'" + $(this).attr("data-"+arr[i])+"'");
			}
		};
		tmp+="},";
		data += tmp;
	})
	return "[" + data.substring(0,data.length-1) + "]";
}
__.getUrlParam = function(name){ //获取url中的参数
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}
__.setStorageName = function(key,value){ //设置缓存
	if(window.localStorage){
		if(localStorage[key]){
			localStorage[key] = value;
		}else{
			localStorage[key] = 0;
		}
	}else{
		return 0;
	}
}
__.getStorageName = function(name){ //获取缓存
	if(window.localStorage){
		if(localStorage[name]){
			return localStorage.getItem(name)
		}else{
			return localStorage[name] = 0;
		}
	}
	else{
		return 0;
	}
}
__.actionClickUrl = function(obj){ //data-url跳转
	obj.on("click",function(){
		var url = $(this).attr("data-url");
		window.location.href = url
	})
}
__.actionPanelTab = function(hd,panel,callback){ //tab切换
	hd.on("tap",function(event){
		event.preventDefault();
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		panel.eq(index).show().siblings().hide();
		if(callback){
			callback(index);
		}
	})
}
__.actionPanelTabSwitch = function(hd,panel,callback){ //tab切换
	hd.on("click",function(event){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		panel.eq(index).show().siblings().hide();
		if(callback){
			callback(index);
		}
	})
}
__.actionPostForm = function(param) { //post
    if ($(this).hasClass("disable")) {
        return;
    } else {
    	param.start()
    	param.target.addClass("disable");
        $.post(param.url+__.getRandom(), param.list, function(data) {
        	param.target.removeClass("disable");
            param.success()
        });
    }
}
__.loaddingWindowShow = function(label){ //获取弹出提示
	if($("#loaddingWindow").size()>0){
		$("#loaddingWindow").show().removeClass("loading-success").html('<div class="txt"><div class="ico-loading"></div>'+label+'</div><div class="bg"></div>');
	}else{
		$("body").append('<div id="loaddingWindow" class="loading"><div class="txt"><div class="ico-loading"></div>'+label+'</div><div class="bg"></div></div>')
	}
}
__.loaddingWindowSuccess = function(label){  //成功提示
	var loaddingWindow = $("#loaddingWindow");
	loaddingWindow.show();
	loaddingWindow.find(".txt").html(label);
	loaddingWindow.addClass("loading-success");
	var timer ;
	timer = setTimeout(function(){
		$("#loaddingWindow").hide();
		timer = null;
	},1500)
} 
__.loaddingWindowHide = function(){ //隐藏弹出
	$("#loaddingWindow").hide();
}
__.cartAddAnimate = function(qty){ //购物车动画
	$("#fixed-cart .add").addClass("add-on").html("+" + qty);
	var time = setTimeout(function(){
		$("#fixed-cart .add").removeClass("add-on");
		$("#fixed-cart .tag").html(Number($("#fixed-cart .tag").html())+Number(qty))
		time = null;
	},1200);
}
__.getRange = function(obj,callback){ //获取+1 -1
	var minus = obj.find(".minus");
	var plus = obj.find(".plus");
	var input = obj.find("input");
	input.attr("disabled",true)
	input.on("blur",function(){
		if(callback){
			callback(obj,input.val())
		}
	})
	var num = input.data("num")||1;
	if(input.val()==num){
		minus.addClass("ico-minus-disable")
	}else{
		minus.removeClass("ico-minus-disable")
	}
	input.on("blur",function(){
		if(!/^[1-9]\d*$/.test(input.val())||input.val()==""){
			input.val("1")
		}
	})

	minus.on("click",function(){
		if($(this).hasClass("ico-minus-disable")){
			return;
		}else{
			input.val(Number(input.val())-num);
			if(input.val()==num){
				minus.addClass("ico-minus-disable");
				if(callback){ //回调
					callback(obj,input.val())
				}
				return ;
			}
			if(callback){ //回调
				callback(obj,input.val())
			}
		}
		
	})
	plus.on("click",function(){
		input.val(Number(input.val())+num)
		if(input.val()==1){
			minus.addClass("ico-minus-disable")
		}else{
			minus.removeClass("ico-minus-disable")
		}
		if(callback){
			callback(obj,input.val()) //回调
		}
	})
}
__.getRangeExtend = function(obj,callback){ //获取+1 -1
	var minus = obj.find(".minus");
	var plus = obj.find(".plus");
	var input = obj.find("input");
	input.attr("disabled",true)
	input.on("blur",function(){
		if(callback){
			callback(obj,input.val())
		}
	})
	var num = 1;
	if(input.data("num")){
		num = input.data("num");
	}
	if(input.val()==0){
		minus.addClass("ico-minus-disable")
	}else{
		minus.removeClass("ico-minus-disable")
	}
	input.on("blur",function(){
		if(!/^[0-9]\d*$/.test(input.val())||input.val()==""){
			input.val("0")
		}
	})

	minus.on("click",function(){
		if($(this).hasClass("ico-minus-disable")){
			return;
		}else{
			input.val(Number(input.val())-num);
			if(input.val()==0){
				minus.addClass("ico-minus-disable");
				if(callback){ //回调
					callback(obj,input.val())
				}
				return ;
			}
			if(callback){ //回调
				callback(obj,input.val())
			}
		}
		
	})
	plus.on("click",function(){
		if($(this).hasClass("ico-plus-disable")){
			return;
		}
		input.val(Number(input.val())+num)
		if(input.val() >= input.data("max")){
			input.val(input.data("max"));
		}
		if(input.val() == 0){
			minus.addClass("ico-minus-disable")
		}else{
			minus.removeClass("ico-minus-disable")
		}
		if(callback){
			callback(obj,input.val()) //回调
		}
	});
};
__.actionRegInput = function(obj,callback) { //表单验证的
	var stutas = true;
	for (var x in obj) {
		var type = obj[x].attr("data-type");
		var tips = obj[x].attr("data-tips");
		if(type == "noEmpty" && obj[x].val().length == 0){
			stutas = false;
			alert(tips)
			return ;
		}else{
		}
	};
	if(stutas){
		callback();
	}
}
__.testInputReg = function(obj,callback) { //表单验证的

	//状态
	var status = 0;
	//正则表达式
	var allReg = {};
	allReg.noempty = /^\s*$/g;//空
	allReg.number = /^[0-9]*$/;//数字
	allReg.realname = /^([\u4E00-\u9FA5]){2,}$/;//中文姓名
	allReg.email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;//邮箱
	allReg.emailNum = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$|^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	allReg.tel = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;//手机号码
	allReg.identity = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;//身份证号码
	//遍历obj
	for(var i=0;i<obj.length;i++){
		
		//判断内容不能为空
		if(obj.eq(i).val()==""||/^\s*$/g.test(obj.eq(i).val())){
			
			obj.eq(i).siblings(".tips").html("内容不能为空").show().removeClass("tipsyrue");
		}
		//判断内容要匹配对应的正则表达式
		else if(allReg[$(obj.eq(i)).attr("data-type")].test($(obj.eq(i)).val())||$(obj.eq(i)).attr("data-type")=="noempty"){
			obj.eq(i).siblings(".tips").html("正确").show().addClass("tipsyrue");
			status ++;
			
		}
		//不匹配的情况下，显示提醒内容
		else{
			
			var tips = $(obj.eq(i)).attr("data-tips");
			obj.eq(i).siblings(".tips").html(tips).show().removeClass("tipsyrue");
		}
	}
	//判断表单是否全部正确填写
	if(status==obj.length){
		callback();
	}
}
__.testInputRegOne = function(obj,callback){
	//状态
	var status = 0;
	//正则表达式
	var allReg = {};
	allReg.noempty = /^\s*$/g;//空
	allReg.number = /^[0-9]*$/;//数字
	allReg.realname = /^([\u4E00-\u9FA5]){2,}$/;//中文姓名
	allReg.email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;//邮箱
	allReg.tel = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;//手机号码
	allReg.identity = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;//身份证号码
	
	//遍历obj
	for(var i=0;i<obj.length;i++){
		//判断内容不能为空
		if(obj.eq(i).val()==""||/^\s*$/g.test(obj.eq(i).val())){
			obj.eq(i).siblings(".tips").html("内容不能为空").show().removeClass("tipsyrue");
		}
		//判断内容要匹配对应的正则表达式
		else if(allReg[$(obj.eq(i)).attr("data-type")].test($(obj.eq(i)).val())||$(obj.eq(i)).attr("data-type")=="noempty"){
			obj.eq(i).siblings(".tips").html("正确").show().addClass("tipsyrue");
			status ++;
			
		}
		//不匹配的情况下，显示提醒内容
		else{
			var tips = $(obj.eq(i)).attr("data-tips");
			obj.eq(i).siblings(".tips").html(tips).show().removeClass("tipsyrue");
		}
	}
	//判断表单是否全部正确填写
	if(status==obj.length){
		callback();
	}
}
__.testInputRegNum = function(){
    var str = '';
    var now = '';
    var that = $(this);
    var time = setInterval(function(){
        now = $.trim($('.numreg').val());
        if (now != '' && now != str && !/^\d+(?=\.{0,1}\d+$|$)/.test(now)) {
            now = str;
        }
        that.val(now)
        str = now;
    }, 100);
    $(this).bind('blur',function(){
        clearInterval(time);
    });
}
__.getPageSize = 5; //全局列表个数
__.postServer = function(url,obj,callback){
	$.post(url+ __.getRandom(),obj,function(data){
		callback(data);
	})
};
__.getAlertBox = function(obj){ //模拟alert
	if($("#getAlertBox").size()>0){
		$("#getAlertBox").show();
		$("#getAlertBox").find(".bd").html(obj.txt);
	}else{
		$("body").append('<div id="getAlertBox"><div class="alert-box-bg"></div><div class="alert-box"><div class="txt"><div class="bd">'+obj.txt+'</div></div><div class="bar"><div class="confirm">确定</div><div class="cancel">取消</div></div></div></div>');
		$("#getAlertBox .confirm").on("click",function(){
			obj.confirm(); //回调确认
		});
		$("#getAlertBox .cancel").on("click",function(){
			if(obj.cancel){
				obj.cancel();//回调取消
			}else{
				$("#getAlertBox").hide();
			}
		});
	}
}
__.getTimeoutAlert = function(obj,callback){ //模      拟alert
	if($("#getAlertBox").size()>0){
		$("#getAlertBox").show();
	}else{
		$("body").append('<div id="getAlertBox"><div class="alert-box-bg"></div><div class="alert-box"><div class="tips"><div class="bd">'+obj.txt+'</div></div></div></div>');
	}
	setTimeout(function(){
		callback();
		$("#getAlertBox").hide();
	},1500)
	
}
__.getAlertWarning = function(obj){ //模拟alert警告
	if($("#getAlertWarning").size()>0){
		$("#getAlertWarning").show();
	}else{
		$("body").append('<div id="getAlertWarning"><div class="alert-box-bg"></div><div class="alert-box"><div class="txt"><div class="bd">'+obj.txt+'</div></div><div class="bar"><div class="confirm confirm-single">确定</div></div></div></div>');
	}
	$("#getAlertWarning .confirm").on("click",function(){
		$("#getAlertWarning").hide();
	});
}
__.prettyPrice = function(obj){ //价格后面加span
	obj.each(function(){
		$(this).html($(this).html().replace(/\.00/, ".<span class='min'>00</span>"));
	})
}
__.getDefaultUrl = function(){
	window.location.href = "../home/goods_index";
}
//转换金额，千分为分隔
__.changePriceMoney = function(s){
	if (/[^0-9\.]/.test(s)) return "invalid value";
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return s;
}
String.prototype.prettyprice = function () {//价格后面加span
	return this.replace(/\.00/, ".<span class='min'>00</span>");
}
function log(obj){
	console.log(obj)
}
function shield(){
    return false;
}
document.addEventListener('touchstart',shield,false);


//postserver
$.postServer = function(options) {
	var opts = $.extend({}, $.postServer.defaults, options);  //继承
	opts.start();
	$.ajax({
		type : "POST",
		url : opts.url || __.getUrl("/ajaxpost/" + opts.business),
		data : opts.data,
		statusCode : {
			998: function() {
	        	__.getAlertWarning({txt : "您的登陆已超时，请重新登录！"})
	        }
	        ,
	        999: function() {
	         	__.getAlertWarning({txt : "您没有权限执行此操作！"})
	        }
		},
		success : function(data, textStatus, jqXHR) {
			
			if(data.Success){
				opts.finish(data)
			}else{
				__.loaddingWindowHide();
				__.getAlertWarning({txt : data.Msg})
			}
		},
		error: function(data) {
			__.loaddingWindowHide();
			__.getAlertWarning({txt : data.responseJSON.Msg})
		}
	})
}
$.postServer.defaults = {
	data : {},
	url : "",
	business : "",
	start : function(){ __.loaddingWindowShow("请求加载中...") },
	finish : function(data){ __.loaddingWindowSuccess("添加成功"); }
};
//getserver
$.getServer = function(options) { 
    var opts = $.extend({}, $.getServer.defaults, options);  //继承
	var param = ""; 
    for (var i in opts.param) {
    	param += ("&"+i+'='+ opts.param[i]);
    }; //get参数
    var url ;
    
    if(opts.pageindex==0){
    	opts.firstGetSart();
    }
    //firstGet
    if(opts.url){
    	url = getGlobalUrlAdmin + "/" + opts.url + __.getRandom() + param + "&size=" + opts.size + "&pageindex="  + opts.pageindex ;
    }else{
    	url = __.getUrl("/ajaxget/" + ( opts.getType || "slstd") + "/" + opts.business) + __.getRandom() + param + "&size=" + opts.size + "&pageindex="  + opts.pageindex 
    }
    $.ajax({
    	url: url ,  //url
		statusCode: {
	        998: function() {
	        	__.getAlertWarning({txt : "您的登陆已超时，请重新登录！"})
	        }
	        ,
	        999: function() {
	         	__.getAlertWarning({txt : "您没有权限执行此操作！"})
	        }
	    },
		success : function(data, textStatus) {  //成功
			if(opts.pageindex==0){
		    	opts.firstGetEnd();
		    }
			if(data.Msg){
				alert(data.Msg)
			} 
			var getdata = data;
	     	if(opts.getType == "do" && opts.table){  //获取dataobject 
	     		getdata = data.data[opts.table]
	     	}
	     	if (getdata.length < opts.size && getdata.length >= 0){
		    	opts.dataLessSize(getdata);
		    	opts.dataEmpty();
		    }else{
		    	opts.moreData(getdata);
		    }
		    opts.finish(getdata);
			
		}
    });
    
}; 
$.getServer.defaults = {
	getType : "", //获取数据类型   slstd do
	url : "",
	table : "",
	param : {},
	size: __.getPageSize,
	pageindex : 0,
	business : "",
	dataLessSize : function(data){ },
	moreData : function(data){},
	dataEmpty : function(data){},
	finish: function(data){},
	firstGetSart:function(){},
	firstGetEnd:function(){}
};
__.getScrollData = function(obj){
	var loading = false , loadingStatus = true ,pageindex = 0;
	$.getServer({
		table : ( obj.table || ""),getType : ( obj.getType || ""),param : ( obj.param || {}),business : obj.business,dataLessSize:obj.dataLessSize,moreData:obj.moreData,pageindex: 0,size: (obj.size||__.getPageSize),dataEmpty:function(){loadingStatus = !loadingStatus}
	});
	$(window).on('scroll',function(){
        if ( loading ){return ;}
        else {
        	if($(window).scrollTop()+$(window).height() > $(document).height()-200){
                loading = !loading;
                if(loadingStatus){
                    $.getServer({table : ( obj.table || ""),getType : ( obj.getType || ""),param : ( obj.param || {}),business : obj.business,dataLessSize:obj.dataLessSize,moreData:obj.moreData,pageindex: pageindex += (obj.size||__.getPageSize),size: (obj.size||__.getPageSize),finish : function(data){loading = !loading},dataEmpty:function(){loadingStatus = !loadingStatus}});
                }
            }
        }
    })
};
$.getScrollData = function(obj){
	var loading = false , loadingStatus = true ,pageindex = 0;
	$.getServer({
		table : ( obj.table || ""),getType : ( obj.getType || ""),param : ( obj.param || {}),business : obj.business,dataLessSize:obj.dataLessSize,moreData:obj.moreData,pageindex: 0,size: (obj.size||__.getPageSize),dataEmpty:function(){loadingStatus = !loadingStatus}
	});
	$(window).on('scroll',function(){
        if ( loading ){return ;}
        else {
        	if($(window).scrollTop()+$(window).height() > $(document).height()-200){
                loading = !loading;
                if(loadingStatus){
                     $.getServer({table : ( obj.table || ""),getType : ( obj.getType || ""),param : ( obj.param || {}),business : obj.business,dataLessSize:obj.dataLessSize,moreData:obj.moreData,pageindex: pageindex += (obj.size||__.getPageSize),size: (obj.size||__.getPageSize),finish : function(data){loading = !loading},dataEmpty:function(){loadingStatus = !loadingStatus}});
                }
            }
        }
    })
};
__.getHashChange = function(obj){  //获取hash值  
	window.location.hash = obj.dom.data("hash");
	$(window).bind('hashchange', function () {
		obj.callback(window.location.hash)
    })
};
__.getHashDdefault = function(callback){
	if(window.location.hash != ""){
		callback(window.location.hash);
    }
	$(window).bind('hashchange', function () {
		if(window.location.hash != ""){
			callback(window.location.hash);
	    }
    })
};
$.fn.regFormEveryone = function(options){ //验证
	var opts = $.extend({}, $.fn.regFormEveryone.defaults, options);
	var canSaveStatus = false;
	var regFormEveryoneEmptyTimer;
	var _this = $(this);
	_this.find(".reg").on("focus",function(){
		regFormEveryoneEmptyTimer = setInterval(function(){
			_this.find(".reg").each(function(){
				if($(this).val() == ""){ 
					canSaveStatus = false  ; return false;
				}else if($(this).attr("max")){
					canSaveStatus = true;
					if(Math.abs(Number($(this).val())) > $(this).attr("max")){
						$(this).val(Number($(this).attr("max")));
					}else if(Number($(this).val()) < 0){
						$(this).val(0);
					}else{
						$(this).val(Number($(this).val()));
					}
				}
				else{
					canSaveStatus = true;
				}
			})
			if(canSaveStatus){
				opts.finish(canSaveStatus)
			}else{
				opts.finish(canSaveStatus)
			}
		},500)
	})
	$(this).find(".reg").on("blur",function(){
		clearInterval(regFormEveryoneEmptyTimer);
	})
	function isRegFormEveryone (){
		var status = true;
		$("input.reg").each(function(){
			var type= $(this).data("type");
			if(type=="mobile"){
				if(!/0?(13|14|15|18)[0-9]{9}/.test($(this).val())){
					alert($(this).data("tips"))
					status = false;
				}
			}
		})
		return status;
	}
};
$.getScrollTableData = function(options){
    var opts = $.extend({}, $.getScrollTableData.defaults, options);  //继承
    //第一次请求
    var tabindex = opts.index||0 ;
    var loading = false;  //不在滚动中状态
    function getFirstLoading(){
        $.getServer({
            business : opts.data[tabindex].business,
            param : opts.data[tabindex].param,
            pageindex : opts.data[tabindex].pageindex,
            dataLessSize: function(data){
                $(opts.data[tabindex].tmpl).tmpl(data).appendTo(opts.data[tabindex].id); //tmpl
                $(opts.data[tabindex].id).next().html("已全部加载完成！");
                opts.data[tabindex].loadingstatus = false;
                opts.data[tabindex].pageindex += opts.data[tabindex].size;
                loading = false;
                opts.callback(data)
            },
            moreData:function(data){
                $(opts.data[tabindex].tmpl).tmpl(data).appendTo(opts.data[tabindex].id); //tmpl
                opts.data[tabindex].pageindex += opts.data[tabindex].size;
                loading = false;
                opts.callback(data)

            },
            size: opts.data[tabindex].size,
            dataEmpty:function(){opts.data[tabindex].loadingstatus = false;loading = false;}
        });
    }
    getFirstLoading();
    
    $(opts.data[tabindex].title).eq(tabindex).addClass("active").siblings().removeClass("active");
    $(".panel").hide().eq(tabindex).show();
    
    $(opts.data[tabindex].title).on("click",function(){
        loading = false;  //不在滚动中状态
        tabindex = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".panel").hide().eq(tabindex).show();
        if(opts.data[tabindex].pageindex == 0){
            getFirstLoading();
        }
    })
    
    $(window).on('scroll',function(){
        if ( loading ){return ;}
        else {
            if($(window).scrollTop()+$(window).height() > $(document).height()-200){
                loading = !loading;
                if(opts.data[tabindex].loadingstatus){
                    $.getServer({
                        business : opts.data[tabindex].business,
                        param : opts.data[tabindex].param,
                        pageindex : opts.data[tabindex].pageindex,
                        dataLessSize: function(data){
                            $(opts.data[tabindex].tmpl).tmpl(data).appendTo(opts.data[tabindex].id); //tmpl
                            $(opts.data[tabindex].id).next().html("已全部加载完成！");
                            opts.data[tabindex].loadingstatus = false;
                            opts.data[tabindex].pageindex += opts.data[tabindex].size;
                            loading = false;
                            opts.callback(data)
                        },
                        moreData:function(data){
                            $(opts.data[tabindex].tmpl).tmpl(data).appendTo(opts.data[tabindex].id); //tmpl
                            opts.data[tabindex].pageindex += opts.data[tabindex].size;
                            loading = false;
                            opts.callback(data)

                        },
                        size: opts.data[tabindex].size,
                        dataEmpty:function(){opts.data[tabindex].loadingstatus = false;loading = false;}
                    });
                }
            }
        }
    })
}
$.getScrollTableData.defaults = {
    data : [],
    index: 0,
    callback : function(){
    	
    }
};
$.fn.regFormEveryone.defaults = {
	finish : function(status){
	}
};
$.regexpFormPost = function (form,callback){
  	var regItem = form.find("[data-require = 'require']");
	var status = true;
	for (var i = 0; i < regItem.length; i++) {
		if(regItem.eq(i).val() == ""){
			status = false;
  			regItem.eq(i).addClass("input-warn");
  		}else{
  			regItem.eq(i).removeClass("input-warn");
  			if(regItem.eq(i).data("regexp") && status){
  		  		var reg = regItem.eq(i).data("regexp");
  		  		if(reg == "mobile"){
  		  			if(!/0?(13|14|15|18)[0-9]{9}/.test(regItem.eq(i).val())){
  						status = false;
  						__.getAlertWarning({txt : "请填写正确的手机号码！"})
  					}else{
  						
  					}
  		  			
  		  		}
  		  	}
  		}
 	};
 	if(status){
 		callback();
 	}
}
function globalComdify(n)
{
	var re=/\d{1,3}(?=(\d{3})+$)/g;
	var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
	return n1;
}

$.fn.getGlobalFixedSelectList = function(options){ //获取全局select list
    var opts = $.extend({}, $.fn.getGlobalFixedSelectList.defaults, options);
    $(this).empty();
    var _this = $(this),
        md = $("<div>",{
                "class" : "global-fixed-select-list"
            }
        ),
        bg = $("<div>",{
                "class": "global-fixed-select-list-bg"
            }
        ),
        body = $("<div>",{
                "class": "global-fixed-select-list-box"
            }
        ),
        wrap = 
        $("<div>",{
                "class": "global-fixed-select-list-wrap"
            }
        ),
        hd = $("<div>",{
                "class": "global-fixed-select-list-hd"
            }
        ),
        dataList = $("<ul>",{
                "id": "global-fixed-select-list",
                "class" : opts.listClass
            }
        )
    ;
    hd.html('<a href="javascript:;" class="closed"><i class="ico ico-closed"></i></a><a href="javascript:;" class="clear" style="display:none">'+ opts.clearName +'</a><span>'+ opts.title +'</span>');
    wrap.append(hd);
    if( opts.clearName ){ hd.find(".clear").show(); }
    hd.find(".clear").on("click",function(){
        opts.change(null);
        md.removeClass("global-fixed-select-list-active");
        bg.hide();
    })
    if( opts.tmpl ){
        $(opts.tmpl).tmpl(opts.data).appendTo(dataList);
        wrap.append(dataList);
    }
    if( opts.html ){
        wrap.append(opts.html);
    }
    dataList.find("li").on("click",function(){
        var data = {};
        for (var i = 0; i < opts.filterData.length; i++) {
            data[opts.filterData[i]] = $(this).data(opts.filterData[i])
        };
        if(opts.changeBoxHide){
            md.removeClass("global-fixed-select-list-active");
            bg.hide();
        }
        opts.change(data);
    })
    hd.find(".closed").on("click",function(){
        md.removeClass("global-fixed-select-list-active");
        bg.hide();
    })
    md.append(bg);
    body.append(wrap);
    md.append(body);
    _this.append(md);
    setTimeout( function (){ md.addClass("global-fixed-select-list-active"); }, 100);
    
}
$.fn.getGlobalFixedSelectList.defaults = {
    title : '请选择',
    listClass : 'list',
    tmpl : '',
    data : [],
    filterData : [],
    changeBoxHide : true , 
    change : function(  data ){

    }
};
