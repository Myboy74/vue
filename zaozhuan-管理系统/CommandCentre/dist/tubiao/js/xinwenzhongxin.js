
// 新闻工作文章总数
ajaxGet('XWGZ_WZZS',function(dats){
	$('.w_p').html(dats.data[0].value)
})
// 本月发布文章增减量改成
ajaxGet('XWGZ_FBWZZJL',function(dats){
//	console.log(dats);
	var benyue=null;
	if(dats.data[1].key=='本月'){
			benyue=dats.data[1].value
	}else{
			benyue=dats.data[0].value
	}
	var shangyue=null;
	if(dats.data[1].key=='上月'){
			shangyue=dats.data[1].value
	}else{
			shangyue=dats.data[0].value
	}
	
	var w_addmm=benyue-shangyue;
	if(w_addmm>0){
		w_addmm='+'+w_addmm
	}else{
		w_addmm=w_addmm
	}
	
	$('.w_pianxinwen').html(benyue);
	if(shangyue==0){
		$('.w_baixx').html( ((benyue-shangyue)*100).toFixed(2)+'%' );
	}else{
		$('.w_baixx').html( (((benyue-shangyue)/shangyue)*100).toFixed(2)+'%' );
	}
	
	
})



ajaxGet('XWGZ_BYFBWZJZL',function(dats){
	cmer(dats)
});
function cmer(dats){
	if(dats.data.length>0){
		$('.w_pianxinwen').html(dats.data[0].value+'篇')
	}
}
ajaxGet('XWGZ_BJGZL',function(dats){
	ewws(dats);
})
function ewws(dats){
	if(dats.data.length>0){
		$('.w_biajigongzuoliang').html(dats.data[0].value+'篇')
	}
}



//发布文章数日趋势

nianling();
function nianling(){
	var myChart3zz = echarts.init(document.getElementById('w_nianling'));
var w_option3 = {
    title: {
        text: '发布文章数日趋势',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    grid: {
    	top:'100px',
        left: '4%',
        right: '4%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#f23c48',
        axisPointer: {
            lineStyle: {
                color: '#9d9d9d', //不显示线条
				type:'dashed'
            },
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['<20','21-25','26-30','31-35','36-40','41-45','36-50','51-55','56-60','>60'],
        axisLine:{
		    show: false, 
        },
        axisTick:{
        	show: false, 
        }
    },   
    yAxis: {
        axisLine:{
		    	show: false, 
        },
        axisTick:{
        	show: false, 
        },
        splitLine: {         //分割 线条 实线虚线
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    series: [
        {
            name:'文章数',
            type:'line',
            symbolSize: 5,
        	showSymbol: true,
            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            lineStyle:{
                normal:{
                    width:7,
                    color:'#f23c48',
                },
            },
            areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(252,209,211, 0.9)'
	                }, {
	                    offset: 1,
	                    color: 'rgba(255,244,245, 0.1)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: '#f23c48',
	                borderColor: '#f23c48',
	                borderWidth: 12
	
	            }
	        },
	        
        }
    ]
};
myChart3zz.hideLoading();
ajaxGet('XWGZ_MTFBWZS',function(dats){
	cin(dats);
});
function cin(dats){
	if(dats.data.length>0){
		var ddff=[];
		var xAxisdata=[];
		for(var i=0; i<dats.data.length;i++){
			ddff.push(dats.data[i].value)
			xAxisdata.push(dats.data[i].key)
		}  
		w_option3.series[0].data=ddff;
		w_option3.xAxis.data=xAxisdata;
		myChart3zz.hideLoading();
		myChart3zz.setOption(w_option3);
	}
	
}
myChart3zz.setOption(w_option3);
}

//发布文章类型
leibie();
function leibie(){
	var myChart2 = echarts.init(document.getElementById('w_leibie'));
var w_option2 = {
	 title : {
        text: '发布文章类型',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)",
    },
    legend: { 
        bottom:50,
        left: 'center',
        padding: 10,
        itemGap: 20,
        itemWidth: 30,
        itemHeight: 20,
        data: ['新闻类', '工作类',],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263'],
            name:'发布文章类型',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'工作类'},
                {value:0, name:'新闻类'},
            ],
            labelLine: {
                normal: {
                    show: false // 去线
                }
            },
            label:{
            	 normal: {
                    show: false,  // 去名字
               },
            }
        }
    ]
};
myChart2.hideLoading();
ajaxGet('XWGZ_WZLX',function(dats){
	cgoo(dats)
});
function cgoo(dats){
if(dats.data.length>0){
	var xinwenlei=null;
	if(dats.data[0].key=='新闻类'){
		xinwenlei=dats.data[0].value;
	}else{
		xinwenlei=dats.data[1].value;
	}
	
	var gongzuolei=null;
	if(dats.data[0].key=='工作类'){
		gongzuolei=dats.data[0].value;
	}else{
		gongzuolei=dats.data[1].value;
	}
	
	
	w_option2.series[0].data[1].value=xinwenlei; //新闻类
	w_option2.series[0].data[0].value=gongzuolei; //工作类
	$('.w_wenzhangxinwen').html(xinwenlei);
	$('.w_wenzhangqita').html(gongzuolei);
	if(dats.data[1].value==0&&dats.data[0].value==0){
		$('.w_wenzhangqitabai').html(0);
		$('.w_wenzhangxinwenbai').html(0);
	}else{
		$('.w_wenzhangqitabai').html((gongzuolei/(parseInt(gongzuolei)+parseInt(xinwenlei))*100).toFixed(2)+'%')
		$('.w_wenzhangxinwenbai').html((xinwenlei/(parseInt(gongzuolei)+parseInt(xinwenlei))*100).toFixed(2)+'%')

	}
	myChart2.hideLoading();
	myChart2.setOption(w_option2);

}
}
myChart2.setOption(w_option2);
}


