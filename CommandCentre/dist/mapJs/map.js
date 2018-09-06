var W_TIME=1000*3// 地图跳跃 时间间隔
var a=0; //数据 开始 变量
var w_zoom=13;
var w_jing=117.330274; // 点击获取的经度
var w_wei=34.816265; //点击 获取的维度
var w_diQuShi=0; // 滕州市0 山亭区 1 点击 小地图的
var w_allId=0		// 全部 0 滕州市 1 山亭区 2  大地图的
var actionSetinterval=null;
init(0)
function init(a){
	//标注点数组	
	var map = new BMap.Map("container");
	window.map=map;
	var point = new BMap.Point(w_jing,w_wei);//定义一个中心点坐标
	var w_iconGif=iconImg[a].gif;
	var w_iconPng=iconImg[a].png;
	window.w_iconGif=w_iconGif;
	window.w_iconPng=w_iconPng;
	var myIcon = new BMap.Icon(w_iconGif, new BMap.Size(120,120));
	var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    map.centerAndZoom(point,w_zoom);//设定地图的中心点和坐标并将地图显示在地图容器中
    map.addOverlay(marker);              // 将标注添加到地图中
    createMap(a);
    
}
    //创建地图函数：   
    function createMap(i){
		map.clearOverlays();
    	var pp0 = markerArr[w_allId][i].point.split("|")[0];
    	var pp1 = markerArr[w_allId][i].point.split("|")[1];
        point = new BMap.Point(pp0,pp1);//定义一个中心点坐标
        map.centerAndZoom(point);//设定地图的中心点和坐标并将地图显示在地图容器中
		map.enableDragging();   //开启拖拽	
		// 打开  信息 窗口
        var w_con=markerArr[w_allId][i].content;
        opts.title=markerArr[w_allId][i].title;
//      w_con.setStyle({
//      	color : "red",
//			fontSize : "12px",
//			height : "20px",
//			lineHeight : "20px",
//			fontFamily:"微软雅黑"
//      })
        var infoWindow = new BMap.InfoWindow(w_con, opts);  // 创建信息窗口对象    
		map.openInfoWindow(infoWindow,point);    // 打开信息窗口			
        // 自定义的 图标
	    var myIcon = new BMap.Icon(1, new BMap.Size(120,120));
		var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		tianjiaDian(i)		
    }    
// 添加 坐标点 
function tianjiaDian(i){
	for (var j = 0; j < markerArr[w_allId].length; j++) {
			if(j!=i){
				var point = new BMap.Point(markerArr[w_allId][j].point.split("|")[0], markerArr[w_allId][j].point.split("|")[1]);
				var myIcon2 = new BMap.Icon(w_iconPng, new BMap.Size(90,100));
				var marker2 = new BMap.Marker(point,{icon:myIcon2});  // 创建标注
				map.addOverlay(marker2);              // 将标注添加到地图中
				marker2.addEventListener('click',showjingwei)
			}
			if(j==i){
				var point = new BMap.Point(markerArr[w_allId][j].point.split("|")[0], markerArr[w_allId][j].point.split("|")[1]);
				var myIcon2 = new BMap.Icon(w_iconGif, new BMap.Size(120,120));
				var marker2 = new BMap.Marker(point,{icon:myIcon2});  // 创建标注
				map.addOverlay(marker2);              // 将标注添加到地图中
				marker2.addEventListener('click',showjingwei)
			}
	}
}

