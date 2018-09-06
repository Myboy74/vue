<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>科室编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="科室名称:">
                    <el-input v-model="form.orgName" placeholder="请输入科室名称"></el-input>
                </el-form-item>
               <el-form-item label="科室负责人:">
                    <el-input v-model="form.orgPrincipal" placeholder="请输入科室负责人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:">
                    <el-input v-model="form.orgTel" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="科室排序:">
                    <el-input v-model="form.orderNum" placeholder="请输入排序数字" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
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
                 orgId:this.$route.query.orgId,
                form: {
                    orgName: '',
                    orgPrincipal: '',
                    orgTel: '',
                    orderNum: '',
                }
            }
        },
        created() {
            
                this.deskInfo();
            
        },
        methods: {
            //修改科室
            
            deskInfo(){
                if(this.orgId){
                getAjax("org/queryOrgOne",{orgId:this.orgId}).then(res => {
                if (res.data.code == 200) {
                    this.form.orgName=res.data.data.orgName;
                    this.form.orgPrincipal=res.data.data.orgPrincipal;
                    this.form.orgTel=res.data.data.orgTel;
                    this.form.orderNum=res.data.data.orderNum;

                }
            });
                }
          
            },
            //添加科室
            onSubmit() {
                let orgObj={orgId:this.orgId?this.orgId:'',orgName:this.form.orgName,orgPrincipal:this.form.orgPrincipal,orgTel:this.form.orgTel,orderNum:this.form.orderNum}
               
                 postAjax("org/saveOrg",orgObj).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success('提交成功！');
                        this.$router.push({ path:'/desksetting',});
                    }
                });
                
            },
            returnBack(){
                this.$router.push({ path:'/desksetting',});
            }
        }
    }
</script>