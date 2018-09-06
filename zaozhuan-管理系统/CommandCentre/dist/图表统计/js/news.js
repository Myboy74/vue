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
            text: '发布文章总数',
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
            data: ['发布文章总数']
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
            name: '发布文章总数',
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
                text: '发布文章类型',
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
                data: ['新闻类', '工作类']
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
                name: '新闻类',
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
                name: '工作类',
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
                text: '本月发布文章净增减',
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
                data: ['新增', '减少']
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
                name: '新增',
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
                name: '减少',
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
                    text: '栏目文章数',
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
                    data: ['学历教育网','党建和组织工作宣传网','层党组织建设网','党员队伍建设网','干部工作网','高校毕业生到村任职网','第一书记服务网','政策法规库']
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
                    name: '学历教育网',
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
                    name: '党建和组织工作宣传网',
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
                    name: '层党组织建设网',
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
                    name: '党员队伍建设网',
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
                    name: '干部工作网',
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
                    name: '高校毕业生到村任职网',
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
                    name: '第一书记服务网',
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    type: 'line',
                    symbol: 'circle',
        
                    symbolSize: [8, 8],
                    data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
                }, {
                    name: '政策法规库',
                    type: 'line',
                    lineStyle:{
                        normal:{
                            width:8
                        },
                    },
                    symbol: 'circle',
                    symbolSize: [8, 8],
                    data: [11, 25, 39, 30, 55, 36,41, 45, 49, 30, 55, 36]
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
                        text: '栏目点击量',
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
                        data: ['学历教育网','党建和组织工作宣传网','层党组织建设网','党员队伍建设网','干部工作网','高校毕业生到村任职网','第一书记服务网','政策法规库']
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
                        name: '学历教育网',
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
                        name: '党建和组织工作宣传网',
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
                        name: '层党组织建设网',
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
                        name: '党员队伍建设网',
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
                        name: '干部工作网',
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
                        name: '高校毕业生到村任职网',
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
                        name: '第一书记服务网',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        type: 'line',
                        symbol: 'circle',
            
                        symbolSize: [8, 8],
                        data: [61, 70, 81,64, 50, 88,61, 70, 81,64, 50, 88]
                    }, {
                        name: '政策法规库',
                        type: 'line',
                        lineStyle:{
                            normal:{
                                width:8
                            },
                        },
                        symbol: 'circle',
                        symbolSize: [8, 8],
                        data: [11, 25, 39, 30, 55, 36,41, 45, 49, 30, 55, 36]
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
                        text: '文章平均审核时长',
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
                        data: ['文章平均审核时长']
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
                        name: '文章平均审核时长',
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
              echart5()

//下属党组织发布文章数量以及比例
$(function(){
    function echart6(){
        var chart = echarts.init(document.getElementById('echart6'));
        option = {
            title: {
                text: '下属党组织发布文章数量以及比例',
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
      echart6()
    });
    });