// 获取经纬度
function showjingwei(e){
	var p = e.target;
	map.clearOverlays(marker2); // 删除 gif
	// 获取点击的那条数据
	for(var i=0;i<markerArr[w_allId].length;i++){
		var pp0 = markerArr[w_allId][i].point.split("|")[0];
    	var pp1 = markerArr[w_allId][i].point.split("|")[1];
    	var w_LNG=p.getPosition().lng;
    	var w_lAT=p.getPosition().lat;
		w_jing=w_LNG;
		w_wei=w_lAT;
		var point = new BMap.Point(markerArr[w_allId][i].point.split("|")[0], markerArr[w_allId][i].point.split("|")[1]);
		var myIcon2 = new BMap.Icon(w_iconPng, new BMap.Size(90,100));
		var marker2 = new BMap.Marker(point,{icon:myIcon2});  // 创建标注
		map.addOverlay(marker2);              // 将标注添加到地图中
		marker2.addEventListener('click',showjingwei)
		if(pp0==w_LNG&&pp1==w_lAT){
			var point = new BMap.Point(pp0,pp1);
	    	var myIcon = new BMap.Icon(w_iconGif, new BMap.Size(120,120));
	    	map.centerAndZoom(point);//设定地图的中心点和坐标并将地图显示在地图容器中  
			var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
			map.addOverlay(marker2);          // 将标注添加到地图中
			$('.w_bt_con').hide();
			$('.w_bb').show();
		}
		map.enableScrollWheelZoom(true);// 可以鼠标放大缩小
	}		
}
//定时器 地图动
//	var actionSetinterval=window.setInterval(_foo(a),W_TIME); 
	map.addEventListener('click',function(e){
		clearInterval(actionSetinterval)
		$('.w_guan').hide();
		$('.w_kai').show();
		console.log(e);
	})
	function foo(a){ 
		createMap(a) 
	} 
	function _foo(a) { 
		return function(){ 
	        a++;
	        if(a>=markerArr[w_allId].length){
	        	a=0;
	        }
			foo(a); 
		} 
	} 
	 //点击放大地图  
	$('.w_jia').click(function(){
		map.setZoom(map.getZoom() + 1);
		w_zoom=map.getZoom();
		clearInterval(actionSetinterval)
		$('.w_guan').hide();
		$('.w_kai').show();
//		console.log(w_zoom)
		if(w_zoom<=13){
			$('.w_tit').html('枣庄市')
			w_allId=0
			init(0)
		}else if(w_zoom==14){
			w_allId=1
			init(0)
		}else if(w_zoom==15){
			w_allId=2
			init(0)
		}
	});
	//点击缩小地图  
	$('.w_jian').click(function(){
		map.setZoom(map.getZoom() - 1);
		w_zoom=map.getZoom()
		clearInterval(actionSetinterval)
		$('.w_guan').hide();
		$('.w_kai').show();
		if(w_zoom<=13){
			w_allId=0;
			$('.w_tit').html('枣庄市')
			init(0);
		}else if(w_zoom==14){
			w_allId=1;
			init(0);
		}else if(w_zoom==15){
			w_allId=2;
			init(0);
		}
	});
	$('.w_fan2').hide();
	// 点击返回上层   禁止点击   点击 党支部 下级  详细
	$('.w_fan').click(function(){
		return
		$('.w_fan2').show();
		$(this).hide();
//		$('.w_zhiDianJiS').show();
	});
	$('.w_fan2').click(function(){
		$('.w_fan').show();
		$(this).hide();
		$('.w_bt_r_con').show();
		$('.w_zhiDianJiS').show();
		$('.w_con_xiala').hide()
	});
	$('.w_zhiDianJiS').click(function(){
		$('.w_fan').hide();
		$(this).hide();
		$('.w_fan2').show();
		$('.w_con_xiala').show()
	});
	// 点击小地图  的点 jif 图(经 维 等级 市 ，图片)
	function dianShi(lng,lis,zoom,j,a){
		var map2 = new BMap.Map("container");
		window.map2=map2
		var point = new BMap.Point(lng,lis);//定义一个中心点坐标
		var w_iconGif=iconImg[a].gif;
		var w_iconPng=iconImg[a].png;
		var myIcon = new BMap.Icon(w_iconGif, new BMap.Size(120,120));
		var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注	
		w_zoom=14
	    map2.centerAndZoom(point,w_zoom);//设定地图的中心点和坐标并将地图显示在地图容器中 
	    map2.addOverlay(marker);
//	    console.log(map.getZoom())   // 14 级
//		map.clearOverlays(marker4)
	    for(var i=0;i<arrJson[j].length;i++){
	    	
			var jing=arrJson[j][i].point.split("|")[0];
			var wei=arrJson[j][i].point.split("|")[1];
			
			if(jing!=lng&&wei!=lis){
				var point = new BMap.Point(jing,wei);
				var myIcon4 = new BMap.Icon(w_iconPng, new BMap.Size(90,100));
				var marker4 = new BMap.Marker(point,{icon:myIcon4});  // 创建标注
				map2.addOverlay(marker4);              // 将标注添加到地图中
				marker4.addEventListener('click',changeGif)
			}
			if(jing==lng&&wei==lis){
				var point = new BMap.Point(jing,wei);
				var myIcon4 = new BMap.Icon(w_iconPng, new BMap.Size(90,100));
				var marker4 = new BMap.Marker(point,{icon:myIcon4});  // 创建标注
				map2.addOverlay(marker4);              // 将标注添加到地图中
				marker4.addEventListener('click',changeGif)
			}
		}
	}
	// 暂未完成
	function changeGif(e){
		var p = e.target;
		map2.clearOverlays(marker4); // 删除 gif
		// 获取点击的那条数据
		for(var i=0;i<arrJson[w_diQuShi].length;i++){
			var pp0 = arrJson[w_diQuShi][i].point.split("|")[0];
	    	var pp1 = arrJson[w_diQuShi][i].point.split("|")[1];
	    	var w_LNG=p.getPosition().lng;
	    	var w_lAT=p.getPosition().lat;
			var point = new BMap.Point(pp0, pp1);
			var myIcon4 = new BMap.Icon(w_iconPng, new BMap.Size(90,100));
			var marker4 = new BMap.Marker(point,{icon:myIcon4});  
			map2.addOverlay(marker4);
			marker4.addEventListener('click',changeGif)
			if(pp0==w_LNG&&pp1==w_lAT){
				console.log(i);
				var point = new BMap.Point(w_LNG,w_lAT);
		    	var myIcon4 = new BMap.Icon(w_iconGif, new BMap.Size(120,120));
		    	map2.centerAndZoom(point);//设定地图的中心点和坐标并将地图显示在地图容器中  
				var marker4 = new BMap.Marker(point,{icon:myIcon4});  // 创建标注
				map2.addOverlay(marker4);          // 将标注添加到地图中
				$('.w_bt_con').hide();
				$('.w_bb').show();
			}
			map.enableScrollWheelZoom(true);// 可以鼠标放大缩小
		}		
	}
	// 点击点  滕州  (0)
	$('.w_TZ').click(function(e){
		w_diQuShi=0;
		e.stopPropagation();
		w_jing=117.172421;
		w_wei=35.119917;
		$('.w_tit').html('滕州市')
		dianShi(w_jing,w_wei,14,0,0);
	})
	$('.w_ST').click(function(e){
		w_diQuShi=1;
		e.stopPropagation();
		w_jing=117.468162;
		w_wei=35.106755;
		$('.w_tit').html('山亭区')
		dianShi(w_jing,w_wei,14,0,0);
	})
	// 返回上一级
	$('.w_fanfan').click(function(){
//		alert(1);
		$('.w_bb').hide();
		$('.w_bt_con').show();
	})
	
    //  侧边的 右边 展开 收缩
    $('.xiaqu').click(function(){
    	$('.w_bt_r').css('height','157px')
    	$(this).hide();
    	$('.shanglai').show();
    	$('.w_di_hide').show()
    })
    $('.shanglai').click(function(){
    	$('.w_bt_r').css('height','1058px')
    	$(this).hide();
    	$('.xiaqu').show()
    	$('.w_di_hide').hide()
    })
    
     //  侧边的 左边 展开 收缩
    $('.xiaqu2').click(function(){

    	$('.w_bt_l').css('height','157px')
    	$(this).hide();
    	$('.shanglai2').show();
    	$('.w_di_hide2').show()
    })
    $('.shanglai2').click(function(){
    	if($('.w_bb').css('display')=='block'){
    		var oH=$('.w_bb').height()+55;
    		$('.w_bt_l').css('height',oH);
    	}else{
    		var os=$('.w_bt_con').height();
    		$('.w_bt_l').css('height',os);
    	}
    	$(this).hide();
    	$('.xiaqu2').show()
    	$('.w_di_hide2').hide()
    })
    
    // 语音 开关 切换
    $('.w_yuX').click(function(){
		$(this).hide();
		$('.w_yuyinShengBo').hide();
		$('.w_yuyin').show();
    })
    
    $('.w_yuyin').click(function(){
    	$(this).hide();
		$('.w_yuyinShengBo').show();
		$('.w_yuX').show()
    })
    
    // 开始跳跃  地图 按钮
    $('.w_kai').click(function(){
    	clearInterval(actionSetinterval)
      	actionSetinterval=setInterval(_foo(a),W_TIME);
    })
    $('.w_guan').click(function(){
    	clearInterval(actionSetinterval)
    })

    // 点击 的 开始 录制    
    $('.w_kai').click(function(){
    	$(this).hide();
    	$('.w_guan').show()
    })
    $('.w_guan').click(function(){
    	$(this).hide();
    	$('.w_kai').show()
    })
    
    // tap 切换   
    $('.w_top_right_r ').on('click','li',function(e){
		e.stopPropagation();
//  	console.log($(this).children().children().css('background'))
    })

