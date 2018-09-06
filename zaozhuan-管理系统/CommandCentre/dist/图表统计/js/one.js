$(function(){
    $('#return').click(function(){
        window.location.href = "8.html"
    });
    chart01 = sessionStorage.getItem('chart01')
    chart02 = sessionStorage.getItem('chart02')
    chart03 = sessionStorage.getItem('chart03')
    chart04 = sessionStorage.getItem('chart04')
    chart05 = sessionStorage.getItem('chart05')
    chart06 = sessionStorage.getItem('chart06')
    chart07 = sessionStorage.getItem('chart07')
    if(chart01==1){
        $('.nav ul li').eq(0).addClass('active');
        $('.chart').eq(0).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart01"); 
         }
        if(chart02==2){
        $('.nav ul li').eq(1).addClass('active');
        $('.chart').eq(1).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart02"); 
         }
        if(chart03==3){
        $('.nav ul li').eq(2).addClass('active');
        $('.chart').eq(2).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart03"); 
            }
    if(chart04==4){
        $('.nav ul li').eq(3).addClass('active');
        $('.chart').eq(3).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart04"); 
    }
    if(chart05==5){
        $('.nav ul li').eq(4).addClass('active');
        $('.chart').eq(4).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart05"); 
    }
    if(chart06==6){
        $('.nav ul li').eq(5).addClass('active');
        $('.chart').eq(5).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart06"); 
    }
    if(chart07==7){
        $('.nav ul li').eq(6).addClass('active');
        $('.chart').eq(6).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart07"); 
    }
    
    $('.nav ul li').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    var sum=$(this).index();
    $('.chart').eq(sum).stop(true,true).show().siblings('.chart').hide()
    })

function echart(){
    var chart = echarts.init(document.getElementById('echart'));
    option = {
        title: {
            text: '第一书记总人数',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 32,
                color: '#f23c48',
                fontWeight:'bolder',
                fontFamily:'黑体'
            },
            left: '4.5%',
            top:'4%',
        },
        name: 'a',
        tooltip: {
            trigger: 'axis', //按x轴显示
            show: true,
            axisPointer: {
                lineStyle: {
                    color: 'none', //不显示线条
                },
            },
            
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            textStyle: {
                align: 'left',
                fontSize: 28,
                color: '#333333',
            },
            extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
        },
        color: ['#3FD1B0', '#88D263', '#BD10E0', '#FFB313', '#F35E61', '#9013FE'],
        grid: {
            left: '5%',
            right: '6%',
            top: '14%',
            bottom: '6%',
            containLabel: true
        },
        legend: {
            show: true,
            icon: 'bar',
            right: 20,
            top:180,
            itemWidth:50,
            itemHeight:20,
            textStyle: {
                fontSize: 26,
                color: '#333333',
                width:40,
            },
            data: ['第一书记总人数']
        },
        xAxis: {
            show: true,
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#eeeeee',
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 24,
                    color: '#999999'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
            show: true,
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#f2f3f7'
                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 24,
                    color: '#999999'
                }
            }
        },
        series: [{
            name: '第一书记总人数',
            type: 'line',
            symbol: 'circle',
            itemStyle: {
                emphasis: {
                    symbol: 'circle',
                },
               
            },
            lineStyle:{
                normal:{
                    width:8
                },
            },
            symbolSize: [8, 8],
            data: [10, 13, 11, 14, 10, 28,10, 13, 11, 14, 10, 28]
        }]
    };
    chart.setOption(option);
  };
  echart()
//本月应缴/已缴/未缴党费党员数量比例
$(function(){
    function echart1(){
        var chart = echarts.init(document.getElementById('echart1'));
        option = {
            title: {
                text: '性别比例',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 32,
                    color: '#f23c48',
                    fontWeight:'bolder',
                    fontFamily:'黑体'
                },
                left: '4.5%',
                top:'4%',
            },
            name: 'a',
            tooltip: {
                trigger: 'axis', //按x轴显示
                show: true,
                axisPointer: {
                    lineStyle: {
                        color: 'none', //不显示线条
                    },
                },
                
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                textStyle: {
                    align: 'left',
                    fontSize: 28,
                    color: '#333333',
                },
                extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
            },
            color: ['#3FD1B0', '#88D263', '#BD10E0', '#FFB313', '#F35E61', '#9013FE'],
            grid: {
                left: '5%',
                right: '6%',
                top: '14%',
                bottom: '6%',
                containLabel: true
            },
            legend: {
                show: true,
                icon: 'bar',
                right: 20,
                top:180,
                itemWidth:50,
                itemHeight:20,
                textStyle: {
                    fontSize: 26,
                    color: '#333333',
                    width:40,
                },
                data: ['男', '女']
            },
            xAxis: {
                show: true,
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#eeeeee',
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 24,
                        color: '#999999'
                    }
                },
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            yAxis: {
                show: true,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f2f3f7'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 24,
                        color: '#999999'
                    }
                }
            },
            series: [{
                name: '男',
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                    emphasis: {
                        symbol: 'circle',
                    },
                   
                },
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbolSize: [8, 8],
                data: [10, 13, 11, 14, 10, 28,10, 13, 11, 14, 10, 28]
            }, {
                name: '女',
                type: 'line',
                symbol: 'circle',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbolSize: [8, 8],
                data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
            }]
        };
        chart.setOption(option);
      };
      echart1()
      
    });
    //发展党员性别
