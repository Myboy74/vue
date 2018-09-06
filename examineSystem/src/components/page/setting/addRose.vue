<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>角色编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="角色名称:">
                    <el-input v-model="form.roseName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
               <el-form-item label="备注:">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入备注内容"
                    v-model="form.remark">
                    </el-input>
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
                 roleId:this.$route.query.roleId,
                form: {
                    roseName: '',
                    remark: ''
                }
            }
        },
        created() {
            
                this.roseInfo();
            
        },
        methods: {
            //修改角色
            
            roseInfo(){
                if(this.roleId){
                getAjax("role/findById",{id:this.roleId}).then(res => {
                if (res.data.code == 200) {
                    this.form.roseName=res.data.data.roleName;
                    this.form.remark=res.data.data.remark;

                }
            });
                }
          
            },
            //添加角色
            onSubmit() {
                let orgObj={roleId:this.roleId?this.roleId:'',roleName:this.form.roseName,remark:this.form.remark}
               
                 postAjax("role/save",orgObj).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success('提交成功！');
                        this.$router.push({ path:'/roseSetting',});
                    }
                });
                
            },
            returnBack(){
               this.$router.push({ path:'/roseSetting',}); 
            }
        }
    }
</script>