// 二级联动
function appendToOption(textk,v,selected)
        {
            var obj = $("<option>").text(textk).val(v);
            if(selected)
            {
                obj.attr("selected","true");
            }
            obj.appendTo($("#select2"));
        }
        //根据第一个框的选项获取第二个下拉框的可选值
        function getItemsToAppend(selectedValue)
        {
            var options = new Array();
            if(selectedValue=="1")
            {
                options.push('全部','农村','机关','高校','社区','两新','国有企业','非公');
            }
            else if(selectedValue=="2")
            {
                options.push('全部','政府部门','事业单位','人民团体','官方背景的民间组织','民间社会团体与基金会','企业','临时性团队');
            }
            else if(selectedValue=="3")
            {
                options.push('全部');
            }
            else if(selectedValue=="4")
            {
            	options.push('全部');
            }
            else if(selectedValue=="5")
            {
            	options.push('全部');
            }else if(selectedValue=="6")
            {
            	options.push('全部');
            }else if(selectedValue=="7")
            {
            	options.push('全部');
            }else if(selectedValue=="8")
            {
            	options.push('全部');
            }
            else 
            {
            	options.push('全部','农村','机关','高校','社区','两新','国有企业','非公');
            }
            return options;

        }
        map.addEventListener('zoomend',function(){
        	w_zoom=map.getZoom();
        })
        //用console.log进行调试