$(function(){
    function echart2(){
        var chart = echarts.init(document.getElementById('echart2'));
        option = {
            title: {
                text: '民族比例',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 32,
                    color: '#f23c48',
                    fontWeight:'bolder',
                    fontFamily:'黑体'
                },
                left: '4.5%',
                top:'4%',
            },
            name: 'a',
            tooltip: {
                trigger: 'axis', //按x轴显示
                show: true,
                axisPointer: {
                    lineStyle: {
                        color: 'none', //不显示线条
                    },
                },
                
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                textStyle: {
                    align: 'left',
                    fontSize: 28,
                    color: '#333333',
                },
                extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
            },
            color: ['#3FD1B0', '#88D263', '#BD10E0', '#FFB313', '#F35E61', '#9013FE'],
            grid: {
                left: '5%',
                right: '6%',
                top: '14%',
                bottom: '6%',
                containLabel: true
            },
            legend: {
                show: true,
                icon: 'bar',
                right: 20,
                top:180,
                itemWidth:50,
                itemHeight:20,
                textStyle: {
                    fontSize: 26,
                    color: '#333333',
                    width:40,
                },
                data: ['汉族', '少数民族']
            },
            xAxis: {
                show: true,
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#eeeeee',
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 24,
                        color: '#999999'
                    }
                },
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            yAxis: {
                show: true,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f2f3f7'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 24,
                        color: '#999999'
                    }
                }
            },
            series: [{
                name: '汉族',
                type: 'line',
                symbol: 'circle',
                itemStyle: {
                    emphasis: {
                        symbol: 'circle',
                    },
                   
                },
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbolSize: [8, 8],
                data: [10, 13, 11, 14, 10, 28,10, 13, 11, 14, 10, 28]
            }, {
                name: '少数民族',
                type: 'line',
                symbol: 'circle',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbolSize: [8, 8],
                data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
            }]
        };
        chart.setOption(option);
      };
      echart2()
      
    });
    //栏目文章数
    $(function(){
        function echart3(){
            var chart = echarts.init(document.getElementById('echart3'));
            option = {
                title: {
                    text: '民族测评',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 32,
                        color: '#f23c48',
                        fontWeight:'bolder',
                        fontFamily:'黑体'
                    },
                    left: '4.5%',
                    top:'4%',
                },
                name: 'a',
                tooltip: {
                    trigger: 'axis', //按x轴显示
                    show: true,
                    axisPointer: {
                        lineStyle: {
                            color: 'none', //不显示线条
                        },
                    },
                    
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    textStyle: {
                        align: 'left',
                        fontSize: 28,
                        color: '#333333',
                    },
                    extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
                },
                color: ['#3FD1B0', '#88D263', '#BD10E0', '#FFB313', '#F35E61', '#9013FE'],
                grid: {
                    left: '5%',
                    right: '6%',
                    top: '14%',
                    bottom: '6%',
                    containLabel: true
                },
                legend: {
                    show: true,
                    icon: 'bar',
                    right: 20,
                    top:180,
                    itemWidth:50,
                    itemHeight:20,
                    textStyle: {
                        fontSize: 26,
                        color: '#333333',
                        width:40,
                    },
                    data: ['优秀','称职','不称职']
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#eeeeee',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 24,
                            color: '#999999'
                        }
                    },
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                },
                yAxis: {
                    show: true,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#f2f3f7'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 24,
                            color: '#999999'
                        }
                    }
                },
                series: [{
                    name: '优秀',
                    type: 'line',
                    symbol: 'circle',
                    itemStyle: {
                        emphasis: {
                            symbol: 'circle',
                        },
                       
                    },
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    symbolSize: [8, 8],
                    data: [10, 13, 11, 14, 10, 28,10, 13, 11, 14, 10, 28]
                }, {
                    name: '称职',
                    type: 'line',
                    symbol: 'circle',
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    symbolSize: [8, 8],
                    data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                }, {
                    name: '不称职',
                    type: 'line',
                    symbol: 'circle',
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    symbolSize: [8, 8],
                    data: [41, 42, 43, 40, 45, 63,41, 42, 43, 40, 45, 63]
                }]
            };
            chart.setOption(option);
          };
          echart3()
          
        });
        //下属党组织党员党费缴纳情况
        $(function(){
            function echart4(){
                var chart = echarts.init(document.getElementById('echart4'));
                option = {
                    title: {
                        text: '第一书记年龄',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 32,
                            color: '#f23c48',
                            fontWeight:'bolder',
                            fontFamily:'黑体'
                        },
                        left: '4.5%',
                        top:'4%',
                    },
                    name: 'a',
                    tooltip: {
                        trigger: 'axis', //按x轴显示
                        show: true,
                        axisPointer: {
                            lineStyle: {
                                color: 'none', //不显示线条
                            },
                        },
                        
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        textStyle: {
                            align: 'left',
                            fontSize: 28,
                            color: '#333333',
                        },
                        extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
                    },
                    color: ['#3FD1B0', '#88D263', '#BD10E0', '#FFB313', '#F35E61', '#9013FE'],
                    grid: {
                        left: '5%',
                        right: '6%',
                        top: '14%',
                        bottom: '6%',
                        containLabel: true
                    },
                    legend: {
                        show: true,
                        icon: 'bar',
                        right: 20,
                        top:180,
                        itemWidth:50,
                        itemHeight:20,
                        textStyle: {
                            fontSize: 26,
                            color: '#333333',
                            width:40,
                        },
                        data: ['20岁以下', '21-25岁', '26-30岁','31-35岁','36-40岁','41-45岁','46-50岁','51-55岁','56-60岁','60岁以上']
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#eeeeee',
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 24,
                                color: '#999999'
                            }
                        },
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#f2f3f7'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 24,
                                color: '#999999'
                            }
                        }
                    },
                    series: [{
                        name: '20岁以下',
                        type: 'line',
                        symbol: 'circle',
                        itemStyle: {
                            emphasis: {
                                symbol: 'circle',
                            },
                           
                        },
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [10, 13, 11, 14, 10, 28,10, 13, 11, 14, 10, 28]
                    }, {
                        name: '21-25岁',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                    }, {
                        name: '26-30岁',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [41, 42, 43, 40, 45, 63,41, 42, 43, 40, 45, 63]
                    },{
                        name: '31-35岁',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [51, 60, 41, 45, 20, 58,51, 60, 41, 45, 20, 58]
                    }, {
                        name: '36-40岁',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [52, 41, 43, 55, 45, 61,52, 41, 43, 55, 45, 61]
                    }, {
                        name: '41-45岁',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [41, 45, 49, 30, 55, 36,41, 45, 49, 30, 55, 36]
                    },{
                        name: '46-50岁',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        type: 'line',
                        symbol: 'circle',
            
                        symbolSize: [8, 8],
                        data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
                    }
                    ,{
                        name: '51-55岁',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        type: 'line',
                        symbol: 'circle',
            
                        symbolSize: [8, 8],
                        data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
                    },{
                        name: '56-60岁',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        type: 'line',
                        symbol: 'circle',
            
                        symbolSize: [8, 8],
                        data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
                    },{
                        name: '60岁以上',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        type: 'line',
                        symbol: 'circle',
            
                        symbolSize: [8, 8],
                        data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
                    }]
                };
                chart.setOption(option);
              };
              echart4()
            });
  
            function echart5(){
                var chart = echarts.init(document.getElementById('echart5'));
                option = {
                    title: {
                        text: '党员学历',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 32,
                            color: '#f23c48',
                            fontWeight:'bolder',
                            fontFamily:'黑体'
                        },
                        left: '4.5%',
                        top:'4%',
                    },
                    name: 'a',
                    tooltip: {
                        trigger: 'axis', //按x轴显示
                        show: true,
                        axisPointer: {
                            lineStyle: {
                                color: 'none', //不显示线条
                            },
                        },
                        
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        textStyle: {
                            align: 'left',
                            fontSize: 28,
                            color: '#333333',
                        },
                        extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
                    },
                    color: ['#3FD1B0', '#88D263', '#BD10E0', '#FFB313', '#F35E61', '#9013FE'],
                    grid: {
                        left: '5%',
                        right: '6%',
                        top: '14%',
                        bottom: '6%',
                        containLabel: true
                    },
                    legend: {
                        show: true,
                        icon: 'bar',
                        right: 20,
                        top:180,
                        itemWidth:50,
                        itemHeight:20,
                        textStyle: {
                            fontSize: 26,
                            color: '#333333',
                            width:40,
                        },
                        data: ['研究生', '本专科', '中等职业学校','普通高中','初中','小学','其他']
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#eeeeee',
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 24,
                                color: '#999999'
                            }
                        },
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#f2f3f7'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 24,
                                color: '#999999'
                            }
                        }
                    },
                    series: [{
                        name: '研究生',
                        type: 'line',
                        symbol: 'circle',
                        itemStyle: {
                            emphasis: {
                                symbol: 'circle',
                            },
                           
                        },
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [10, 13, 11, 14, 10, 28,10, 13, 11, 14, 10, 28]
                    }, {
                        name: '本专科',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                    }, {
                        name: '中等职业学校',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [41, 42, 43, 40, 45, 63,41, 42, 43, 40, 45, 63]
                    },{
                        name: '普通高中',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [51, 60, 41, 45, 20, 58,51, 60, 41, 45, 20, 58]
                    }, {
                        name: '初中',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [52, 41, 43, 55, 45, 61,52, 41, 43, 55, 45, 61]
                    }, {
                        name: '小学',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [41, 45, 49, 30, 55, 36,41, 45, 49, 30, 55, 36]
                    },{
                        name: '其他',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        type: 'line',
                        symbol: 'circle',
            
                        symbolSize: [8, 8],
                        data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
                    }]
                };
                chart.setOption(option);
              };
              echart5()