// 栏目文章数
xueli();
function xueli(){
var myChart5 = echarts.init(document.getElementById('w_xueli'));
var w_option5 = {
    title: {
        text: '栏目文章数',
       	x:'20px',
       	textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'axis'
    },
    calculable : true,
    radar : {       
            indicator : [
                {text : '党建和组织工作宣传网', max  : 300000},
                {text : '党层组织建设网', max  : 300000},
                {text : '党员队伍建设网', max  : 3800000},
                {text : '干部工作网', max  : 300000},
                {text : '山东省选调优秀高校毕业生到村任职网', max  : 300000},
                {text : '第一书记管理服务网', max  : 300000},
                {text : '政策法规库', max  : 300000},
                {text : '学历教育网', max  : 300000},
            ],
            name: {
	            textStyle: {
	                color: '#9d9d9d'
	            }
	        },
	        splitLine: {
	            lineStyle: {
	                color: [
	                    'rgba(74, 144, 266, 1)', 'rgba(74, 144, 266, 1)',
	                    'rgba(74, 144, 266, 1)', 'rgba(74, 144, 266, 1)',
	                    'rgba(74, 144, 266, 1)', 'rgba(74, 144, 266, 1)'
	                ].reverse()
	            }
        },
        
    },
    series : [
        {
            type: 'radar',
             tooltip : {
                trigger: 'item',
            },
            itemStyle: {
            	normal: {
            		areaStyle: 
            		{
            			color:'#eaf4ed'
            		},
            		lineStyle:{
            			color:'#88d263',
            			width:8
            		},
            		
            	}
            },
            label: {
                normal: {
                    formatter: '{b}\n{d}',//{d}%
                },
            },
            data : [
                {
                    value : [0,0,0,0,0,0,0,0],
                    name : '栏目文章数'
                }
            ]
        }
    ]
};
myChart5.hideLoading();
ajaxGet('XWGZ_LMWZS',function(dats){
	cffm(dats);
});

function cffm(dats){
	var ddffss=[];
	var eena=[];
	var wwjson={};
	if(dats.data.length>0){
		for(var i=0; i<dats.data.length;i++){

			ddffss.push(dats.data[i].value);
			wwjson={};
			wwjson.text=dats.data[i].key;
			wwjson.max=dats.data[i].allNum;
			eena.push(wwjson);
		}  
		w_option5.series[0].data[0].value=ddffss;
		w_option5.radar.indicator=eena;
		myChart5.hideLoading();
		myChart5.setOption(w_option5);
	}
}
myChart5.setOption(w_option5);
}