//      $(function(){1·
            $("#select1").change(function(e){
            	e.preventDefault() 
                var selectedValue = $("#select1 option:selected").val();
                var items = getItemsToAppend(selectedValue);
                $("#select2 option").remove();
                console.log(w_zoom)
                for (var i in items) {
                    appendToOption(items[i],items[i],(i==0)?true:false);
                };
                if($(this).val()=='0')
                {
                	window.location.href='map2.html'
                	if(w_zoom=='14'){
                		dianShi(w_jing,w_wei,14,0,0)
                	}else{
                		init(0);
                	}
                	$('.w_bt_con_li').eq(0).show().siblings().hide();
                	
                }
                else if($(this).val()=='1')
                {
                	window.location.href='mapDangQun.html'
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,1)
                	}else{
                		init(1);
                	}
                	$('.w_bt_con_li').eq(1).show().siblings().hide();
                }
                else if($(this).val()=='2')
                {
                	window.location.href='mapZhiYuanTuanDui.html'
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,2)
                	}else{
                		init(2);
                	}
                	
                }
                else if($(this).val()=='3')
                {
                	window.location.href='mapZhiYuanHuoDong.html'
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,3)
                	}else{
                		init(3);
                	}
                	
                }
                else if($(this).val()=='4')
                {
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,4)
                	}else{
                		init(4)
                	}
                	
                }
                else if($(this).val()=='5')
                {
                	window.location.href='index2.html'
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,5)
                	}else{
                		init(5)
                	}
                }
                else if($(this).val()=='6')
                {
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,6)
                	}else{
                		init(6)
                	}
                }
                else if($(this).val()=='7')
                {
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,7)
                	}else{
                		init(7)
                	}
                }
                else if($(this).val()=='8')
                {
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,8)
                	}else{
                		init(8)
                	}
                }
                else if($(this).val()=='9')
                {
                	if(w_zoom==14){
                		dianShi(w_jing,w_wei,14,0,9)
                	}else{
                		init(9)
                	}
                }
                
            });
//      });        
        // 右侧底部  变换党支部
        $('#select2').change(function(){
//      	alert($(this).val());
        })