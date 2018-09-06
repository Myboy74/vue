$(function(){
    $('#return').click(function(){
        window.location.href = "2.html"
    });
    chart01 = sessionStorage.getItem('chart01')
    chart02 = sessionStorage.getItem('chart02')
    chart03 = sessionStorage.getItem('chart03')
    chart04 = sessionStorage.getItem('chart04')
    chart05 = sessionStorage.getItem('chart05')
    chart06 = sessionStorage.getItem('chart06')
    chart07 = sessionStorage.getItem('chart07')
    chart08 = sessionStorage.getItem('chart08')
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
    $('.nav ul li').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    var sum=$(this).index();
    $('.chart').eq(sum).stop(true,true).show().siblings('.chart').hide()
    })

function echart(){
    var chart = echarts.init(document.getElementById('echart'));
    option = {
        title: {
            text: '党组织总数',
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
            data: ['党组织数']
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
            name: '党组织数',
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
//党组织净增减
$(function(){
    function echart1(){
        var chart = echarts.init(document.getElementById('echart1'));
        option = {
            title: {
                text: '党组织净增减数量',
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
                data: ['净增', '净减']
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
                name: '净增',
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
                name: '净减',
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
    //党员净增减
$(function(){
    function echart2(){
        var chart = echarts.init(document.getElementById('echart2'));
        option = {
            title: {
                text: '党组织单位类型',
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
      echart2()
      
    });
    //软弱涣散
    $(function(){
        function echart3(){
            var chart = echarts.init(document.getElementById('echart3'));
            option = {
                title: {
                    text: '软弱涣散党支部',
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
                    data: ['软弱涣散党支部']
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
                    name: '软弱涣散党支部',
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
          echart3()
          
        });
        //党组织类型
        $(function(){
            function echart4(){
                var chart = echarts.init(document.getElementById('echart4'));
                option = {
                    title: {
                        text: '党组织类型',
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
                        data: ['乡镇街道', '企业', '事业单位','机关','社会组织','其他']
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
                        name: '乡镇街道',
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
                        name: '企业',
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
                        name: '事业单位',
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
                        name: '机关',
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
                        name: '社会组织',
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
                        name: '其他',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [41, 45, 49, 30, 55, 36,41, 45, 49, 30, 55, 36]
                    }]
                };
                chart.setOption(option);
              };
              echart4()
            });
    //党组织称号类型
    $(function(){
        function echart5(){
            var chart = echarts.init(document.getElementById('echart5'));
            option = {
                title: {
                    text: '党组织称号类型',
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
                    data: ['优秀', '过硬','合格','较差']
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
                    name: '过硬',
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
                    name: '合格',
                    type: 'line',
                    symbol: 'circle',
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    symbolSize: [8, 8],
                    data: [31, 11, 31, 34, 5, 61,21, 11, 31, 34, 24, 61]
                }, {
                    name: '较差',
                    type: 'line',
                    symbol: 'circle',
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    symbolSize: [8, 8],
                    data: [21, 31, 31, 34, 4, 61,21, 11, 31, 34, 44, 61]
                }]
            };
            chart.setOption(option);
          };
          echart5()
          
        });
//党组织成立时长
$(function(){
    function echart6(){
        var chart = echarts.init(document.getElementById('echart6'));
        option = {
            title: {
                text: '党组织成立时长',
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
                data: ['10年以内', '11-30年', '31-50年','51-70年','71-100年','100年以上']
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
                name: '10年以内',
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
                name: '11-30年',
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
                name: '31-50年',
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
                name: '51-70年',
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
                name: '71-100年',
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
                name: '100年以上',
                type: 'line',
                lineStyle:{
                    normal:{
                        width:8
                    },
                },
                symbol: 'circle',
                symbolSize: [8, 8],
                data: [41, 45, 49, 30, 55, 36,41, 45, 49, 30, 55, 36]
            }]
        };
        chart.setOption(option);
      };
      echart6()
    });
    //下属党组织组织数量
    $(function(){
        function echart7(){
            var chart = echarts.init(document.getElementById('echart7'));
            option = {
                title: {
                    text: '下属党组织数量分布',
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
          echart7()
        });
        });
