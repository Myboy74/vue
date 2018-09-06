
//本月关系转借人次
ajaxGet('GXZJ_BYRS',function(data){
//	if(dats){
	if(data.data.length>0){
		
		var w_benben=null;
		if(data.data[1].key=='本月'){
			w_benben=data.data[1].value
		}else{
			w_benben=data.data[0].value
		}
		
		var w_shangsahng=null;
		if(data.data[1].key=='上月'){
			w_shangsahng=data.data[1].value
		}else{
			w_shangsahng=data.data[0].value
		}
		
		var w_addsx=w_benben-w_shangsahng;
		
		if(w_addsx>0){
			w_addsx ='+'+w_addsx;
		}else{
			w_addsx =w_addsx;
		}
		$('.w_zhuanru').html( w_benben );
		
		if(w_shangsahng=='0'){
			$('.w_zengde').html( ((w_benben-w_shangsahng)*100).toFixed(2)+'%' )
		}else{
			$('.w_zengde').html( (((w_benben-w_shangsahng)/w_shangsahng)*100).toFixed(2)+'%' )
		}
		
		
	}
//}
})


//暂无
ajaxGet('GXZJ_PJYWBLSJ',function(data){
	if(data.data.length>0){
		$('.w_shijian').html(data.data[0].value)
	}
})



// 本月关系转接人次以及比例
zhuanchu(3);
function zhuanchu(id){
//	转出 1  转入 2  全部 3
	if(id==1){

		minzu(1);
		leibie(1);
		guanxizhuanjie(1);
		nianling(1);
		gangweide(1);
		xueli(1);
		leibiebili(1);
		dangling(1);
		dangyuannum(1);
		dangyuanGangwei(1)
	}else if(id==2){

		minzu(2);
		leibie(2);
		guanxizhuanjie(2);
		nianling(2);
		gangweide(2);
		xueli(2);
		leibiebili(2);
		dangling(2);
		dangyuannum(2);
		dangyuanGangwei(2)
	}else if(id==3){

		minzu(3);
		leibie(3);
		guanxizhuanjie(3);
		nianling(3);
		gangweide(3);
		xueli(3);
		leibiebili(3);
		dangling(3);
		dangyuannum(3);
		dangyuanGangwei(3)
	}
	
}


