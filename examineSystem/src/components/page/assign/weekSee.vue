<template>
    <div class="top">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>任务交办</el-breadcrumb-item>
                <el-breadcrumb-item style="text-align:left;width:80px;padding:0">所有周报</el-breadcrumb-item>
                <el-breadcrumb-item style="text-align:left">周报审阅</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="f_top">
            <p class="f_title"><i class="f_icon"></i>本周工作</p>
            <div class="f_text">
                <ul v-for="(item,index) in completed" :key="index" :class="{f_magin:index>=1}">
                    <li :class="{f_border:index>=1}">
                        <span>重点工作：</span><p>{{item.keyPoint?item.keyPoint:"暂无"}}</p>
                    </li>
                    <li>
                        <span>责任人：</span><p>{{item.responsiblePerson?item.responsiblePerson:"暂无"}}</p>
                    </li>
                    <li>
                        <span>工作成效：</span><p>{{item.weekResult?item.weekResult:"暂无"}}</p>
                    </li>
                    <!--如果有审批结果显示审批结果否则显示审批及按钮提交-->
                    <li v-if="item.examination" >
                        <span>审阅结果：</span>
                        <p style="margin-bottom: 10px;">
                            <el-row>
                                <el-button type="danger" circle v-if="item.examination=='0'"></el-button>
                                <el-button type="warning" circle v-else-if="item.examination=='1'"></el-button>
                                <el-button type="success" circle v-else-if="item.examination=='2'"></el-button>
                            </el-row>
                        </p>
                        <span>领导批示：</span><p>{{item.opinion?item.opinion:"暂无"}}</p>
                    </li>
                    <li v-else>
                        <p style="margin-bottom: 20px;">
                            <el-radio-group v-model="radio2[index]">
                                <el-radio :label="0" >
                                    <el-button type="danger" circle class="f_otn"></el-button>
                                </el-radio>
                                <el-radio :label="1" >
                                    <el-button type="warning" circle class="f_otn"></el-button>
                                </el-radio>
                                <el-radio :label="2" >
                                    <el-button type="success" circle class="f_otn"></el-button>
                                </el-radio>
                            </el-radio-group>
                        </p>
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="approval[index]">
                        </el-input>
                        <el-button type="primary" style="margin-left: 20px" @click="onAuditor(item.weekId,index)">提交审核</el-button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="f_top">
            <p class="f_title"><i class="f_icon"></i>下周计划</p>
            <div class="f_text">
                <ul v-for="(item,index) in completedes" :key="index" :class="{f_magin:index>=1}">
                    <li :class="{f_border:index>=1}">
                        <span>重点工作：</span><p>{{item.keyPoint?item.keyPoint:"暂无"}}</p>
                    </li>
                    <li>
                        <span>责任人：</span><p>{{item.responsiblePerson?item.responsiblePerson:"暂无"}}</p>
                    </li>
                    <li>
                        <span>完成标准：</span><p>{{item.weekResult?item.weekResult:"暂无"}}</p>
                    </li>
                </ul>
            </div>
            <el-button type="success" style="margin-left: 40%;"  @click="onReturn">返回</el-button>
        </div>


    </div>
</template>

<script>
    import { postAjax, getAjax, oUrl,uploadImg } from "../../../api/api.js";
    import qs from "qs";
    export default {
        created(){
            this.getAuditor();
        },
        data(){
            return{
                createOrgId:this.$route.query.createOrgId, //获取科室id,
                weekStartDate:this.$route.query.weekStartDate, //获取时间,
                completed:[],  //本周周报
                completedes:[],  //下周全部计划
                radio2: [],   //考核是否通过数据
                approval:[],//考核审批得数据
                obj:{}  //提交审核使用
            }
        },
        methods: {
            getAuditor() {
                // console.log(this.radio2);
                // console.log(this.approval);
                this.obj={
                    createOrgId:this.createOrgId,
                    weekStartDate:this.weekStartDate
                };
                let data1=qs.stringify(this.obj);
                postAjax("week/queryWeekByOrgAndDate",data1).then(res => {
                    if (res.data.code == 200) {
                        this.completed=res.data.data.weeks;
                        res.data.data.weeks.forEach((item,index)=>{
                            if(!item.examination){
                                this.radio2.push(3);
                                this.approval.push("");
                            }
                        });
                        this.completedes=res.data.data.nextWeekPlans;
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },
            onReturn(){
                this.$router.push({path:'weekly'});
            }, //返回
            onAuditor(val,index){
                // console.log("id="+val);   //id
                // console.log("index="+index);  //下标
                // console.log("sum="+this.radio2[index]);
                this.obj={
                    weekId:val,
                    examination:this.radio2[index],
                    opinion:this.approval[index]
                };
                if(this.obj.examination==3 || this.obj.examination=="3"){
                    this.$message.error("请审核");
                    return;
                }
                if(!this.obj.opinion){
                    this.$message.error("请输入内容");
                    return false;
                }
                var _this=this;
                postAjax("week/checkWeek",this.obj).then(res => {
                    if (res.data.code == 200) {
                        this.$message({ type: "success", message: "提交成功!" });
                        _this.radio2=[];
                        _this.approval=[];
                        _this.getAuditor();
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
                this.obj={};   //完了清空
            },  //提交审核
        }
    }
</script>

<style scoped>
    .f_top{
        width: 100%;
        height: 100%;
    }
    .f_text{
        width: 95%;
        margin:0 0 5% 5%;
    }
    .f_text ul li span{
        width: 12%;
        text-align: right;
        display: inline-block;
        float: left;
        padding-right: 10px;
        font-size: 14px;
        color: #606266;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .f_text ul{
        width: 80%;
    }
    .f_text ul li{
        width: 100%;
        line-height: 25px;
        /*background-color: #42d885;*/
        padding: 10px;
    }
    .f_text ul li p{
        width: 82%;
        padding-right: 10px;
        margin-left: 14%;
        font-size: 14px;
        color: #606266;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .f_btn{
        margin-left: 30%;
    }
    .f_text ul.f_magin{
        width: 82%;
        margin-top: 20px;
        overflow: hidden;
    }
    .f_text ul li.f_border{
        border-top: 1px solid #cccccc;
        padding-top: 30px;

    }
    .el-textarea{
        width: 350px;
        margin:0 20px 0  120px;
    }
</style>