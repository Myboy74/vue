

// 本月党组织净增减数量
xingbie();
function xingbie(){
//var myChart0 = echarts.init(document.getElementById('w_xingbie'));
//var w_option0 = {
//	 title : {
//      text: '本月党组织净增减数量',
//      x:'20px',
//      textStyle: {
//          fontSize: 25,
//          fontWeight:'bolder',
//      },
//  },
//  tooltip : {
//      trigger: 'item'
//  },
//  legend: {
//      bottom: 40,
//      left: 'center',
//      padding: 10,
//      itemGap: 50,
//      itemWidth: 30,
//      itemHeight: 20,
//      data: ['增加', '减少'],
//      textStyle: {
//          fontSize: 25,
//      }
//  },
//  calculable : true,
//  series : [
//      {	
//      	color:['#4a90e2','#88d263'],
//          name:'本月党组织净减数量',
//          type:'pie',
//          radius : ['55%', '65%'],            
//          data:[
//              {value:0, name:'减少'},
//              {value:0, name:'增加'},
//          ],
//          labelLine: {
//              normal: {
//                  show: false // 去线
//              }
//          },
//          label:{
//          	 normal: {
//                  show: false,  // 去名字
//             },
//          }
//      }
//  ]
//};
// 本月净增减数量
ajaxGet('DZZJBXX_ZZJZSL',function(dats){
	var data04=[];
//	console.log(dats);
	if(dats.data.length>0){
		for( var i=0; i<dats.data.length;i++){
			var json={}
			json.value=dats.data[i].value;
			if(i==1){
				json.name='增加'
			}else if(i==0){
				json.name='减少'
			}
			data04.push(json)
		}
	var w_benaa=null;	
	var w_shangmm=null;
		if(dats.data[1].key=='本月'){
			w_benaa=dats.data[1].value
		}else{
			w_benaa=dats.data[0].value
		}
		
		if(dats.data[1].key=='上月'){
			w_shangmm=dats.data[1].value
		}else{
			w_shangmm=dats.data[0].value
		}
		
		
	
	var w_add=w_benaa-w_shangmm;
	if(w_add>0){
		w_add="+"+w_add
	}else if(w_add<0){
		w_add=w_add
	}else{
		w_add=w_add
	}
	$('.w_zengjia').html(w_add);

	var w_baifeubicc=null;
	if(w_shangmm!='0'){
		$('.w_zengjiabai').html((((parseInt(w_benaa)-parseInt(w_shangmm))/w_shangmm)*100).toFixed(2)+'%')
	}else{
		$('.w_zengjiabai').html(((parseInt(w_benaa)-parseInt(w_shangmm))*100).toFixed(2)+'%')
	}

	
//	$('.w_jianshaobai').html((dats.data[0].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%')
//	w_option0.series[0].data=data04;   	
	}else if(dats.data.length==0){
		$('.w_zengjia').html('');
	}
})
//console.log(dats)
//if(dats){

//}
//myChart0.setOption(w_option0);
}

// 不规范党组织统计情况
gangweide()
function gangweide(){
	var myChart4 = echarts.init(document.getElementById('w_gangweide'));
var w_option12 = {
    title: {
        text: '不规范党组织统计情况',
       	x:'20px',
       	textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#9d9d9d', //不显示线条
				type:'dashed'
            },
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
	        type: 'value',
	        boundaryGap: [0],
	        axisLine:{
		    	show: false,        // 默认显示，属性show控制显示与否
		        lineStyle: {       // 属性lineStyle控制线条样式
		            color: '#48b',
		            width: 2,
		            type: 'solid'
		        }
		    },
		    axisTick:{
	        	show: false, 
	        }
        }
    ],
    yAxis: [
    	{
	        type: 'category',
	        data: ['无党员党支部','1人党支部','2人党支部','100人以上党支部'],
	        axisLabel:{
	        		color:'#9d9d9d'
	        },
	        axisLine:{
		    	show: false,        // 默认显示，属性show控制显示与否
		        lineStyle: {       // 属性lineStyle控制线条样式
		            color: '#9d9d9d',
		            width: 1,
		            type: 'solid'
		        }
		    },
		    axisTick:{
	        	show: false,   // 小标记
	        }
      	}  
    ],
    series: [
        {
            name: '个数',
            type: 'bar',
            data: [0, 0, 0, 0],
            barWidth:30,
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            barMinHeight: 10,  // 最小高度改为350  设置默认
        }
    ]
};
myChart4.hideLoading();
ajaxGet('DZZJBXX_BGFDZZ',function(dats){
	if(dats.data.length>0){
		var qq=[];
		var sscc=[];
		for(var i=0; i<dats.data.length;i++){
			qq.push(dats.data[i].value);
			sscc.push(dats.data[i].key)
		}
		w_option12.series[0].data=qq;
		w_option12.yAxis[0].data=sscc;
		
		myChart4.setOption(w_option12);
	}
	myChart4.hideLoading();
});
w_option12.series[0].itemStyle={
	normal: {
		barBorderRadius:15,
	    color: function(params) {

            var index = params.dataIndex;
            var alternateNumber = 2;

            var newColor="";                        
            var colorList = ['#3480d9','#f54653'];
            if(index < alternateNumber){

                newColor = colorList[index];

            }else{

                var rowNumber=Math.floor(index/alternateNumber);

                newColor = colorList[index-rowNumber*alternateNumber];
            }
            return newColor
		}
	}
};   
//$('.w_loding').hide()
myChart4.setOption(w_option12);

}