// 本月发布栏目文章数
dangling()
function dangling(){
var myChart3 = echarts.init(document.getElementById('w_dangling'));
var optionaa= {
	title: {
        text: '本月发布栏目文章数',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b}\n{d}%' //({d}%)

    },
//  legend: {
//      
//      orient: 'vertical',
//      x: 'right',
//     itemWidth: 14,
//      itemHeight: 14,
//      align: 'left',
//  
//      data:['党建和组织工作宣传网','层党组织建设网','党员队伍建设网','干部工作网','山东省选调/n优秀高校毕/n业生到村任/n职网','第一书记/n管理服务网','政策法规库','学历教育网'],
//              textStyle: {
//          color: '#000'
//      }
//  },
    series: [
       
        {
            name:'本月发布栏目文章数',
            type:'pie',
            radius: ['46%', '55%'],
            color: [ '#0079c1','#d0021b','#417505','#5ddaf5','#88d263', '#4a90e2', '#ffb313','#f23c48', '#b841d1', '#9013fe','#143b75', '#3fd1b0', '#f8e71c'],
            label: {
                normal: {
                    formatter: '{b}\n{d}',//{d}%
                },
            },
            data:[
                {value:0, name:'党建和组织工作宣传网'},
                {value:0, name:'党层组织建设网'},
                {value:0, name:'党员队伍建设网'},
                {value:0, name:'省内其他市'},
                {value:0, name:'省委直属其它党组织'},
                {value:0, name:'市内其它县(市/区)'},
                {value:0, name:'市委直属其它党组织'},
                {value:0, name:'县(市/区)内其它乡镇(街道)'},
                {value:0, name:'县(市/区)委直属其它党组织'},
                {value:0, name:'本系统内其它党组织'},
                {value:0, name:'乡镇(街道)直属其它党组织'},
                {value:0, name:'省外(市/区)'},
                {value:0, name:'省外(市/区)'},
            ]
        }
    ]
};    
myChart3.hideLoading();
ajaxGet('XWGZ_BYLMWZS',function(dats){
	cnnb(dats)
});

function cnnb(dats){
	var ddffssjj=[];
	
	if(dats.data.length>0){
		for(var i=0; i<dats.data.length;i++){
			var ddjjson={};
			ddjjson.value=dats.data[i].value;
			ddjjson.name=dats.data[i].key;
			ddffssjj.push(ddjjson);	
		}
		optionaa.series[0].data=ddffssjj;
		myChart3.hideLoading();
		myChart3.setOption(optionaa);
	}
}
myChart3.setOption(optionaa);
}


// 上报文章总数以及通过比例
xingbie();
function xingbie(){
var myChart0 = echarts.init(document.getElementById('w_xingbie'));
var w_option0 = {
	 title : {
        text: '上报文章总数以及通过比例',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'item',
        formatter: '{b}\n{d}%'
    },
    legend: {
        bottom: 50,
        left: 'center',
        padding: 10,
        itemGap: 50,
        itemWidth: 30,
        itemHeight: 20,
        data: ['通过', '未通过','审核中'],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263',"red"],
            name:'比例',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'未通过'},
                {value:0, name:'通过'},
                {value:0, name:'审核中'}
            ],
            labelLine: {
                normal: {
                    show: false // 去线
                }
            },
            label:{
            	 normal: {
                    show: false,  // 去名字
               },
            }
        }
    ]
};
myChart0.hideLoading();
ajaxGet('XWGZ_SBWZS',function(dats){
	jjdx(dats)
});
var jjdd=null,ddd=null;
function jjdx(dats){
	if(dats.data.length>0){
	 jjdd=dats.data[0].value;
	 sessionStorage.setItem('jjdd',jjdd)
	 $('.w_lingtgbai').html(jjdd);
	}
}
ajaxGet('XWGZ_SBWZTGS',function(dats){
	cmmh(dats);
});
function cmmh(dats){
    console.log(dats);
	var sjj=null;
	var shz=null;
if(dats.data.length>0){
 ddd=dats.data[2].value;//未通过
 sjj=dats.data[1].value;//通过
   shz=dats.data[0].value; //审核中
 jjdd=sessionStorage.getItem('jjdd')// zong de 
w_option0.series[0].data[0].value=ddd;
w_option0.series[0].data[0].name=dats.data[2].key;

w_option0.series[0].data[1].value=sjj;
w_option0.series[0].data[1].name=dats.data[1].key;


w_option0.series[0].data[2].value=shz;
w_option0.series[0].data[2].name=dats.data[0].key;


//console.log(jjdd);
//console.log(ddd);
//
//$('.w_lingtg').html(sjj);
//$('.w_lingwwtg').html(ddd);
	if(jjdd==0){
//		$('.w_lingtgbai').html(0);
//		$('.w_lingwwtgbai').html(0);
		$('.w_lingtg').html(0);
		$('.w_lingwwtg').html(0);
        $('.f_lingwshz').html(0);
	}else{
//		$('.w_lingtgbai').html((ddd/jjdd).toFixed(2)+'%');
//		$('.w_lingwwtgbai').html((sjj/jjdd).toFixed(2)+'%');
		$('.w_lingtg').html(sjj);
		$('.w_lingwwtg').html(ddd);
        $('.f_lingwshz').html(shz);
	}
	myChart0.hideLoading();
	myChart0.setOption(w_option0);
}
}
myChart0.setOption(w_option0);
}