//下属党组织发布文章数量以及比例
$(function(){
    function echart6(){
        var chart = echarts.init(document.getElementById('echart6'));
        option = {
            title: {
                text: '第一书记党龄',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 32,
                    color: '#f23c48',
                    fontWeight:'bolder',
                    fontFamily:'黑体'
                },
                left: '4.5%',
                top:'4%',
            },
            name: 'a',
            tooltip: {
                trigger: 'axis', //按x轴显示
                show: true,
                axisPointer: {
                    lineStyle: {
                        color: 'none', //不显示线条
                    },
                },
                
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                textStyle: {
                    align: 'left',
                    fontSize: 28,
                    color: '#333333',
                },
                extraCssText: 'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2)' //添加阴影
            },
            color: ['#3FD1B0', '#88D263', '#BD10E0', '#FFB313', '#F35E61', '#9013FE'],
            grid: {
                left: '5%',
                right: '6%',
                top: '14%',
                bottom: '6%',
                containLabel: true
            },
            legend: {
                show: true,
                icon: 'bar',
                right: 20,
                top:180,
                itemWidth:50,
                itemHeight:20,
                textStyle: {
                    fontSize: 26,
                    color: '#333333',
                    width:40,
                },
                data: ['5年内', '6-10年', '11-15年','16-20年','21-25年','26-30年','31-35年','36-40年','36-40年','41-45年','46-50年','50年以上']
            },
            xAxis: {
                show: true,
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#eeeeee',
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 24,
                        color: '#999999'
                    }
                },
                data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            yAxis: {
                show: true,
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f2f3f7'
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 24,
                        color: '#999999'
                    }
                }
            },
            series: [{
                name: '5年以内',
                type: 'line',
                symbol: 'circle',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbolSize: [8, 8],
                data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
            }, {
                name: '6-10年',
                type: 'line',
                symbol: 'circle',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbolSize: [8, 8],
                data: [41, 42, 43, 40, 45, 63,41, 42, 43, 40, 45, 63]
            },{
                name: '11-15年',
                type: 'line',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbol: 'circle',
                symbolSize: [8, 8],
                data: [51, 60, 41, 45, 20, 58,51, 60, 41, 45, 20, 58]
            }, {
                name: '16-20年',
                type: 'line',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbol: 'circle',
                symbolSize: [8, 8],
                data: [52, 41, 43, 55, 45, 61,52, 41, 43, 55, 45, 61]
            }, {
                name: '21-25年',
                type: 'line',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbol: 'circle',
                symbolSize: [8, 8],
                data: [41, 45, 49, 30, 55, 36,41, 45, 49, 30, 55, 36]
            },{
                name: '26-30年',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                type: 'line',
                symbol: 'circle',
    
                symbolSize: [8, 8],
                data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
            }
            ,{
                name: '31-35年',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                type: 'line',
                symbol: 'circle',
    
                symbolSize: [8, 8],
                data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
            },{
                name: '36-40年',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                type: 'line',
                symbol: 'circle',
    
                symbolSize: [8, 8],
                data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
            },{
                name: '41-45年',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                type: 'line',
                symbol: 'circle',
    
                symbolSize: [8, 8],
                data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
            },{
                name: '46-50年',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                type: 'line',
                symbol: 'circle',
    
                symbolSize: [8, 8],
                data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
            },{
                name: '50年以上',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                type: 'line',
                symbol: 'circle',
    
                symbolSize: [8, 8],
                data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
            }]
            
        };
        chart.setOption(option);
      };
      echart6()
    });
    });