var loginToken=sessionStorage.getItem('loginToken');
var w_url=sessionStorage.getItem('w_url');
var orgName=null;
var orgCode=null;
var orgId=null;
var setting = {
			view: {
				selectedMulti: false
			},
			async: {
				enable: true,
				type:'get',
				url:w_url+"/cic/api/tree?loginToken="+loginToken,   //&orgName="+orgName+"&orgCode="+orgCode+&orgId="+orgId"
				autoParam:["id=orgId"],
				dataFilter: filter,
				dataType:"json",
			},
			check: {
				enable: false
			},
			callback: {
                onClick: zTreeOnClick,
				onCheck: onCheck,
			}
		};
         // 初始化  过滤
		function filter(treeId, parentNode, childNodes) {
			if (!childNodes) return null;	
			var childNodes=childNodes.data	;
			for (var i=0, l=childNodes.length; i<l; i++) {
				childNodes[i].name=childNodes[i].orgName;
				orgIdss=childNodes[i].id
				if(childNodes[i].level<=3){
					childNodes[i]['isParent']=true;
				}else{
					childNodes[i]['isParent']=false;
				}
			}
			
			
			return childNodes;			
		}
		
		function onCheck(e, treeId, treeNode){
			
		}
		
		function zTreeOnClick(event, treeId, treeNode){
//			console.log(treeNode);
//			console.log(treeId);;
			orgName=treeNode.orgName;
			var w_orgName=treeNode.orgName;
			orgId=treeNode.id;
			orgCode=treeNode.orgCode;
			sessionStorage.setItem('orgName',orgName);
			$('.w_zaozhuang').html(w_orgName);
			// location.reload();
            $.ajax({
                type:"get",
                url:w_url+"/cic/user/switch_org?loginToken="+loginToken+"&orgName="+orgName+"&orgCode="+orgCode+"&orgId="+orgId,
//				async:true,
                success:function(data){
                    if(data.code==200){
                        location.reload();
//						console.log(222)
//						window.location.replace(window.location.url)
                    }else if(data.code==2){
                        alert(data.msg);
                        window.location.href='login.html'
                    }
                    // location.reload();
                },
                err:function(err){
                    console.log(err);
                }
            });
//			window.location.replace(window.location.url)

//			$('.w_zaozhuang').html(treeNode.orgName);
		}

		// move()






		//  初始化  ztree 
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting);

		});

// 搜索 树信息
//var loginToken=sessionStorage.getItem('loginToken');
//var manageOrgId=sessionStorage.getItem('manageOrgId')
$('.w_searchLa').click(function(){
	if($('.w_search').val().trim()==''){
		alert('请输入搜索内容')
	}else{
		var w_val=$('.w_search').val();
		
//		var setting2 = {
//			view: {
//				selectedMulti: false
//			},
//			async: {
//				enable: true,
//				type:'get',
//				url:w_url+"/cic/api/tree?orgName="+w_val+'&loginToken='+loginToken+'&orgId='+manageOrgId,  //&orgName="+orgName+"&orgCode="+orgCode+&orgId="+orgId"
//				autoParam:["id=orgId"],
//				dataFilter: filter2,
//				dataType:"json",
//			},
//			check: {
//				enable: false
//			},
//			callback: {
//				onClick: zTreeOnClick, 
//				onCheck: onCheck,
//			}
//		};
//		     // 初始化  过滤
//		function filter2(treeId, parentNode, childNodes) {
//			if (!childNodes) return null;	
//			var childNodes=childNodes.data;
//			$('.w_quji_tit').show();
//			for (var i=0, l=childNodes.length; i<l; i++) {
//				childNodes[i].name=childNodes[i].orgName;
//				orgIdss=childNodes[i].id
//				if(childNodes[i].level<=3){
//					childNodes[i]['isParent']=true;
//				}else{
//					childNodes[i]['isParent']=false;
//				}
//			}
//			
//			
//			return childNodes;			
//		}
//		
//		$(document).ready(function(){
//				$.fn.zTree.init($("#treeDemo"), setting2);
//		});
		

		
		$.ajax({
			type:"get",
			url:w_url+"/cic/api/tree?orgName="+w_val+'&loginToken='+loginToken+'&orgId=',
//			async:true,
			success:function(data){
//				console.log(data);

				if(data.code==200){
					if(data.data!=null){
//						var ssorgName=data.data[0].orgName;
//						sessionStorage.setItem('orgName',ssorgName);
						$('#treeDemo').hide();
						$('.w_quji').show();
						$('.w_quji_tit').show();
						var w_html=''
						for(var i=0;i<data.data.length;i++){
							w_html+='<li class="w_clickZao" data-oid="'+data.data[i].id+'" data-oCode="'+data.data[i].orgCode+'" >'+data.data[i].orgName+'</li>'
						}
						$('.w_quji').html(w_html);

					}else{
						alert(data.msg);
					}
				}else{
					alert(data.msg);
				}
			},
			error:function(err){
				console.log(err)	
			}
		});
	}
})
$('.w_quji').on('click','li',function(){
//	alert(1);
	var w_needID=$(this).attr('data-oid');
	var w_needHtml=$(this).html();
	var w_orgCode=$(this).attr('data-oCode');

	$.ajax({
		type:"get",
//		url:w_url+"/cic/api/tree?loginToken="+loginToken+'&orgId='+w_needID,
		url:w_url+"/cic/user/switch_org?loginToken="+loginToken+"&orgName="+w_needHtml+"&orgCode="+w_orgCode+"&orgId="+w_needID,
		async:true,
		success:function(data){
//			console.log(data)
// 			alert(data);
			if(data.code==200){
				sessionStorage.setItem('orgName',w_needHtml);
				location.reload();
			}else{
                alert(data.msg);
			}
		},error:function(err){
			console.log(data)
		}
	});
})

//点击返回
		$('.w_quji_tit').click(function(){
            // location.reload();
			$(this).hide();
			$('.w_quji ').hide();
			$('#treeDemo').show();
			$(document).ready(function(){
				$.fn.zTree.init($("#treeDemo"), setting);
			});
		})