// 党组织单位类型统计
xueli();
function xueli(){
var myChart5 = echarts.init(document.getElementById('w_danwei'));
var w_option5 = {
    title: {
        text: '党组织单位类型统计',
       	x:'20px',
       	textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#9d9d9d', //不显示线条
				type:'dashed'
            },
        },
    },
    calculable : true,
    radar : {
        
            indicator : [
                {text : '机关', max  : 30000},
                {text : '社会组织', max  : 36000},
                {text : '事业单位', max  : 30000},
                {text : '企业', max  : 30000},
                {text : '乡镇街道', max  : 300000},
                {text : '其它', max  : 30000},

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
                trigger: 'item'
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
            data : [
                {
                    value : [0,0,0,0,0,0 ],
                    name : '个数'
                }
            ]
        }
    ]
};
myChart5.hideLoading();
ajaxGet('DZZJBXX_DWLX',function(dats){
	var qq=[];
	var mmjson={};
	var arrjj=[];
	
	if(dats.data.length>0){
		for(var i=0; i<dats.data.length;i++){
			mmjson={};
			qq.push(dats.data[i].value);
			mmjson.text=dats.data[i].key;
			mmjson.max=dats.data[i].allNum;
			arrjj.push(mmjson);
		}
		w_option5.series[0].data[0].value=qq;
		w_option5.radar.indicator=arrjj;
		myChart5.hideLoading();
		myChart5.setOption(w_option5);
	}
});
//console.log(dats);
myChart5.setOption(w_option5);
}


// 不规范党组织统计情况
orgleixing()
function orgleixing(){
	var myChart4ff = echarts.init(document.getElementById('w_orgleixing'));
var w_option4 = {
    title: {
        text: '党组织类型',
       	x:'20px',
       	textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#9d9d9d', //不显示线条
				type:'dashed'
            },
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
	        type: 'value',
	        boundaryGap: [0],
	        axisLine:{
		    	show: false,        // 默认显示，属性show控制显示与否
		        lineStyle: {       // 属性lineStyle控制线条样式
		            color: '#48b',
		            width: 2,
		            type: 'solid'
		        }
		    },
		    axisTick:{
	        	show: false, 
	        }
        }
    ],
    yAxis: [
    	{
	        type: 'category',
	        data: ['农村','机关','高校','社区','两新','国有企业','非公'],
	        axisLabel:{
	            color:'#9d9d9d',
                lineHeight: "20",
                formatter:function (params){
    var newParamsName = "";// 最终拼接成的字符串
    var paramsNameNumber = params.length;// 实际标签的个数
    var provideNumber = 10;// 每行能显示的字的个数
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
		    	show: false,        // 默认显示，属性show控制显示与否
		        lineStyle: {       // 属性lineStyle控制线条样式
		            color: '#9d9d9d',
		            width: 1,
		            type: 'solid'
		        }
		    },
		    axisTick:{
	        	show: false,   // 小标记
	        }
      	}  
    ],
    series: [
        {
            name: '个数',
            type: 'bar',
            data: [0, 0, 0, 0,0,0,0],
            barWidth:30,
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            barMinHeight: 10,  // 最小高度改为350  设置默认
        }
    ]
}; 
myChart4ff.hideLoading();
ajaxGet('DZZJBXX_DZZLX',function(dats){
	var qq=[];
	var wweepp=[];
		if(dats.data.length>0){
	for(var i=0; i<dats.data.length;i++){
		qq.push(dats.data[i].value);
		wweepp.push(dats.data[i].key);
    }
w_option4.series[0].data=qq;
w_option4.yAxis[0].data=wweepp;

myChart4ff.hideLoading();
myChart4ff.setOption(w_option4);
}
});
//console.log(dats);
w_option4.series[0].itemStyle={
	normal: {
		barBorderRadius:15,
	    color: function(params) {

            var index = params.dataIndex;
            var alternateNumber = 2;

            var newColor="";                        
            var colorList = ['#3480d9','#f54653'];
            if(index < alternateNumber){

                newColor = colorList[index];

            }else{

                var rowNumber=Math.floor(index/alternateNumber);

                newColor = colorList[index-rowNumber*alternateNumber];
            }
            return newColor
		}
	}
};

    myChart4ff.setOption(w_option4);

}