xingbie();
function xingbie(){
var myChart0 = echarts.init(document.getElementById('w_xingbie'));
var w_option0 = {
	 title : {
        text: '本月关系转接人次以及比例',
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
        data: ['转入', '转出',],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263'],
            name:'本月关系转接人次以及比例',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'转出'},
                {value:0, name:'转入'},
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
	ajaxGet('GXZJ_BYRCBL',function(data){
		var dats=data;
		if(dats.data.length>0){
			w_option0.series[0].data[1].value=dats.data[1].value;
			w_option0.series[0].data[0].value=dats.data[0].value;
			$('.w_zhuanruma').html(dats.data[1].value);
			$('.w_zhuanchuma').html(dats.data[0].value);
			if(!parseInt(dats.data[1].value)&&!parseInt(dats.data[0].value)){
				$('.w_zhuanrumabai').html('0');
				$('.w_zhuanchumabai').html('0');
			}else{							
				$('.w_zhuanrumabai').html((dats.data[1].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%')
				$('.w_zhuanchumabai').html((dats.data[0].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%')
			}	
			
			myChart0.setOption(w_option0);
		}
		myChart0.hideLoading();
	});
//if(dats){
//	
//}


myChart0.setOption(w_option0);
}

// 党员性别
//minzu();
function minzu(ids){
	var myChart1 = echarts.init(document.getElementById('w_minzu'));
var w_option1 = {
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
        itemGap: 30,
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
                {value:0, name:'男性'},
                {value:0, name:'女性'},
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
if(ids==1){
	ajaxGet('GXZJ_ZC_DYXB',function(data){
		var dats=data
		datt(dats)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_DYXB',function(data){
		var dats=data
		datt(dats)
	});
}else if(ids==3){
	ajaxGet('GXZJ_DYXB',function(data){	
		var dats=data
		datt(dats)
	});
}

function datt(dats){	
//	console.log(dats);
	if(dats.data.length>0){
		w_option1.series[0].data[1].value=dats.data[1].value;
		w_option1.series[0].data[1].name=dats.data[1].key+'性';
		
		w_option1.series[0].data[0].value=dats.data[0].value;
		w_option1.series[0].data[0].name=dats.data[0].key+'性';
		
		$('.w_nvss').html(dats.data[0].key=='女' ? dats.data[0].value : dats.data[1].value);
		$('.w_nanss').html(dats.data[0].key=='男' ? dats.data[0].value : dats.data[1].value);
//		for(var i=0; i<dats.data.length;i++){
//			if(dats.data[i].key='女'){
//				;
//			}
//
//		}
//		for(var j=0; j<dats.data.length;j++){
//
//			if(dats.data[j].key='男'){
//				console.log(dats.data[j].value)
//				$('.w_nanss').html(dats.data[j].value);
//			}
//		}
		
		
		if(dats.data[1].value==0&&dats.data[0].value==0){
			$('.w_nvssbai').html(0);
			$('.w_nanssbai').html(0);
		}else {		
			$('.w_nvssbai').html((dats.data[1].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%')
			$('.w_nanssbai').html((dats.data[0].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%')
		}
		myChart1.setOption(w_option1);
	}
	myChart1.hideLoading();
}
myChart1.setOption(w_option1);
}

//党员民族
//leibie();
function leibie(ids){
	var myChart2 = echarts.init(document.getElementById('w_leibie'));
var w_option02 = {
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
    legend: {
        bottom: 70,
        left: 'center',
        padding: 10,
        itemGap: 20,
        itemWidth: 30,
        itemHeight: 20,
        data: ['少数民族', '汉族'],
        textStyle: {
            fontSize: 25,
        }
    },
    calculable : true,
    series : [
        {	
        	color:['#4a90e2','#88d263'],
            name:'党员民族',
            type:'pie',
            radius : ['55%', '65%'],            
            data:[
                {value:0, name:'汉族'},
                {value:0, name:'少数民族'},
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
if(ids==1){
	ajaxGet('GXZJ_ZC_DYMZ',function(data){
		var dats=data
		datts(dats)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_DYMZ',function(data){
		var dats=data
		datts(dats)
	});
}else if(ids==3){
	ajaxGet('GXZJ_DYMZ',function(data){
		var dats=data
		datts(dats)
	});
}

function datts(dats){

	if(dats.data.length>0){
//		console.log(dats);
		var njkk={};
		var kkcn=[];
		for(var i=0;i<dats.data.length;i++){
			njkk={}
			njkk.name=dats.data[i].key;
			njkk.value=dats.data[i].value;
			kkcn.push(njkk);
		}
		w_option02.series[0].data=kkcn;
		myChart2.setOption(w_option02);
	
		$('.w_shaoss').html(dats.data[0].key=='少数民族' ? dats.data[0].value : dats.data[1].value);
		$('.w_hanss').html(dats.data[0].key=='汉族' ? dats.data[0].value : dats.data[1].value);
		
//		$('.w_shaoss').html(dats.data[0].value);
		
//		$('.w_hanss').html(dats.data[1].value);
		if(dats.data[1].value==0&&dats.data[0].value==0){
			$('.w_shaossbai').html(0);
			$('.w_hanssbai').html(0);
		}else{
			
		
		$('.w_shaossbai').html((dats.data[1].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%')
		$('.w_hanssbai').html((dats.data[0].value/(parseInt(dats.data[1].value)+parseInt(dats.data[0].value))*100).toFixed(2)+'%')
		}
	}
		myChart2.hideLoading();
}
myChart2.setOption(w_option02);
}


// 支部类型
//guanxizhuanjie()
function guanxizhuanjie(ids){
	var myChart4s = echarts.init(document.getElementById('w_guanxizhuanjie'));
var w_option4 = {
    title: {
        text: '支部类型',
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
                color: 'none', //不显示线条
            },
        }
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
	        		rotate: 20
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
            data: [0, 0, 0, 0, 0, 0, 0],
            barWidth:20,
            barMinHeight:10,
        }
    ]
};
myChart4s.hideLoading();
if(ids==1){
	ajaxGet('GXZJ_ZC_ZBLX',function(data){
		var dats=data
		dss(dats)
	})
}else if(ids==2){
	ajaxGet('GXZJ_ZR_ZBLX',function(data){
		var dats=data
		dss(dats)
	})
}else if(ids==3){
	ajaxGet('GXZJ_ZBLX',function(data){
		var dats=data
		dss(dats)
	})
}
function dss(dats){
	if(dats.data.length>0){
		var daya=[];
		var ddna=[];
		for(var i=0;i<dats.data.length;i++){
			daya.push(dats.data[i].value);
			ddna.push(dats.data[i].key)

		}

		w_option4.series[0].data=daya;
		w_option4.yAxis[0].data=ddna;
		myChart4s.setOption(w_option4);
	};
	myChart4s.hideLoading();
}
w_option4.series[0].itemStyle={
	normal: {
		barBorderRadius:10,
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


myChart4s.setOption(w_option4);

}


//党员年龄
//nianling();
function nianling(ids){
	var myChart3aa = echarts.init(document.getElementById('w_nianling'));
var w_option003 = {
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
            name:'人数',
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
myChart3aa.hideLoading();
if(ids==1){
	ajaxGet('GXZJ_ZC_DYNL',function(data){
		var dats=data
		dee(dats)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_DYNL',function(data){
		var dats=data
		dee(dats)
	});
}else if(ids==3){
	ajaxGet('GXZJ_DYNL',function(data){
		var dats=data
		dee(dats)
	});
}
//ajaxGet('GXZJ_ZC_DYNL');
function dee(dats){
	if(dats.data.length>0){
		var data=[];
		var ddname=[];
		
		for(var i=0; i<dats.data.length;i++){
			data.push(dats.data[i].value);
			ddname.push(dats.data[i].key);
		}
		w_option003.series[0].data=data;
		w_option003.xAxis.data=ddname;
		myChart3aa.setOption(w_option003);
	}
	myChart3aa.hideLoading();
}
myChart3aa.setOption(w_option003);
}



// 关系转接迁徙模拟图
//gangweide()
function gangweide(ids){
	var myChart4q = echarts.init(document.getElementById('w_gangweide'));
var optionssd = {
    title: {
        text: '关系转接迁徙模拟图',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip: {
//  	formatter: '{b}：{c}'

//formatter:function(params){//悬浮提示框显示的内容
//              if (params.data.isnode) {return params.data.name+":"+params.data.value;}
//          }
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
        normal: {
            show: true,
            textStyle: {
                fontSize: 12
            },
        }
    },
    series: [

        {
            type: 'graph',
            layout: 'force',
            symbolSize: 45,
            focusNodeAdjacency: false,
            //roam: true,
            force:{
                    edgeLength :[500,10000],  //值最大的边长度会趋向于 10，值最小的边长度会趋向于 50
                    
                },
            draggable : false,
            categories: [
//          {
//              name: '朋友',
//              itemStyle: {
//                  normal: {
//                      color: "#009800",
//                  }
//              }
//          }, {
//              name: '战友',
//              itemStyle: {
//                  normal: {
//                      color: "#4592FF",
//                  }
//              }
//          }, {
//              name: '亲戚',
//              itemStyle: {
//                  normal: {
//                      color: "#3592F",
//                  }
//              }
//          }
            ],
            label: {
                normal: {
                    show: true,
                    formatter: function( data ) {
                            return  data.name;
                        },
                    textStyle: {
                        fontSize: 12
                    },
                }
            },
            force: {
                repulsion: 1000
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 10
                    },
                    formatter: ""
                }
            },
            data: [
//          {
//                      name:'济南',
//                      x: 360,
//                      y :100,
////                      value:data2[1],
//                      isnode:true,
//                      value:30,
//                      symbolSize:50, //决定圆的大小
//						category: 1,
//		                draggable: true,
//		                itemStyle:{
//		                	normal:{
//		                		color:'red',
//		                	},
//		                },
//          }
//          ,{
//              name: '枣庄',
//              value:20,
//                      x: 700,
//                      y :100,
//              symbolSize:100,
//              isnode:true,
//              value:50,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              label:{
//                          fontSize:'20',
//                      },
//              category: 1,
//              draggable: true,
//          }, {
//              name: '青岛',
//                                      x: 320,
//                      y :300,
//                      isnode:true,
//                      value:30,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: false,
//          }, {
//              name: '烟台',
//                                      x: 400,
//                      y :300,
//                      isnode:true,
//                      value:30,
//                      value:100,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: true,
//          }, {
//              name: '滨州',
//                                      x: 360,
//                      y :300,
//                      isnode:true,
//                      value:30,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: true,
//          },
//          {
//              name: '威海',
//                                      x: 360,
//                      y :400,
//                      isnode:true,
//                      value:30,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: true,
//          },{
//              name: '济南1',
//                      x: 360,
//                      y :300,
//                      
//                      isnode:true,
//                      value:30,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: true,
//          },
//          {
//              name: '青岛1',
//                      x: 360,
//                      y :400,
//                      isnode:true,
//                      value:30,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: true,
//          },{
//              name: '济南2',
//                      x: 360,
//                      y :300,
//                      isnode:true,
//                      value:30,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: true,
//          },
//          {
//              name: '青岛2',
//                                      x: 360,
//                      y :400,
//                      isnode:true,
//                      value:30,
//              itemStyle:{
//              	normal:{
//              		color:'red',
//              	},
//              },
//              category: 1,
//              draggable: true,
//          }
            ],
            links: [
//          {
//              source: '枣庄',
//              target: '济南',
//
//          }, {
//              source: '枣庄',
//              target: '青岛',
//          }, {
//              source: '枣庄',
//              target: '烟台',
//          }, {
//              source: '枣庄',
//              target: '滨州',
//          }, 
//          {
//              source: '枣庄',
//              target: '威海',
//
//          }, {
//              source: '枣庄',
//              target: '济南1',
//
//          }, {
//              source: '枣庄',
//              target: '青岛1',
//          }, {
//              source: '枣庄',
//              target: '济南2',
//
//          }, {
//              source: '枣庄',
//              target: '青岛2',
//          },

            ],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1,
                    curveness: 0,
                    show:false,
                    type:'dashed'
                }
            },
            force :{
                    repulsion:[300,660],
                    edgeLength: [10, 200],
                    gravity:0.1
            },
            animation:true,
                markArea:{
                    animation:false,
                },
                markPoint:{
                    symbol:'arrow',
                },
                markLine:{
                    symbol :'arrow',
                    precision:5
                },
           
         
        }
    ]
};
myChart4q.hideLoading();
if(ids==1){
	
	ajaxGet('GXZJ_ZC_QX',function(data){
//		console.log(dats)
		eerr(data)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_QX',function(data){
		eerr(data)
	});
}else if(ids==3){
	ajaxGet('GXZJ_QX',function(data){
//		console.log(data)
		eerr(data)
	});
}
//ajaxGet('GXZJ_ZC_QX');
//console.log(dats)
function eerr(data){
//	console.log(dats);
//	var dats;
	if(data.data.length>0){
		var ddtts=[];
		var ssjson={};
		var ssdddddjson={};
		var arrssddddd=[];
		
		var defg='中国共产党\n枣庄市委员会'
		if(sessionStorage.getItem('orgName')){

			defg=sessionStorage.getItem('orgName');
			var zuishao=5
			if(defg.length>zuishao){
				var jige=Math.ceil(defg.length/zuishao);
				var arr = [];
				
					for(let i = 0; i< defg.length;) {
						arr.push(defg.substr(i, zuishao));
						i += zuishao;
					}

					defg='';
					for(var i=0;i<arr.length;i++){
						defg+=arr[i]+'\n'
					}

			}
			
			
		}
		
				ssjson.name= defg;
				ssjson.draggable=false;
				ssjson.symbolSize=120; //决定圆的大小
				ssjson.category=1;
				ssjson.draggable=true;
				                	
				ssdddddjson.source=0;
				ssdddddjson.target=0;
				ddtts.unshift(ssjson);
				arrssddddd.push(ssdddddjson);
				
		for(var i=0;i<data.data.length;i++){
//			console.log(dats)
			ssjson={};
			ssdddddjson={};
//			if(data.data[i].key=='枣庄'){
//				ssjson.name=data.data[i].key;
//				ssjson.draggable=false;
//				ssjson.symbolSize=80; //决定圆的大小
//				ssjson.category=1;
//				ssjson.draggable=true;
//				                	
//				ssdddddjson.source=0;
//				ssdddddjson.target=i;
//				ddtts.unshift(ssjson);
//				arrssddddd.push(ssdddddjson);
//			}else{
	
				ssjson.name=data.data[i].key;
				ssjson.category=1
				ssjson.draggable=true;
				ssjson.value=data.data[i].value;
				ssjson.isnode=true;
				ssdddddjson.source=0;
//				ssdddddjson.value=data.data[i].value;
				
				ssdddddjson.target=i+1;
				ddtts.push(ssjson);
			arrssddddd.push(ssdddddjson);
//			}	
		}
		
		

	optionssd.series[0].data=ddtts;
	optionssd.series[0].links=arrssddddd; 
//	optionssd.tooltip.formatter=function(params){//悬浮提示框显示的内容
//              if (params.data.isnode) {return params.data.name+":"+params.data.value;}
//              else {return params.data.source+"--"+params.data.target;}
//         }
	}	
	myChart4q.hideLoading();
	myChart4q.setOption(optionssd);
}
}


// 党员学历
//xueli();

function xueli(ids){
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
        trigger: 'axis'
    },
    calculable : true,
    radar : {
            indicator : [
                {text : '研究生', max  : 30},
                {text : '本科生', max  : 30},
                {text : '中等职业学校', max  : 30},
                {text : '高中', max  : 30},
                {text : '初中', max  : 30},
                {text : '小学', max  : 30},
                {text : '其他', max  : 30},
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
if(ids==1){
	ajaxGet('GXZJ_ZC_DYXL',function(data){
		var dats=data;
		wwe(dats)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_DYXL',function(data){
		var dats=data;
		wwe(dats)
	});
}else if(ids==3){
	ajaxGet('GXZJ_DYXL',function(data){
		var dats=data;
		wwe(dats)
	});
}
//ajaxGet('GXZJ_ZC_DYXL');
function wwe(dats){
	if(dats.data.length>0){
		var ww=[];
		var eena=[];
		for(var i=0;i<dats.data.length;i++){
			ww.push(dats.data[i].value);
			var wwjson={};
			wwjson.text=dats.data[i].key;
			wwjson.max=dats.data[i].allNum;
//			sll+=parseInt(dats.data[i].value);
			eena.push(wwjson);
		}
//		alert(sll);
		w_option5.series[0].data[0].value=ww;
		w_option5.radar.indicator=eena;
		myChart5.hideLoading();
		myChart5.setOption(w_option5);
	}
}
myChart5.setOption(w_option5);
}

//关系转接类别比例
//leibiebili()
function leibiebili(ids){
var myChart4vv = echarts.init(document.getElementById('w_bili'));
var optionjjxx= {
	title: {
        text: '关系转接类别比例',
        x:'20px',
        textStyle: {
            fontSize: 25,
            fontWeight:'bolder',
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",

    },
//  legend: {
//      
//      orient: 'vertical',
//      x: 'right',
//     itemWidth: 14,
//      itemHeight: 14,
//      align: 'left',
//  
//      //data:['2D线','3D线','资源类','采集类','宝宝大全','2D视频','3D视频'],
//      textStyle: {
//          color: '#fff'
//      }
//  },
    series: [
       
        {
            name:'',
            type:'pie',
            radius: ['46%', '55%'],
            color: [ '#0079c1','#d0021b','#417505','#5ddaf5','#88d263', '#4a90e2', '#ffb313','#f23c48', '#b841d1', '#9013fe','#143b75', '#3fd1b0', '#f8e71c'],
            label: {
                normal: {
                    formatter: '{b}\n{d}%'
                },
          
            },           
            data:[
                {value:0, name:'军队'},
                {value:0, name:'武警部队'},
                {value:0, name:'国(境)外'},
                {value:0, name:'省内其他市'},
                {value:0, name:'省委直属其它党组织'},
                {value:0, name:'市内其它县(市/区)'},
                {value:0, name:'市委直属其它党组织'},
                {value:0, name:'县(市/区)内其它乡镇(街道)'},
                {value:0, name:'县(市/区)委直属其它党组织'},
                {value:0, name:'本系统内其它党组织'},
                {value:0, name:'乡镇(街道)直属其它党组织'},
                 {value:0, name:'省外(市/区)'},
            ]
        }
    ]
};
myChart4vv.hideLoading();
if(ids==1){
	ajaxGet('GXZJ_ZC_LX',function(data){
		var dats=data
		dfff(dats)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_LX',function(data){
		var dats=data
		dfff(dats)
	});
}else if(ids==3){
	ajaxGet('GXZJ_LX',function(data){
		var dats=data
		dfff(dats)
	});
}
//ajaxGet('GXZJ_ZC_LX');
function dfff(dats){
	if(dats.data.length>0){
		var jj={};
		var qqjj=[];
		var qqname=[];
		for(var i=0; i<dats.data.length;i++){
			jj={};
			jj.value=dats.data[i].value;
			jj.name=dats.data[i].key;
			qqjj.push(jj);
			qqname.push(dats.data[i].key);
		}
		optionjjxx.series[0].data=qqjj;
		
		myChart4vv.setOption(optionjjxx);
	//option.legend.data=qqjj;
	}
	myChart4vv.hideLoading();
}
myChart4vv.setOption(optionjjxx);
}

// 党员党龄
//dangling()
function dangling(ids){
var myChart3 = echarts.init(document.getElementById('w_dangling'));
var w_optionxx3 = {
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
            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
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
if(ids==1){
	ajaxGet('GXZJ_ZC_DYDL',function(data){
		var dats=data
		rdd(dats)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_DYDL',function(data){
		var dats=data
		rdd(dats)
	});
}else if(ids==3){
	ajaxGet('GXZJ_DYDL',function(data){
		var dats=data
		rdd(dats)
	});
}

function rdd(dats){
	if(dats.data.length>0){
		var datt=[];
		var nname=[];
		for(var i=0;i<dats.data.length;i++){
			datt.push(dats.data[i].value);
			nname.push(dats.data[i].key)
		}
	w_optionxx3.series[0].data=datt;
	w_optionxx3.xAxis.data=nname;
	myChart3.setOption(w_optionxx3);
	}
	myChart3.hideLoading();
}
myChart3.setOption(w_optionxx3);
}

//下属党组织党员关系转接人次
//dangyuannum()
function dangyuannum(ids){
	var myChart = echarts.init(document.getElementById('w_dangyuanNum'));

var w_option = {

    title:{
        text: '下属党组织党员关系转接人次',
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
            //data :  ['滕州市委','薛城区委','山亭区委' ,'市中区委', '峰城区委', '台儿庄区委', '市直机关工委', '市委党校', '日报社委', '经信委', '教委', '中共枣庄学院委员会','中共枣庄职业学院院委员会','中共枣庄市商务局委员会','中共枣庄市司法局委员会','中共枣庄市人力资源和社会保障局委员会','中共枣庄市住房和城市建设局委员会','中共枣庄市煤炭工业局委员会','中共枣庄市农业局委员会','中共枣庄市水利和渔业局委员会','中共鲁南中联水泥有限公司委员会','中共枣庄银行股份有限公司委员会','中共枣庄市供销合作社联合社委员会'],
        	data :  ['滕州市委','薛城区委','山亭区委' ,'市中区委', '峰城区委', '台儿庄区委', '市直机关工委', '市委党校', '日报社委', '经信委'],
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
				    var provideNumber = 2;// 每行能显示的字的个数
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
            name:'转接人次',
            type:'bar',
              data:[0, 0,0, 0, 0, 0, 0, 0, 0,0,0,0,0, 0,0,0,0, 0, 0, 0, 0, 0, 0],
        	barWidth:30,
        	barGap:20,
        	barMinHeight: 10,  // 最小高度改为350  设置默认
        },
        
    ]
};
myChart.hideLoading();
if(ids==1){
	ajaxGet('GXZJ_ZC_XSDZZDYZJRC',function(data){
		var dats=data
		rknn(dats)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_XSDZZDYZJRC',function(data){
		var dats=data
		rknn(dats)
	});
}else if(ids==3){
	ajaxGet('GXZJ_XSDZZDYZJRC',function(data){
		var dats=data
		rknn(dats)
	});
}
//ajaxGet('GXZJ_ZC_XSDZZDYZJRC');
function rknn(dats){
	if(dats.data.length>0){
		var ttt=[];
		var ssjjs=[]
		for(var i=0;i<dats.data.length;i++){
			ttt.push(dats.data[i].value);
			ssjjs.push(dats.data[i].bz)
		}		
		w_option.series[0].data=ttt;
		w_option.xAxis[0].data=ssjjs;
		myChart.setOption(w_option);
	}
	myChart.hideLoading();
}
w_option.series[0].itemStyle={
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
myChart.setOption(w_option);
}


// 党员岗位
//dangyuanGangwei()
function dangyuanGangwei(ids){
	var myChart4 = echarts.init(document.getElementById('w_dangyuanGangwei'));
var w_optionzz4 = {
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
                color: 'none', //不显示线条
            },
        }
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
            data: [0, 0, 0, 0, 0, 0, 0],
            barWidth:30,
            barMinHeight: 10, 
        },
        
    ]
};
myChart4.hideLoading();
if(ids==1){
	ajaxGet('GXZJ_ZC_DYGW',function(data){
		var dats=data
		dggg(data)
	});
}else if(ids==2){
	ajaxGet('GXZJ_ZR_DYGW',function(data){
		var dats=data
		dggg(data)
	});
}else if(ids==3){
	ajaxGet('GXZJ_DYGW',function(data){
		var dats=data
		dggg(data)
	});
}
//ajaxGet('GXZJ_ZC_DYGW');
function dggg(dats){
	if(dats.data.length>0){
		//	$('.w_mengban').hide();
		var tss=[];
		var jjgh=[];
		for(var i=0;i<dats.data.length;i++){
			tss.push(dats.data[i].value);
			jjgh.push(dats.data[i].key);
		}
		w_optionzz4.series[0].data=tss;
		w_optionzz4.yAxis[0].data=jjgh;
		myChart4.setOption(w_optionzz4);
	}
	myChart4.hideLoading();
}
w_optionzz4.series[0].itemStyle={
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
myChart4.setOption(w_optionzz4);

}

// 关系转接业务办理时间段分布
w_shijianduan()
function w_shijianduan(){
var myChart3gg = echarts.init(document.getElementById('w_shijianduan'));
var w_option3 = {
    title: {
        text: '关系转接业务办理时间段分布',
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
        backgroundColor: '#f23c48',  //鼠标画上 背景色
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
        data: ['9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17'],
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
            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
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
myChart3gg.hideLoading();
ajaxGet('GXZJ_YWBLSJ',function(data){	
	vdf(data)
});
function vdf(dats){
	if(dats.data.length>0){
		var tsdd=[];
		var sjnj=[];
		for(var i=0;i<dats.data.length;i++){
			tsdd.push(dats.data[i].value);
			sjnj.push(dats.data[i].key)
		}
		w_option3.series[0].data=tsdd;
		w_option3.xAxis.data=sjnj;
		myChart3gg.setOption(w_option3);
	}
	myChart3gg.hideLoading();
}
myChart3gg.setOption(w_option3);
}
