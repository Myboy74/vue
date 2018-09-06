<template>
    <div class="top">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>工作查看</el-breadcrumb-item>
                <el-breadcrumb-item style="text-align:left;width:105px;padding:0">全部周报查看</el-breadcrumb-item>
                <el-breadcrumb-item style="text-align:left">周报查看</el-breadcrumb-item>
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
                    <li>
                        <span>审阅结果：</span>
                        <p style="margin-bottom: 10px;">
                            <!--<span v-show="!item.examination" style="margin-left: -5%">未审批</span>-->
                            <el-row>
                                <el-button type="danger" circle v-if="item.examination=='0'"></el-button>
                                <el-button type="warning" circle v-else-if="item.examination=='1'"></el-button>
                                <el-button type="success" circle v-else-if="item.examination=='2'"></el-button>
                            </el-row>
                        </p>
                        <span>领导批示：</span><p>{{item.opinion?item.opinion:"暂无"}}</p>
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
            this.getAudior();
        },
        data(){
            return{
                createOrgId:this.$route.query.createOrgId, //获取科室id,
                weekStartDate:this.$route.query.weekStartDate, //获取时间,
                completed:[], //本周全部计划
                completedes:[]  //下周全部计划

            }
        },
        methods: {
            getAudior(){
                let obj={
                    createOrgId:this.createOrgId,
                    weekStartDate:this.weekStartDate
                };
                console.log(obj);
                let dates=qs.stringify(obj);
                postAjax("week/queryAuditedWeekByOrgAndDate",dates).then(res => {
                    if (res.data.code == 200) {
                        // console.log(res.data.data);
                        this.completed=res.data.data.weeks;
                        this.completedes=res.data.data.nextWeekPlans;
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },    //本周计划
            onReturn(){   //返回
                this.$router.push({path:'fWeekAll'});
            }
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
        margin-top: 40px;
        overflow: hidden;
    }
    .f_text ul li.f_border{
        border-top: 1px solid #cccccc;
        padding-top: 30px;

    }
    .el-textarea{
        width: 50%;
        margin-left: 10%;
    }
</style>