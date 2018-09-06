//sessionStorage.setItem('w_url','http://10.1.1.134')
//sessionStorage.setItem('w_url','http://192.168.101.149:8080');
sessionStorage.setItem('w_url','http://10.1.1.150:8083')
//********更改接口注意事项    ******** ajax.js ********   login.html********
//********更改接口注意事项    ******** ajax.js ********   login.html********
//********更改接口注意事项    ******** ajax.js ********   login.html********
var w_url = sessionStorage.getItem('w_url')
var dats= {"code" : 400, "msg" : "错误", "data": []} ;


if(sessionStorage.getItem('orgName')){
	var w_zao=sessionStorage.getItem('orgName');
	$('.w_zaozhuang').html(w_zao);
}


function ajaxGet(key,callback){
	var loginToken =sessionStorage.getItem('loginToken');
	$.ajax({
	type:"get",
	async:true,
	url:w_url+'/cic/api/data?type='+key+'&loginToken='+loginToken,
	success:function(data){
//		dats = data;
		if(data.code==2){
				$('#msg').html(data.msg);
				alert(data.msg);
				window.location.href='login.html'
		}else if(data.code==3){
            //alert(data.msg);
				$('#msg').html(data.msg);
				window.location.href='login.html'
		}else if(data.code==200){
			if(data.data.length>0){
//				dats = data;
				callback(data);
			}else if(data.code==2){
					$('#msg').html(data.msg);
                	// alert(data.msg);
					window.location.href='login.html'
			}else if(data.code==3){
				$('#msg').html(data.msg);
				window.location.href='login.html'
			}
		} else {
//			dats.data = [];
			console.log(data.msg)
		}		
	},
	error:function(err){
		console.log(err)

	}
});
}