// 本月上报文章数以及通过比例
minzu();
function minzu(){
	var myChart1 = echarts.init(document.getElementById('w_minzu'));
var w_option1 = {
	 title : {
        text: '本月上报文章数以及通过比例',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'item',
        formatter: '{b}\n{d}%'
    },
    legend: {
        bottom: 50,
        left: 'center',
        padding: 10,
        itemGap: 30,
        itemWidth: 30,
        itemHeight: 20,
        data: ['通过', '未通过','审核中'],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263','red'],
            name:'比例',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'未通过'},
                {value:0, name:'通过'},
                {value:0, name:'审核中'}
            ],
            labelLine: {
                normal: {
                    show: false // 去线
                }
            },
            label:{
            	 normal: {
                    show: false,  // 去名字
               },
            }
        }
    ]
};
myChart1.hideLoading();
ajaxGet('XWGZ_BYSBWZS',function(dats){
	cxxz(dats);
});
var ttnnbbb=null,jjssj=null
function cxxz(dats){
	if(dats.data.length>0){
		ttnnbbb=dats.data[0].value;
		w_option1.series[0].data[1].value=dats.data[0].value; // 总数 
		sessionStorage.setItem('w_zong',dats.data[0].value);
		if(jjssj==0){
			$('.w_ttguoshubai').html(0);
//			$('.w_wtguoshubai').html(0);
		}else{
			$('.w_ttguoshubai').html(dats.data[0].value);
//			$('.w_wtguoshubai').html((dats.data[2].value/jjssj).toFixed(2)+'%');
		}	
	}
}
ajaxGet('XWGZ_BYSBWZTGS',function(dats){
	czzsb(dats)
});
function czzsb(dats){
	if(dats.data.length>0){
	 	jjssj=dats.data[2].value; // 未通过；
		w_option1.series[0].data[0].value=jjssj;
		w_option1.series[0].data[0].name=dats.data[2].key;

		w_option1.series[0].data[1].value=dats.data[1].value; //通过
		w_option1.series[0].data[1].name=dats.data[1].key;

        w_option1.series[0].data[2].value=dats.data[0].value; //审核中
        w_option1.series[0].data[2].name=dats.data[0].key;

		$('.w_ttguoshu').html(Math.abs(dats.data[1].value));
		$('.w_wtguoshu').html(Math.abs(dats.data[2].value));
        $('.f_shzhongshu').html(Math.abs(dats.data[0].value));
//		if(jjssj==0){
//			$('.w_ttguoshubai').html(0);
//			$('.w_wtguoshubai').html(0);
//		}else{
//			$('.w_ttguoshubai').html((parseInt(jjssj)/parseInt(jjssj)).toFixed(2)+'%');
//			$('.w_wtguoshubai').html((dats.data[2].value/jjssj).toFixed(2)+'%');
//		}	 
	}
	myChart1.hideLoading();
	myChart1.setOption(w_option1);
}
myChart1.setOption(w_option1);
}




