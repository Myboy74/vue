var dats=null
// 性别
xingbie();
function xingbie(){
var myChart0 = echarts.init(document.getElementById('w_xingbie'));
var optionxx = {
	 title : {
        text: '党员性别',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        bottom: 70,
        left: 'center',
        padding: 10,
        itemGap: 50,
        itemWidth: 30,
        itemHeight: 20,
        data: ['女性', '男性',],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263'],
            name:'党员性别',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'女性'},
                {value:0, name:'男性'},
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
ajaxGet('DYJBXX_DYXB',function(dats){
	if(dats.data.length>0){
		optionxx.series[0].data[0].name=dats.data[0].key+'性'; //nv
		optionxx.series[0].data[0].value=dats.data[0].value;
		optionxx.series[0].data[1].name=dats.data[1].key+'性';
		optionxx.series[0].data[1].value=dats.data[1].value;
		$('.w_nv').html(dats.data[1].value);
		$('.w_nan').html(dats.data[0].value);
		$('.w_nvbai').html( (dats.data[1].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%' )
		$('.w_nanbai').html( (dats.data[0].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%' )		
		myChart0.hideLoading();
		myChart0.setOption(optionxx);
	}
})
//if(dats){
	
//}
//console.log(dats)



myChart0.hideLoading();
myChart0.setOption(optionxx);
}

// 民族
minzu();
function minzu(){
	var myChart1 = echarts.init(document.getElementById('w_minzu'));
var w_option1 = {
	 title : {
        text: '党员民族',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'item'
    },
//   grid: {
//   	top:'1%',
//      left: '3%',
//      right: '4%',
//      bottom: '10%',
//      containLabel: true
//  },
    legend: {
        bottom: 70,
        left: 'center',
        padding: 10,
        itemGap: 30,
        itemWidth: 30,
        itemHeight: 20,
        data: ['少数民族', '汉族',],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263'],
            name:'人数',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'少数民族'},
                {value:0, name:'汉族'},
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
ajaxGet('DYJBXX_DYMZ',function(dats){
	if(dats.data.length>0){
	w_option1.series[0].data[0].name=dats.data[0].key;
	w_option1.series[0].data[0].value=dats.data[0].value;
	w_option1.series[0].data[1].name=dats.data[1].key;
	w_option1.series[0].data[1].value=dats.data[1].value;
	$('.w_shao').html(dats.data[1].value);
	$('.w_han').html(dats.data[0].value);
	$('.w_shaobai').html( (dats.data[1].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%' )
	$('.w_hanbai').html( (dats.data[0].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%' )
	myChart1.hideLoading();
	myChart1.setOption(w_option1);
	}
})
//console.log(dats)  
//if(dats){
//	
//}


myChart1.setOption(w_option1);
}

//类别
leibie();
function leibie(){
	var myChart2 = echarts.init(document.getElementById('w_leibie'));
var w_option2 = {
	 title : {
        text: '党员类型',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
        bottom: 70,
        left: 'center',
        padding: 10,
        itemGap: 20,
        itemWidth: 30,
        itemHeight: 20,
        data: ['预备党员', '正式党员',],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263'],
            name:'党员类型',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'正式党员'},
                {value:0, name:'预备党员'},
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
ajaxGet('DYJBXX_DYLB',function(dats){
	if(dats.data.length>0){
	w_option2.series[0].data[0].name=dats.data[0].key;
	w_option2.series[0].data[0].value=dats.data[0].value;
	w_option2.series[0].data[1].name=dats.data[1].key;
	w_option2.series[0].data[1].value=dats.data[1].value;
	$('.w_yubei').html(dats.data[0].value);
	$('.w_zheng').html(dats.data[1].value);
	$('.w_yubeibai').html( (dats.data[0].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%' )
	$('.w_zhengbai').html( (dats.data[1].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%' )
	myChart2.hideLoading();
	myChart2.setOption(w_option2);
	}
})
////console.log(dats)
//if(dats){
//	
//}
               
myChart2.setOption(w_option2);
}

//年龄
nianling();
function nianling(){
	var myChart3 = echarts.init(document.getElementById('w_nianling'));
var w_optionxx3 = {
    title: {
        text: '党员年龄',
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
        data: ['<20','21-25','26-30','31-35','36-40','41-45','46-50','51-55','56-60','>60'],
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
        },
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    series: [
        {
            name:'人数',
            type:'line',
            symbolSize: 5,
        	showSymbol: true,
            data:[0,0,0,0,0,0,0,0,0,0],
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
myChart3.hideLoading();   
ajaxGet('DYJBXX_DYNL',function(dats){
	var qqdata=[];
	var ssjjn=[];
		if(dats.data.length>0){
			for(var i=0; i<dats.data.length;i++){
				qqdata.push(dats.data[i].value);
				ssjjn.push(dats.data[i].key)
			}
			
			w_optionxx3.series[0].data=qqdata;
			w_optionxx3.xAxis.data=ssjjn;
			myChart3.hideLoading();
			myChart3.setOption(w_optionxx3);
		}
});
//console.log(dats);

//qqdata.push(dats.data[9].value);
//qqdata.push(dats.data[1].value);
//qqdata.push(dats.data[2].value);
//qqdata.push(dats.data[3].value);
//qqdata.push(dats.data[4].value);
//qqdata.push(dats.data[5].value);
//qqdata.push(dats.data[7].value);
//qqdata.push(dats.data[6].value);
//qqdata.push(dats.data[0].value);
//qqdata.push(dats.data[8].value);

myChart3.setOption(w_optionxx3);
}

// 岗位
gangweide()
function gangweide(){
var myChart4 = echarts.init(document.getElementById('w_gangweide'));
var w_option4zz = {
    title: {
        text: '党员岗位',
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
	        data: ['在岗职工','农牧渔民','解放军','武警','学生','离退休人员','其他人员'],
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
            name: '人数',
            type: 'bar',
            data: [0,0,0,0,0,0,0],
            barWidth:30,
//          barMinHeight:10
        }
    ]
};
myChart4.hideLoading(); 
ajaxGet('DYJBXX_DYGW',function(dats){
	var data01=[];
	var ssdddata=[];
	if(dats.data.length>0){
	for(var i=0; i<dats.data.length;i++){
		data01.push(dats.data[i].value);
		ssdddata.push(dats.data[i].key)
	}
	w_option4zz.series[0].data=data01;
	w_option4zz.yAxis[0].data=ssdddata;
	myChart4.hideLoading();
	myChart4.setOption(w_option4zz);
	}

})
//console.log(dats)

//data01.push(dats.data[5].value);
//data01.push(dats.data[4].value);
//data01.push(dats.data[3].value);
//data01.push(dats.data[2].value);
//data01.push(dats.data[1].value);
//data01.push(dats.data[0].value);
//data01.push(dats.data[6].value);



w_option4zz.series[0].itemStyle={
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
myChart4.setOption(w_option4zz);

}


// 学历
xueli();
function xueli(){
var myChart5 = echarts.init(document.getElementById('w_xueli'));
var w_option5 = {
    title: {
        text: '党员学历',
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
	            {text : '研究生', max: 5},
	            {text : '本科生', max: 5},
	            {text : '中等职业学校', max: 5},
	            {text : '高中', max: 5},
	            {text : '初中', max: 5},
	            {text : '小学', max: 5},
	            {text : '其他', max: 5},
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
                    value : [0,0,0,0,0,0,0],
                    name : '人数'
                }
            ]
        }
    ]
};

myChart5.hideLoading();   
ajaxGet('DYJBXX_DYXL',function(dats){
	var data02=[];
var mmjson={};
var arrjj=[];

	if(dats.data.length>0){
	for(var i=0; i<dats.data.length;i++){
		mmjson={};
		data02.push(dats.data[i].value);
		mmjson.text=dats.data[i].key;
		mmjson.max=dats.data[i].allNum;
		arrjj.push(mmjson);
	}
w_option5.series[0].data[0].value=data02;
w_option5.radar.indicator=arrjj;
myChart5.hideLoading();
myChart5.setOption(w_option5);
}
})
//console.log(dats)
myChart5.setOption(w_option5);
}

// 党龄
dangling()
function dangling(){
var myChart3x = echarts.init(document.getElementById('w_dangling'));
var w_option3 = {
    title: {
        text: '党员党龄',
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
        data: ['<5','6-10','11-15','16-20','21-25','26-30','31-35','36-40','41-45','46-50','>50'],
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
            name:'人数',
            type:'line',
            symbolSize: 5,
        	showSymbol: true,
            data:[0,0,0,0,0,0,0,0,0,0,0],
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
myChart3x.hideLoading();   
ajaxGet('DYJBXX_DYDL',function(dats){
	var data03=[];
	var ssjbj=[];
//data03.push(dats.data[1].value);
//data03.push(dats.data[2].value);
//data03.push(dats.data[6].value);
//data03.push(dats.data[3].value);
//data03.push(dats.data[0].value);
//data03.push(dats.data[5].value);
//data03.push(dats.data[4].value);
//data03.push(dats.data[10].value);
//data03.push(dats.data[8].value);
//data03.push(dats.data[9].value);
//data03.push(dats.data[7].value);

	if(dats.data.length>0){
for( var i=0; i<dats.data.length;i++){
	data03.push(dats.data[i].value);
	ssjbj.push(dats.data[i].key)
}
w_option3.series[0].data=data03;
w_option3.xAxis.data=ssjbj;
myChart3x.hideLoading();
myChart3x.setOption(w_option3);
}
})
//console.log(dats);



myChart3x.setOption(w_option3);
}

//党员数量
dangyuannum()
function dangyuannum(){
	var myChart = echarts.init(document.getElementById('w_dangyuanNum'));

var w_option = {

    title:{
        text: '下属党组织党员数量',
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
            name:'下属党组织党员数量',
            type:'bar',
            data:[0, 0,0, 0, 0, 0, 0, 0, 0,0,0,0,0,  0,0,0,0, 0, 0, 0, 0, 0, 0],
        	barWidth:30,
        	barGap:20,
//      	barMinHeight: 10,  // 最小高度改为350  设置默认
        },
        
    ]
};
myChart.hideLoading();   
ajaxGet('DYJBXX_XSDYSL',function(dats){
	var data04=[];
	var ssddat=[];
	if(dats.data.length>0){
	for( var i=0; i<dats.data.length;i++){
		data04.push(dats.data[i].value);
		ssddat.push(dats.data[i].bz);
	}
	w_option.series[0].data=data04;
	w_option.xAxis[0].data=ssddat;
	myChart.hideLoading();
	myChart.setOption(w_option);
}
})




//console.log(dats)
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

ajaxGet('DYJBXX_DYZS',function(dats){

	$('.w_all').html(dats.data[0].value)

})
//;


//ajaxGet('DYJBXX_DYGW ')
//console.log(dats);
//ajaxGet('DYJBXX_DYZS')
//console.log(dats);

