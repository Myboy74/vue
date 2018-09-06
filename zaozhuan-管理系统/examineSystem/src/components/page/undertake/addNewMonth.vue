<template>
    <div class="top">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 任务承办</el-breadcrumb-item>
                <el-breadcrumb-item>月报添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="f_top">
            <p class="f_title"><i class="f_icon"></i>本月工作</p>
            <div class="f_con" v-for="(item,index) in addArray" :key="index">
                <p class="f_border" v-if="index>=1"></p>
                <div class="f_text">
                    <label >重点工作：</label><el-input type="textarea"   v-model="item.name" placeholder="请输入重点工作内容"></el-input>
                </div>
                <div class="f_text">
                    <label>责任人：</label>  <el-input type="input"   v-model="item.keyWork"  placeholder="请输入责任人"></el-input>
                </div>
                <div class="f_text" style="margin-bottom: 20px">
                    <label >工作成效：</label>  <el-input type="textarea"   v-model="item.desc"  placeholder="请输入工作成效内容"></el-input>
                </div>

            </div>
            <el-button type="success" icon="el-icon-plus" @click="onAdd" class="addBtn">添加</el-button>

        </div>
        <div class="bootom">
            <p class="f_title"><i class="f_icon"></i>下月计划</p>
            <div class="f_con" v-for="(item,index) in addWork" :key="index">
                <p class="f_border" v-if="index>=1"></p>
                <div class="f_text">
                    <label >重点工作：</label><el-input type="textarea"  v-model="item.name" placeholder="请输入重点工作内容"></el-input>
                </div>
                <div class="f_text">
                    <label>责任人：</label>  <el-input type="input"  v-model="item.keyWork"  placeholder="请输入责任人"></el-input>
                </div>
                <div class="f_text" style="margin-bottom: 20px">
                    <label >完成标准：</label>  <el-input type="textarea"   v-model="item.desc"  placeholder="请输入工作成效内容"></el-input>
                </div>

            </div>
            <el-button type="success" icon="el-icon-plus" @click="onLastAdd" class="addBtn">添加</el-button>
        </div>
        <div class="f_bootm">
            <el-button type="primary"  @click="onBtn">提交</el-button>
            <el-button type="warning"  @click="onOver">取消</el-button>
        </div>
    </div>
</template>

<script>
    import { postAjax, getAjax, oUrl,uploadImg } from "../../../api/api.js";
    import qs from "qs";
    export default {
       data(){
           return{
               addArray:[  //添加工作
                   {
                   name: '',
                   keyWork:"",
                   desc: ''
               }
               ],
               addWork:[ //添加计划
                   {
                       name: '',
                       keyWork:"",
                       desc: ''
                   }
               ],
               data:{
                   months:[],    //添加工作
                   nextMonthPlans:[]  //添加计划
               }
           }
       },
        methods: {
            onAdd() {
              this.addArray.push({
                  name: '',
                  keyWork:"",
                  desc: ''
              })
            },//添加本月月报
            onLastAdd() {
                this.addWork.push({
                    name: '',
                    keyWork:"",
                    desc: ''
                })
            }, //添加下月月报
            onBtn(){  //提交

                this.addArray.forEach(item => {
                    this.data.months.push({  //保存本周周报全部内容
                        keyPoint:item.name.replace(/(^\s*)|(\s*$)/g, ""),
                        responsiblePerson:item.keyWork.replace(/(^\s*)|(\s*$)/g, ""),
                        monthResult:item.desc.replace(/(^\s*)|(\s*$)/g, "")
                    })
                });
                this.addWork.forEach(item => {
                    this.data.nextMonthPlans.push({//保存下周计划全部内容
                        keyPoint:item.name.replace(/(^\s*)|(\s*$)/g, ""),
                        responsiblePerson:item.keyWork.replace(/(^\s*)|(\s*$)/g, ""),
                        monthResult:item.desc.replace(/(^\s*)|(\s*$)/g, "")
                    })
                });

                postAjax("month/reportMonth", this.data).then(res => {
                    // console.log(res);
                    if(res.data.code==200){
                        this.$message({ type: "success", message: "提交成功!" });
                        this.$router.push({
                            name: "month",
                        });
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            }, //提交
            onOver(){
                this.$confirm('此操作将放弃添加周报, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '取消成功!',
                    });
                    this.$router.push({
                        name: "month",
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            } //取消
        }
    }
</script>

<style scoped>
    .f_top,.bootom{
        width: 100%;
        height: 100%;
    }
    .bootom{
        margin-top: 50px;
    }
    .top .el-input{
        width: 30%;
        margin-left: 100px;
    }
    .top .el-textarea{
        width: 50%;
        margin-left: 100px;
    }
    .f_con{
        width: 95%;
        margin-left: 5%;
    }
    .f_text{
        margin-bottom: 20px;
        position: relative;
    }
    .f_text label{
        width: 80px;
        position: absolute;
        top: 10px;
        left: 0;
        text-align: right;
        font-size: 14px;
        color: #606266;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .addBtn{
        margin-left: 30%;
    }
    .f_border{
        width: 65%;
        border: 1px solid #cccccc;
        margin-bottom: 20px;
    }
    .f_bootm{
        width:50%;
        margin: 0 auto;
        margin-top: 50px;
    }
    .f_bootm .el-button{
        margin-right: 100px;
    }
</style>