// 岗位
//gangweide()
//function gangweide(){
//	var myChart4 = echarts.init(document.getElementById('w_gangweide'));
//var w_option4 = {
//  title: {
//      text: '党员岗位',
//     	x:'20px',
//     	textStyle: {
//          fontSize: 25,
//          fontWeight:'bolder',
//      },
//  },
//  tooltip: {
//      trigger: 'axis',
//      axisPointer: {
//          lineStyle: {
//              color: 'none', //不显示线条
//          },
//      }
//  },
//  grid: {
//      left: '3%',
//      right: '4%',
//      bottom: '3%',
//      containLabel: true
//  },
//  xAxis: [{
//	        type: 'value',
//	        boundaryGap: [0],
//	        axisLine:{
//		    	show: false,        // 默认显示，属性show控制显示与否
//		        lineStyle: {       // 属性lineStyle控制线条样式
//		            color: '#48b',
//		            width: 2,
//		            type: 'solid'
//		        }
//		    },
//		    axisTick:{
//	        	show: false, 
//	        }
//      }
//  ],
//  yAxis: [
//  	{
//	        type: 'category',
//	        data: ['在岗职工','农牧渔民','解放军','武警','学生','离退休人员','其他人员'],
//	        axisLabel:{
//	        		color:'#9d9d9d'
//	        },
//	        axisLine:{
//		    	show: false,        // 默认显示，属性show控制显示与否
//		        lineStyle: {       // 属性lineStyle控制线条样式
//		            color: '#9d9d9d',
//		            width: 1,
//		            type: 'solid'
//		        }
//		    },
//		    axisTick:{
//	        	show: false,   // 小标记
//	        }
//    	}  
//  ],
//  series: [
//      {
//          name: '党员岗位',
//          type: 'bar',
//          data: [518203, 423489, 529034, 504970, 531744, 630230, 630230],
//          barWidth:30,
//      }
//  ]
//};
//w_option4.series[0].itemStyle={
//	normal: {
//		barBorderRadius:15,
//	    color: function(params) {
//
//          var index = params.dataIndex;
//          var alternateNumber = 2;
//
//          var newColor="";                        
//          var colorList = ['#3480d9','#f54653'];
//          if(index < alternateNumber){
//
//              newColor = colorList[index];
//
//          }else{
//
//              var rowNumber=Math.floor(index/alternateNumber);
//
//              newColor = colorList[index-rowNumber*alternateNumber];
//          }
//          return newColor
//		}
//	}
//};                 
//myChart4.setOption(w_option4);
//
//}
//


