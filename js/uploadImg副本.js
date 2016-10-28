$(function(){


	/**
	 * 微信认证
	 */
	$.post("http://wxtoken.k-run.cn/generate",{
		url: location.href.split('#')[0]
	},function(data){
		data = JSON.parse(data);
		console.log(data);

		wx.config({
			debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : 'wx4c166202e798d4cc',  // 必填，公众号的唯一标识
			timestamp : data.timestamp,  // 必填，生成签名的时间戳
			nonceStr : data.noncestr,   // 必填，生成签名的随机串
			signature : data.signature, // 必填，签名，见附录1
			jsApiList : [ 'checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage' ]
		// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	});


	// 微信分享
	wx.ready(function(){
		wxShare({
			shareTitle: "刚跟偶像拍了张海报，心都开花了!",
			shareDesc: "2016行走的力量，让心开出花来",
			shareImg: "http://powertogo6.k-run.cn/logo.jpg",
			shareLink: "http://powertogo6.k-run.cn/"
		});
	});



	var mySwiper = new Swiper('.swiper-container', {
		direction : 'vertical',
		pagination : '.swiper-pagination'
	});



	var body_width = $('body').width(),
		winH = $(window).height(),
		isIphone = navigator.userAgent.match(/iphone/i);

	if(body_width * 1.35 > winH - 60){
		$("#p3_btn_wrap").css({
			height: "60px"
		});
		$("#p3_btn").css({
			height: "40px",
			"line-height": "40px"
		});
	}else{
		$("#p3_btn_wrap").css({
			height: winH - (body_width*1.35) + "px"
		});
	}

	var $page_2_name = $("#page_2_name");

	var $clipArea = $("#clipArea");
	$clipArea.height($(window).height() - 170);
	$clipArea.photoClip({
	    width: body_width * 0.75,
	    height: body_width * 0.75 * 1.35,
	    file: "#file",
	    view: "#hit",
	    ok: "#clipBtn",
	    strictSize: true,
	    clipFinish: function(dataURL) {
	        $('#hit').attr('src', dataURL);

	        if($.trim($page_2_name.val()) == ""){
	        	alert("请输入你的名字！");
	        	return;
	        }

	        if($.trim($page_2_name.val()).length > 5){
	        	alert("请把名字字数控制在5字以内！");
	        	return;
	        }

	        render(dataURL);

	        $(".page.on").removeClass('on');
	        $("#page_3").addClass('on');

	        // 微信分享
	        wxShare({
	        	shareTitle: "刚跟偶像拍了张海报，心都开花了!",
	        	shareDesc: "2016行走的力量，让心开出花来",
	        	shareImg: "http://powertogo6.k-run.cn/logo.jpg",
	        	shareLink: "http://powertogo6.k-run.cn/"
	        });
	    }
	});


	var $flower = $(".flower"),
		$logo = $(".logo"),
		$text = $(".text"),
		nScale = (body_width * 0.75)/500;

	$flower.css({
		"-webkit-transform": "scale("+ nScale +")",
		"transform": "scale("+ nScale +")",
		"top": 300 * nScale + "px",
		"width": 200 * nScale + "px",
		"height": 370 * nScale + "px"
	});

	$logo.css({
		"-webkit-transform": "scale("+ nScale +")",
		"transform": "scale("+ nScale +")",
		"width": 171 * nScale + "px",
		"height": 156 * nScale + "px",
		"right": 70 * nScale + "px",
		"top": 304 * nScale + "px"
	});

	$text.css({
		"height": 145 * nScale + "px",
		"bottom": 30 * nScale + "px"
	});


	$(".f_9").click(function(event) {
		$(".page.on").removeClass('on');
		$("#page_2").addClass('on');
	});


	// flash
	var $page1 = $("#page_1"),
		flashIndex = 1,
		flashTimer;
	$page1.find(".f_1").addClass('on');

	$(window).load(function(){
		flashTimer = setInterval(function(){
			if(flashIndex < 9){
				flashIndex++;
				$page1.find(".on").removeClass('on');
				$page1.find(".f_" + flashIndex).addClass('on');
			}else{
				clearInterval(flashTimer);
				var $view = $(".photo-clip-view");
				$flower.appendTo($view);
				$text.appendTo($view);
				$logo.appendTo($view);
			}
		},2000);
	});
	



	//图片上传结束
    $('#upload2').on('click', function() {
        $('#file').click();
    });


    $("#mask").click(function(){
    	$(this).stop().fadeOut(200);
    });



    $("#p3_btn").click(function(){
    	$("#kun_say").stop().fadeIn(200);
    });


    $("#say_btn").click(function(e) {
    	e.stopPropagation();
    	$("#container").removeClass('on');
    	$("#swiperBox").addClass('on');
    });

    $("#kun_say").click(function(){
    	$(this).stop().fadeOut(200);
    });



	// 微信分享
	function wxShare(obj){
		// 分享到朋友圈 配置
		wx.onMenuShareTimeline({
		    title: obj.shareTitle, // 分享标题
		    link: obj.shareLink, // 分享链接
		    imgUrl: obj.shareImg // 分享图标
		});

		// 分享给朋友 配置
		wx.onMenuShareAppMessage({
		    title: obj.shareTitle, // 分享标题
		    desc: obj.shareDesc, // 分享描述
		    link: obj.shareLink, // 分享链接
		    imgUrl: obj.shareImg // 分享图标
		});
	}



	// 渲染 Image 缩放尺寸  
	function render(src) {
		if (src == "") {
		    alert("图像上传失败，请重试");
		}

	    var MAX_HEIGHT = 256; //Image 缩放尺寸 
	    // 创建一个 Image 对象  
	    var image = new Image();

	    // 绑定 load 事件处理器，加载完成后执行  
	    image.onload = function() {
	    	creatImg($.trim($page_2_name.val()), image);
	    };
	    // 设置src属性，浏览器会自动加载。  
	    // 记住必须先绑定render()事件，才能设置src属性，否则会出同步问题。  
	    image.src = src;
	};



	function creatImg(name, image){
		$.post("http://powertogo6.k-run.cn/submit.do", {
			name: name
		}, function(data){
			console.log(data);

			if(data.status == 1000){

				$(".xingzhe_num").text(data.result.numStr);
				$("#slide_name").text(data.result.name);

				// 获取 canvas DOM 对象  
				var canvas = document.getElementById("myCanvas"),
				    p3_flower = document.getElementById("p3_flower"),
				    p3_logo = document.getElementById("p3_logo"),
				    p3_text = document.getElementById("p3_text"),
				    MAX_HEIGHT = 256; //Image 缩放尺寸 

				// 如果高度超标  
				if (image.height > MAX_HEIGHT) {
				    // 宽度等比例缩放 *=  
				    image.width *= MAX_HEIGHT / image.height;
				    image.height = MAX_HEIGHT;
				}

				var ctx = canvas.getContext("2d");

				ctx.clearRect(0, 0, canvas.width, canvas.height);

				// 将图像绘制到canvas上  
				ctx.drawImage(image, 0, 0, 500, 675);
				ctx.drawImage(p3_flower, 300, 280, 200, 370);
				ctx.drawImage(p3_logo, 304, 260, 171, 156);
				ctx.drawImage(p3_text, 0, 507, 500, 144);

				var text_name = data.result.name,
					text_word = "，第"+ data.result.numStr +"位行者",
				    startX = 460,
					startY = 20;

				for(var j = 0, jLen = text_name.length; j < jLen; j++){
					ctx.font = "19px '黑体'";
					ctx.fillStyle = "#231815";
					ctx.strokeStyle = "#231815";
					ctx.textBaseline = 'top';
					ctx.fillText(text_name[j], startX, startY);
					ctx.strokeText(text_name[j], startX, startY);
					startY += 20;
				}

				for(var i = 0, len = text_word.length; i < len; i++){
					var textNow = text_word[i];

					if(textNow == "，"){
						ctx.drawImage($("#p3_word_dou").get(0), startX, startY, 18, 13);
						startY += 14;
					}
					else if(textNow == "第"){
						ctx.drawImage($("#p3_word_di").get(0), startX, startY, 18, 17);
						startY += 18;
					}
					else if(textNow == "位"){
						ctx.drawImage($("#p3_word_wei").get(0), startX, startY, 18, 17);
						startY += 18;
					}
					else if(textNow == "行"){
						ctx.drawImage($("#p3_word_xing").get(0), startX, startY, 18, 17);
						startY += 18;
					}
					else if(textNow == "者"){
						ctx.drawImage($("#p3_word_zhe").get(0), startX, startY, 18, 17);
						startY += 18;
					}
					else if(typeof(parseInt(textNow)) == "number"){
						ctx.drawImage($("#p3_word_" + parseInt(textNow)).get(0), startX, startY, 18, 13);
						startY += 14;
					}
				}

				

				var dataurl = canvas.toDataURL("image/png"),
				    imagedata = encodeURIComponent(dataurl);

				$("#p3_card").attr("src",dataurl);

				$.post("http://powertogo6.k-run.cn/upload.do",{
					imgContent: dataurl.split(",")[1]
				},function(data){
					console.log(data);
					if(data.status == 1000){
						$("#p3_card").attr("src",data.thumb);
						$("#mask").delay(1800).fadeOut(200);
					}
					else{
						alert("图片生成失败，请重试");
					}
				});
			}

	        
		});
	}
});