// 不规范党组织单位类别统计情况
dangling()
function dangling(){
var myChart3 = echarts.init(document.getElementById('w_dangling'));
var w_option3 = {
    title: {
        text: '不规范党组织单位类别统计情况',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    grid: {
    	top:'100px',
        left: '2%',
        right: '2%',

        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#88d263',  //鼠标画上 背景色
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
        data: ['城市街道','城市社区','乡镇','乡镇社区','建制村','国有经济控制企业','集体经济控制企业','非公有制经济控制企业','事业单位','机关','社会组织','其它'],
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
            name:'个数',
            type:'line',
            symbolSize: 5,
        	showSymbol: true,
            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0],
            lineStyle:{
                normal:{
                    width:7,
                    color:'#88d263',
                },
            },
            areaStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(226,244,217, 0.9)'
	                }, {
	                    offset: 1,
	                    color: 'rgba(251,253,250, 0.1)'
	                }], false),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        },
	        itemStyle: {
	            normal: {
	                color: '#88d263',
	                borderColor: '#88d263',
	                borderWidth: 12
	
	            }
	        },
	        
        }
    ]
};  
myChart3.hideLoading();
ajaxGet('DZZJBXX_BGFDZZDWLB',function(dats){
	var qq=[];
	var sscc=[];
	if(dats.data.length>0){
	for(var i=0; i<dats.data.length;i++){
		qq.push(dats.data[i].value);
		sscc.push(dats.data[i].key)
	}
	w_option3.series[0].data=qq;
	w_option3.xAxis.data=sscc;
	myChart3.hideLoading();
	myChart3.setOption(w_option3);
	}
});
//console.log(dats);


myChart3.setOption(w_option3);
}

//下属党组织组织数量
dangyuannum()
function dangyuannum(){
	var myChart = echarts.init(document.getElementById('w_dangyuanNum'));

var w_option = {
    title:{
        text: '下属党组织组织数量',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },

    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#9d9d9d', //不显示线条
				type:'dashed'
            },
        },
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
            data :  ['滕州市委','薛城区委','山亭区委' ,'市中区委', '峰城区委', '台儿庄区委', '市直机关工委', '市委党校', '日报社委', '经信委', '教委', '中共枣庄学院委员会','中共枣庄职业学院院委员会','中共枣庄市商务局委员会','中共枣庄市司法局委员会','中共枣庄市人力资源和社会保障局委员会','中共枣庄市住房和城市建设局委员会','中共枣庄市煤炭工业局委员会','中共枣庄市农业局委员会','中共枣庄市水利和渔业局委员会','中共鲁南中联水泥有限公司委员会','中共枣庄银行股份有限公司委员会','中共枣庄\市供销合作社联合社委员会'],
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
		    	show: true,
		    	width:4,
		    	color:'#f23c48'
	        },
	        axisTick:{
	        	show: false, 
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
            name:'党组织数量',
            type:'bar',
            data:[0, 0,0, 0, 0, 0, 0, 0, 0,0,0,0,0, 0,0,0,0, 0, 0, 0, 0, 0, 0],
        	barWidth:30,
        	barGap:20,
        	barMinHeight: 10,  // 最小高度改为350  设置默认
        },        
    ]
};
myChart.hideLoading();
ajaxGet('DZZJBXX_XSDZZSL',function(dats){
	var qq=[];
	var dort=[];
//	var zongshu=0;
if(dats.data.length>0){
for(var i=0; i<dats.data.length;i++){
	qq.push(dats.data[i].value);
	dort.push(dats.data[i].bz);
//	zongshu+=parseInt(dats.data[i].value);
}
//alert(zongshu);
w_option.series[0].data=qq;
w_option.xAxis[0].data=dort;
myChart.hideLoading();
myChart.setOption(w_option);
}
});
w_option.series[0].itemStyle={
	normal: {
		barBorderRadius:15,
	    color: function(params) {
            var index = params.dataIndex;
            var alternateNumber = 2;
            var newColor="";                        
			var colorList = ['#fbb03b','#29abe2'];
	
	        if(index < alternateNumber){
	
	            newColor = colorList[index];
	
	        }else{
	
	            var rowNumber=Math.floor(index/alternateNumber);
	
	            newColor = colorList[index-rowNumber*alternateNumber];
	        }
	        return newColor
	    }
	}
};

myChart.setOption(w_option);
}

ajaxGet('DZZJBXX_ZS',function(dats){
	$('.w_pnum').html(dats.data[0].value)
});
//console.log(dats);z