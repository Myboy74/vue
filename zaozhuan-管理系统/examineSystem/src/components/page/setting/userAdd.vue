<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>用户编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="用户名:">
                    <el-input v-model="form.orgName"  placeholder="请输入用户名"></el-input>
                </el-form-item>
               <el-form-item label="联系电话:">
                    <el-input v-model="form.telephone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="用户角色:">
                      <el-select v-model="form.roleId" placeholder="请选择用户角色">
                        <el-option
                        v-for="item in roleList"
                        :key="item.roleid"
                        :label="item.rolename"
                        :value="item.roleid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属科室:">
                    <el-select v-model="form.orgId" placeholder="请选择所属科室">
                        <el-option
                        v-for="item in orgList"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="returnBack">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import { postAjax, getAjax, oUrl,uploadImg } from "../../../api/api.js";
import qs from "qs";
    export default {
        data: function(){
            return {
                 userId:this.$route.query.userId,
                form: {
                    orgName: '',
                    telephone: '',
                    orgId: '',
                    roleId: '',
                },
                roleList:[],//角色ID
                orgList:[],//科室ID

            }
        },
        created() {
            
                this.deskInfo();
                this.getOrgList();
                this.getUseInfo()
            
        },
        methods: {
            //查询角色
            deskInfo(){
                getAjax("role/queryRoleList").then(res => {
                if (res.data.code == 200) {
                    this.roleList=res.data.data;
                }
            });
          
            },
            //查询科室
            getOrgList(){
                getAjax("org/queryOrgList").then(res => {
                if (res.data.code == 200) {
                    this.orgList=res.data.data;
                }
            });
          
            },
            //获取用户信息
            getUseInfo() {
            let data=qs.stringify({id:this.userId})
            postAjax("user/findById",data).then(res => {
                if (res.data.code == 200) {
                    this.form.orgName=res.data.data.userName;
                    this.form.telephone=res.data.data.telephone;
                    this.form.orgId=res.data.data.orgId;
                    this.form.roleId=res.data.data.roleId;
                }
            });
            },
            onSubmit(){
            let data={userId:this.userId,userName:this.form.orgName,telephone:this.form.telephone,orgId:this.form.orgId,roleId:this.form.roleId}
            postAjax("user/update",data).then(res => {
                if (res.data.code == 200) {
                  
                  this.$message.success('提交成功！');
                  this.$router.push({ path:'/userSetting',});
                   
                }
            });
            },
    returnBack(){
        this.$router.push({ path:'/userSetting',});
    }
        }
    }
</script>
<style>

</style>
