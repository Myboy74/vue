$(function(){
    $('#return').click(function(){
        window.location.href = "6.html"
    });
    chart01 = sessionStorage.getItem('chart01')
    chart02 = sessionStorage.getItem('chart02')
    chart03 = sessionStorage.getItem('chart03')
    chart04 = sessionStorage.getItem('chart04')
    chart05 = sessionStorage.getItem('chart05')
    chart06 = sessionStorage.getItem('chart06')
    chart07 = sessionStorage.getItem('chart07')
    chart08 = sessionStorage.getItem('chart08')
    chart09 = sessionStorage.getItem('chart09')
    chart10 = sessionStorage.getItem('chart10')
    chart11 = sessionStorage.getItem('chart11')
    chart12 = sessionStorage.getItem('chart12')
    chart13 = sessionStorage.getItem('chart13')
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
    if(chart08==8){
        $('.nav ul li').eq(7).addClass('active');
        $('.chart').eq(7).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart08"); 
            }
    if(chart09==9){
        $('.nav ul li').eq(8).addClass('active');
        $('.chart').eq(8).stop(true,true).show().siblings('.chart').hide()
        sessionStorage.removeItem("chart09"); 
            }
        if(chart10==10){
            $('.nav ul li').eq(9).addClass('active');
            $('.chart').eq(9).stop(true,true).show().siblings('.chart').hide()
            sessionStorage.removeItem("chart10"); 
        }
        if(chart11==11){
            $('.nav ul li').eq(10).addClass('active');
            $('.chart').eq(10).stop(true,true).show().siblings('.chart').hide()
            sessionStorage.removeItem("chart11"); 
                }
        if(chart12==12){
            $('.nav ul li').eq(11).addClass('active');
            $('.chart').eq(11).stop(true,true).show().siblings('.chart').hide()
            sessionStorage.removeItem("chart12"); 
                }
        if(chart13==13){
            $('.nav ul li').eq(12).addClass('active');
            $('.chart').eq(12).stop(true,true).show().siblings('.chart').hide()
            sessionStorage.removeItem("chart13"); 
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
            text: '本月关系转接增长比例',
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
            data: ['增长比例']
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
            name: '增长比例',
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
//党员年龄
$(function(){
    function echart1(){
        var chart = echarts.init(document.getElementById('echart1'));
        option = {
            title: {
                text: '本月关系转接人次比例',
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
                data: ['转入', '转出']
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
                name: '转入',
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
                name: '转出',
                type: 'line',
                symbol: 'circle',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbolSize: [8, 8],
                data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
            }
            ]
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
                text: '党员性别',
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
            }
            ]
        };
        chart.setOption(option);
      };
      echart2()
      
    });
    //参与形式
    $(function(){
        function echart3(){
            var chart = echarts.init(document.getElementById('echart3'));
            option = {
                title: {
                    text: '党员民族',
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
                color: ['#4A90E2', '#F35E61'],
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
                    data: ['汉族','少数民族']
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
          echart3()
          
        });
        //支部类型
        $(function(){
            function echart4(){
                var chart = echarts.init(document.getElementById('echart4'));
                option = {
                    title: {
                        text: '支部类型',
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
                        data: ['农村', '机关','高校','社区','两新','国有企业','非公']
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
                        name: '农村',
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
                        name: '机关',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                    }
                    , {
                        name: '高校',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                    }
                    , {
                        name: '社区',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                    }
                    , {
                        name: '两新',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                    }
                    , {
                        name: '国有企业',
                        type: 'line',
                        symbol: 'circle',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbolSize: [8, 8],
                        data: [21, 11, 31, 34, 54, 61,21, 11, 31, 34, 54, 61]
                    }
                    , {
                        name: '非公',
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
              echart4()
            });
    //党员民族
    $(function(){
        function echart5(){
            var chart = echarts.init(document.getElementById('echart5'));
            option = {
                title: {
                    text: '党员年龄',
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
          echart5()
          
        });
//关系转接党员学历
$(function(){
    function echart6(){
        var chart = echarts.init(document.getElementById('echart6'));
        option = {
            title: {
                text: '关系转接党员学历',
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
      echart6()
    });
    //关系转接类别比例
    $(function(){
        function echart7(){
            var chart = echarts.init(document.getElementById('echart7'));
            option = {
                title: {
                    text: '关系转接类别比例',
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
                    data: ['调往本县其他单位', '调往本市其他县', '调往本省其他市','调往外省','调往军队武警']
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
                    name: '调往本县其他单位',
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
                    name: '调往本市其他县',
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
                    name: '调往本省其他市',
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
                    name: '调往外省',
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
                    name: '调往军队武警',
                    type: 'line',
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    symbol: 'circle',
                    symbolSize: [8, 8],
                    data: [52, 41, 43, 55, 45, 61,52, 41, 43, 55, 45, 61]
                }]
            };
            chart.setOption(option);
          };
          echart7()
        });
        });
   //党员学历
   $(function(){
    function echart8(){
        var chart = echarts.init(document.getElementById('echart8'));
        option = {
            title: {
                text: '参与学习党员党龄比例',
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
      echart8()
      //下属党组织党员参与学习人次
      $(function(){
        function echart9(){
            var chart = echarts.init(document.getElementById('echart9'));
            option = {
                title: {
                    text: '下属党组织党员参与学习人次',
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
                    data: ['滕州市委', '薛城区委', '山亭区委','市中区委','峄城区委','台儿庄区委','市直机关工委','市委党校','日报社委','经信委','教委']
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
                    name: '滕州市委',
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
                    name: '薛城区委',
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
                    name: '山亭区委',
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
                    name: '市中区委',
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
                    name: '峄城区委',
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
                    name: '台儿庄区委',
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
                    name: '市直机关工委',
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
                    name: '市委党校',
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
                    name: '日报社委',
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
                    name: '经信委',
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
                    name: '教委',
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
          echart9()
          
        });

    //党员岗位
$(function(){
    function echart10(){
        var chart = echarts.init(document.getElementById('echart10'));
        option = {
            title: {
                text: '党员岗位',
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
                data: ['解放军', '离退休人员', '在岗职工','武警','学生','农牧渔民','其他人员']
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
                name: '解放军',
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
                name: '离退休人员',
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
                name: '在岗职工',
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
                name: '武警',
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
                name: '学生',
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
                name: '农牧渔民',
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
                name: '其他人员',
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
      echart10()
    });
    //关系转接业务办理时间分布
    $(function(){
        function echart11(){
            var chart = echarts.init(document.getElementById('echart11'));
            option = {
                title: {
                    text: '关系转接业务办理时间分布',
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
                    data: ['办理次数']
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
                    data: ['9-10', '10-11', '11-12','12-13','13-14','14-15','15-16','16-17']
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
                    name: '办理次数',
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
          echart11()
        });
        $(function(){
            function echart12(){
                var chart = echarts.init(document.getElementById('echart12'));
                option = {
                    title: {
                        text: '关系转接业务平均办理时长',
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
                        data: ['平均时长']
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
                        name: '解放军',
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
              echart12()
            });

           
    });