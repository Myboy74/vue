<template>
    <div >
        <!-- <div class="logo"></div> -->
      
                   <div class="layout-top">
            <div class="layout-top-wave" id="topwave" style="transform: translate3d(0px, 0px, 0px); transform-style: preserve-3d; backface-visibility: hidden;">
                <div class="layer topwave wave1" data-depth="0.02" style="transform: translate3d(0.752px, -0.174654px, 0px); transform-style: preserve-3d; backface-visibility: hidden; position: relative; display: block; left: 0px; top: 0px;"></div>
                <div class="layer topwave wave2" data-depth="0.08" style="transform: translate3d(3.008px, -0.698616px, 0px); transform-style: preserve-3d; backface-visibility: hidden; position: absolute; display: block; left: 0px; top: 0px;"></div>
                <div class="layer topwave wave3" data-depth="0.14" style="transform: translate3d(5.264px, -1.22258px, 0px); transform-style: preserve-3d; backface-visibility: hidden; position: absolute; display: block; left: 0px; top: 0px;"></div>
                <div class="layer topwave wave4" data-depth="0.20" style="transform: translate3d(7.52px, -1.74654px, 0px); transform-style: preserve-3d; backface-visibility: hidden; position: absolute; display: block; left: 0px; top: 0px;"></div>
            </div>
            <div id="J_header">
                <div class="logo">
                    <h1>
                        <a> 
							<img src="../../../static/img/Logo.png" alt="">
                            <img src="../../../static/img/title.png" alt="">
                        </a>
                    </h1>
                </div>
				<div class="j_ban">
					<h2>督查考核系统</h2>
				</div>
                <div class="user-img m-r-sm">
	                                <img src="../../../static/img/toux.png" alt="">
	                            </div>
            </div>
		</div>
          <div class="user-info"> 
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    用户名：{{name}}
                 </span> 
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
export default {
  data() {
    return {
      name: localStorage.getItem('ms_username')
    };
  },
  created () {
    // this.userInfo()
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
             getAjax("user/logout").then(res => {
            if (res.data.code == 200) {
                this.$message.success('成功退出登录！');
                // location.href=res.data.data;//sso退出
                this.$router.push({ path:'/Login',});
            }else{
            }
        });
      }
    },
    // userInfo(){
    //       getAjax("user/userInfo").then(res => {
    //     if(res.data.code==200){
    //         this.name=res.data.data.name;
    //     }  

          
    //       })
    // }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
}
.header .logo {
  float: left;
  width: 250px;
  text-align: center;
}
/* .header{
        background:url(../../../static/img/head.png) no-repeat;
        height: 88px;
    } */
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
  margin-top: 30px;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
  z-index: 9999;
}
.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.layout-top {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  height: 88px;
  background-color: #e91b1b;
}
.layout-top .layout-top-wave {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.layout-top .layout-top-wave .topwave.wave1 {
  background: url(../../../static/img/wave1.png) repeat-x left bottom;
  z-index: 4;
}
.layout-top .layout-top-wave .topwave {
  position: absolute;
  top: 0;
  bottom: 0;
  right: -150px;
  left: -150px;
  min-width: 100%;
  height: 100%;
  overflow: hidden;
}
.layout-top .layout-top-wave .topwave.wave2 {
  background: url(../../../static/img/wave2.png) repeat-x left bottom;
  z-index: 3;
}
.layout-top .layout-top-wave .topwave.wave3 {
  background: url(../../../static/img/wave3.png) repeat-x left bottom;
  z-index: 2;
  opacity: 0.5;
}
.layout-top .layout-top-wave .topwave.wave4 {
  background: url(../../../static/img/wave4.png) repeat-x left bottom;
  z-index: 1;
  opacity: 0.5;
}
.logo {
  width: 260px;
  padding-left: 20px;
  float: left;
  position: relative;
  z-index: 9;
  max-height: 100%;
}
.logo img {
  max-height: 100%;
  height: 88px;
}
.j_ban h2 {
  color: #fff;
  font-weight: bolder;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.75);
  right: 50px;
  top: 50%;
  letter-spacing: 3px;
  font-size: 24px;
  margin-top: 30px;
  display: inline-block;
  margin-left: 40px;
  transition: 0.2s all ease;
}
.el-dropdown-menu {
  padding: 0 !important;
}
.user-img {
  position: absolute;
  border-radius: 50%;
  right: 200px;
  top: 20px;
  overflow: hidden;
  /* border: 2px solid #fff;
    background-color: #fff; */
}
.user-img img {
  max-height: 40px;
}
</style>
