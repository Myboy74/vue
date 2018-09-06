<template>
    <div class="wrapper">
        <link rel='icon' href="../../../static/img/bitbug_favicon.ico" type='image/x-ico' />
        <div
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255)"
            style="width: 100%;height:100%">
        </div>
    </div>
</template>

<script>
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
import qs from "qs";
import axios from 'axios';
 export default {
    data() {
      return {
        code:'',
        loading: true,
        state:''
      };
    },
    mounted () {
    this.code=this.getQueryVariable("code")
    // this.state=this.getQueryVariable("state")
    this.sendCode()
    },
    methods: {
   getQueryVariable(variable)
        {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
            }
            return(false);
        },
  
    sendCode(){
        // if(this.state){

        // }
        let data=qs.stringify({code:this.code})
          postAjax("user/sso_callback",data).then(res => {
              if (res.data.code == 200) {
                  this.$router.push({ path:'/welcome',});
                  }
            //   if (res.data.code == 401) {
            //       location.href=res.data.data;
                  
            //       }     
              if (res.data.code == 403) {
                        this.$confirm('当前用户不具有访问权限, 是否需要更换账号?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        location.href=res.data.data;
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });          
                        });
                  }      
                })
    },
    
  }
   }
</script>
