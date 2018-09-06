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
        this.logout()
    },
    methods: {

  
    logout(){
          postAjax("user/sso_login_url ").then(res => {
              if (res.data.code == 200) {
                  location.href=res.data.data;

                  }
          })

    },
    
  }
   }
</script>