//下属党组织发布文章数量以及通过未通过比例
dangyuannum()
function dangyuannum(){
	var myChart = echarts.init(document.getElementById('w_dangyuanNum'));

var w_option = {

    title:{
        text: '下属党组织上报文章数量以及通过未通过比例',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    color:['#88d263','#4a90e2','#FF0000'],
    legend: {
        data: ['通过', '未通过','审核中'],
        right: '150',
    },
    tooltip : {
        trigger: 'axis'
    },
    grid: {
    	top:'100px',
        left: '2%',
        right: '2%',
        bottom: '10px',
        containLabel: true
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data :  ['滕州市委','薛城区委','山亭区委' ,'市中区委', '峰城区委', '台儿庄区委', '市直机关工委', '市委党校', '日报社委', '经信委', '教委', '中共枣庄学院委员会','中共枣庄职业学院院委员会','中共枣庄市商务局委员会','中共枣庄市司法局委员会','中共枣庄市人力资源和社会保障局委员会','中共枣庄市住房和城市建设局委员会','中共枣庄市煤炭工业局委员会','中共枣庄市农业局委员会','中共枣庄市水利和渔业局委员会','中共鲁南中联水泥有限公司委员会','中共枣庄银行股份有限公司委员会','中共枣庄市供销合作社联合社委员会'],
            axisLabel:{
                interval: 0,
                fontSize: 12,
                fontWeight: 100,
                textStyle: {
                    color: '#666',
                },
                formatter:function (params){
                    var newParamsName = "";// 最终拼接成的字符串
                    var paramsNameNumber = params.length;// 实际标签的个数
                    var provideNumber = 4;// 每行能显示的字的个数
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                    /**
                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                     */
                    // 条件等同于rowNumber>1
                    if (paramsNameNumber > provideNumber) {
                        /** 循环每一行,p表示行 */
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";// 表示每一次截取的字符串
                            var start = p * provideNumber;// 开始截取的位置
                            var end = start + provideNumber;// 结束截取的位置
                            // 此处特殊处理最后一行的索引值
                            if (p == rowNumber - 1) {
                                // 最后一次不换行
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                // 每一次拼接字符串并换行
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;// 最终拼成的字符串

                        }

                    } else {
                        // 将旧标签的值赋给新标签
                        newParamsName = params;
                    }
                    //将最终的字符串返回

                    return newParamsName
                }
            },
            axisLine:{
		    	show: false,
		    	width:4,
		    	color:'#f23c48'
            },
            axisTick:{
	        	show: false,
            },
            aplitArea:{
                show:false
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel:{
        		color:'#9d9d9d'
        	},
        	axisLine:{
		    	show: false,
	        },
	        axisTick:{
	        	show: false,
	        },
	        splitLine: {         //分割 线条 实线虚线
	            lineStyle: {
	                type: 'dashed'
	            }
	        }
        }
    ],
    series : [
        {
            name:'通过',
            type:'bar',
            stack: '总量',
            data:[0, 0,0, 0, 0, 0, 0, 0, 0,0,0,0,0, 0,0,0,0, 0, 0, 0, 0, 0, 0],
            barWidth:30,
            itemStyle: {
                normal: {
                    barBorderRadius:[0,0,15,15],
                }
            },
        },
        {
            name:'未通过',
            type:'bar',
            stack: '总量',
            data:[0, 0,0, 0, 0, 0, 0, 0, 0,0,0,0,0, 0,0,0,0, 0, 0, 0, 0, 0, 0],
            barWidth:30,
            // itemStyle: {
            //     normal: {
            //         barBorderRadius:15,
            //     }
            // },
//      	barMinHeight: 30,  // 最小高度改为350  设置默认
        },
        {
            name:'审核中',
            type:'bar',
            stack: '总量',
            data:[0, 0,0, 0, 0, 0, 0, 0, 0,0,0,0,0, 0,0,0,0, 0, 0, 0, 0, 0, 0],
            barWidth:30,
            itemStyle: {
                normal: {
                    barBorderRadius:[15,15,0,0],
                }
            },
//      	barMinHeight: 30,  // 最小高度改为350  设置默认
        },

    ]
};
myChart.hideLoading();
ajaxGet('XWGZ_XSDZZFBWZTGS',function(dats){
	essz(dats);
});
function essz(dats){
if(dats.data.length>0){
var dff=[];
var sjnj=[];
var dffcc=[];
var ssjnj=[];
var shz=[];
var shznj=[];
	for(var i=0;i<dats.data.length;i++){
		if(dats.data[i].key=='通过'){
			dff.push(dats.data[i].value);
			sjnj.push(dats.data[i].bz);
		}else if(dats.data[i].key=='未通过'){
			dffcc.push(dats.data[i].value);
			ssjnj.push(dats.data[i].bz)			
		}else if(dats.data[i].key=='审核中'){
            shz.push(dats.data[i].value);
            shznj.push(dats.data[i].bz);
        }
		
	}
	w_option.series[0].data=dff
	w_option.xAxis[0].data=sjnj;
	
	w_option.series[1].data=dffcc;
	w_option.xAxis[0].data=ssjnj;

    w_option.series[2].data=shz;
    w_option.xAxis[0].data=shznj;

	myChart.hideLoading();
	myChart.setOption(w_option);
}
};



//ajaxGet('XWGZ_XSDZZFBWZWTGS',function(){
//	wxxc(dats)
//});

//function wxxc(dats){
//	
//	if(dats.data.length>0){
//		for(var i=0;i<dats.data.length;i++){
//			dffcc.push(dats.data[i].value);
//			ssjnj.push(dats.data[i].bz)
//		}
//	}
//	
//}




myChart.setOption(w_option);
}

