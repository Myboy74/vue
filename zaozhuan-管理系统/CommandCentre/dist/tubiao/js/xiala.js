//$('.w_tui').click(function(){
//	sessionStorage.removeItem('loginToken');
//	window.location.href='login.html';
//})

$('.w_zuzhijiagou').click(function(){
//判断异地登录（有就退出）
    $.ajax({
        type:"get",
        url:w_url+"/cic/user/switch_org?loginToken="+loginToken+"&orgName="+orgName+"&orgCode="+orgCode+"&orgId="+orgId,
//				async:true,
        success:function(data){
        	if(data.code==2||data.code=="2"){
                alert(data.msg);
                window.location.href='login.html'
            }
        },
        err:function(err){
            console.log(err);
        }
    });

	$('.w_xiala').slideToggle();
	$('.w_mengban').slideToggle(0);

})
//$('.w_shiqu').on('click','li',function(){
//	if($(this).html()=='枣庄市<img src="img/箭头.png">'){
//		$('.w_shiqu').hide();
//		$('.w_pjiandu').hide();
//		$('.w_quji_tit').show();
//		$('.w_quji').show();
//	}else{
//		alert('暂未开通')
//	}
//})
//$('.w_zao').click(function(){
//	$('.w_shiqu').show();
//	$('.w_pjiandu').show();
//	$('.w_quji_tit').hide();
//	$('.w_quji').hide();
//})
//var w_url=sessionStorage.setItem('w_url','http://192.168.101.149:8080') 


$('.w_tab li').click(function(){
//	$('.w_mengban').show()
	$(this).addClass('active').siblings('li').removeClass('active')
	
})
var w_url=sessionStorage.getItem('w_url');
var loginToken=sessionStorage.getItem('loginToken');
$('.w_tui').click(function(){
//	ajaxGet(''
	$.ajax({
		type:"get",
		url:w_url+"/cic/user/logout?loginToken="+loginToken,
		async:true,
		success:function(data){
			// console.log(data);
			if(data.code=200){
				sessionStorage.clear();
				alert(data.msg);
				window.location.href='login.html';
			}
		},
		error:function(err){
			console.log(err);
		}
	});
})
