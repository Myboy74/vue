<template>
    <div class="f_tab">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>本周周报</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs type="border-card">
            <el-tab-pane label="本周工作">
                <div class="f_allTime">
                    <p style="float: left;margin-right: 10px"><WeekAllTime  @weekTime="startTime" @weekTimes="endTime"></WeekAllTime></p>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
                <div class="f_top" v-for="(ite,index) in completed" :key="index">
                    <p class="f_title"><i class="f_icon"></i>{{ite.orgName}}</p>
                    <div class="f_txt f_txts" v-if="!ite.weeks.length">暂无数据</div>
                    <div class="f_text">
                        <ul v-for="(item,ind) in ite.weeks" :key="ind" :class="{f_magin:ind>=1}">
                            <li :class="{f_border:ind>=1}">
                                <span>重点工作：</span><p >{{item.keyPoint?item.keyPoint:"暂无"}}</p>
                            </li>
                            <li>
                                <span>责任人：</span><p >{{item.responsiblePerson?item.responsiblePerson:"暂无"}}</p>
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
                                    <el-radio-group v-model="radio2[ind]" >
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
                                <div class="f_bei">
                                    <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="approval[ind]">
                                    </el-input>
                                    <el-button type="primary" style="margin-left: 20px" @click="onAuditor(item.weekId,ind)">提交审核</el-button>

                                </div>

                            </li>
                        </ul>
                    </div>
                </div>
                <div class="f_txt" v-if="lock">暂无数据</div>
                <!--<el-button type="success" class="f_bto"  @click="onReturn">返回</el-button>-->
            </el-tab-pane>
            <el-tab-pane label="本周已完成">
                <div class="f_allTime">
                    <p style="float: left;margin-right: 10px"><WeekAllTime  @weekTime="startTime" @weekTimes="endTime"></WeekAllTime></p>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
                <div class="f_top" v-for="(ite,index) in workComplete" :key="index">
                    <p class="f_title"><i class="f_icon"></i>{{ite.orgName}}</p>
                    <div class="f_txt f_txts" v-if="!ite.weeks.length">暂无数据</div>
                    <div class="f_text">
                        <ul v-for="(item,index) in ite.weeks" :key="index" :class="{f_magin:index>=1}">
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
                <div class="f_txt" v-if="lockWord">暂无数据</div>
                <!--<el-button type="success" class="f_bto"  @click="onReturn">返回</el-button>-->
            </el-tab-pane>
            <el-tab-pane label="本周未完成">
                <div class="f_allTime">
                    <p style="float: left;margin-right: 10px"><WeekAllTime  @weekTime="startTime" @weekTimes="endTime"></WeekAllTime></p>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
                <div class="f_top" v-for="(ite,index) in workNoComplete" :key="index">
                    <p class="f_title"><i class="f_icon"></i>{{ite.orgName}}</p>
                    <div class="f_txt f_txts" v-if="!ite.weeks.length">暂无数据</div>
                    <div class="f_text">
                        <ul v-for="(item,ind) in ite.weeks" :key="ind" :class="{f_magin:ind>=1}">
                            <li :class="{f_border:ind>=1}">
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
                                    <el-radio-group v-model="radioNoWork[ind]">
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
                                <div class="f_bei">
                                    <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="approvalNoWork[ind]">
                                    </el-input>
                                    <el-button type="primary" style="margin-left: 20px" @click="onNoWork(item.weekId,ind)">提交审核</el-button>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="f_txt" v-if="lockNoWord">暂无数据</div>
                <!--<el-button type="success" class="f_bto"  @click="onReturn">返回</el-button>-->
            </el-tab-pane>
            <el-tab-pane label="下周计划">
                <div class="f_allTime">
                    <p style="float: left;margin-right: 10px"><WeekAllTime  @weekTime="endTime" @weekTimes="startTime"></WeekAllTime></p>
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
                <div class="f_top" v-for="(ite,index) in plan" :key="index">
                    <p class="f_title"><i class="f_icon"></i>{{ite.orgName}}</p>
                    <div class="f_txt f_txts" v-if="!ite.evaluationMethod.length">暂无数据</div>
                    <div class="f_text">
                        <ul v-for="(item,index) in ite.evaluationMethod" :key="index" :class="{f_magin:index>=1}">
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
                </div>
                <div class="f_txt" v-if="lockPlan">暂无数据</div>
                <!--<el-button type="success" class="f_bto"  @click="onReturn">返回</el-button>-->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { postAjax, getAjax, oUrl,uploadImg } from "../../../api/api.js";
    import qs from "qs";
    import WeekAllTime from '../common/weekAllTime.vue';
    export default {
        created(){
            this.getWeekAll();
            this.getWorkCompleted();
            this.getWorkNoCompleted();
            this.getPlan();
        },
        components:{
            WeekAllTime
        },
        data(){
            return{
                completed:[],   //所有工作内容
                radio2: [],   //考核是否通过数据
                approval:[],//考核审批得数据
                obj:{
                    startTime:"",
                    endTime:""
                },  //提交审核使用
                workComplete:[],  //已完成  科室
                workNoComplete:[],  //未完成   科室
                radioNoWork: [],   //考核是否通过数据
                approvalNoWork:[],//考核审批得数据
                plan:[],  //计划    科室
                lock:false,    //全部暂无内容
                lockWord:false, //已完成暂无内容
                lockNoWord:false, //未完成暂无内容
                lockPlan:false, //计划暂无内容

            }
        },
        methods:{
            startTime(val){  //开始时间
                this.obj.endTime=val;
            },//开始时间
            endTime(val){  //结束时间
                this.obj.startTime=val;

            }, //结束时间
            search(){  //所有工作搜索
                this.getWeekAll(this.obj);
                this.getWorkCompleted(this.obj);
                this.getWorkNoCompleted(this.obj);
                this.getPlan(this.obj);
            },//所有工作搜索
            getWeekAll(val) {
                let data1=qs.stringify(val);
                postAjax("week/queryCurrentWeek",data1).then(res => {
                    if (res.data.code == 200) {
                        // console.log("全部工作");
                        // console.log( res.data.data);
                        // console.log(res.data.data.length);
                        if(res.data.data.length==0){
                            this.lock=true;
                            // this.$message.error("本周工作暂无数据");
                            this.completed=[];  //先清空，只要搜索到的
                            return;
                        }else{
                            this.lock=false;
                            this.completed=[];  //先清空，只要搜索到的
                            this.completed=res.data.data;
                            res.data.data.forEach((item,index)=>{
                                item.weeks.forEach((ite,index)=>{
                                    if(!ite.examination){
                                        this.radio2.push(3);//得到没有审核得按钮
                                        this.approval.push("");//得到没有审核得审核意见框
                                    }
                                })
                            })
                        }



                    }else{
                        this.$message.error("服务器错误");
                    }
                });

            },//本周全部工作
            onAuditor(val,index){
                // console.log(val);
                // console.log(index);
                this.obj={
                    weekId:val,
                    examination:this.radio2[index],
                    opinion:this.approval[index]
                };
                if(this.obj.examination==3 || this.obj.examination=="3" || this.obj.examination==undefined){
                    this.$message.error("请审核");
                    return false;
                }
                if(!this.obj.opinion){
                    this.$message.error("请输入内容");
                    return false;
                }
                var _this=this;
                postAjax("week/checkWeek",this.obj).then(res => {
                    if (res.data.code == 200) {
                        this.$message({ type: "success", message: "提交成功!" });
                        _this.radio2=[];//得到没有审核得按钮
                        _this.approval=[];//得到没有审核得审核意见框
                        _this.getWeekAll();
                        _this.getWorkCompleted();
                        _this.getWorkNoCompleted();
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },   //本周全部工作  提交审核
            // onReturn(){   //返回
            //     this.$router.push({path:'weekly'});
            // },   //返回
            getWorkCompleted(val){  //本周已完成工作
                let data1=qs.stringify(val);
                postAjax("week/queryCurrentFinishWeek",data1).then(res => {
                    if (res.data.code == 200) {
                        // console.log("已完成");
                        // console.log(res);
                        if(res.data.data.length==0){
                            this.lockWord=true;
                            // this.$message.error("本周已完成暂无数据");
                            this.workComplete=[];  //没有清空原先的数据
                            return;
                        }
                        this.lockWord=false;
                        this.workComplete=[]; //先清空，只要搜索到的
                        this.workComplete=res.data.data;
                        // console.log(this.workComplete[1].weeks.length)

                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },//本周已完成工作
            getWorkNoCompleted(val){//本周未完成工作
                let data1=qs.stringify(val);
                postAjax("week/queryCurrentNotFinishWeek",data1).then(res => {
                    if (res.data.code == 200) {
                        // console.log("未完成");
                        // console.log(res.data.data);
                        if(res.data.data.length==0){
                            this.lockNoWord=true;
                            // this.$message.error("本周未完成暂无数据");
                            this.workNoComplete=[];  //先清空，只要搜索到的
                            return;
                        }
                        this.lockNoWord=false;
                        this.workNoComplete=[];   //先清空，只要搜索到的
                        this.workNoComplete=res.data.data;
                        res.data.data.forEach((item,index)=> {
                            item.weeks.forEach(ite=>{
                                if(!ite.examination){
                                    this.radioNoWork.push(3);//得到没有审核得按钮
                                    this.approvalNoWork.push("");//得到没有审核得审核意见框
                                }
                            })

                        })

                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },//本周未完成工作
            onNoWork(val,index){
                this.obj={
                    weekId:val,
                    examination:this.radioNoWork[index],
                    opinion:this.approvalNoWork[index]
                };
                // console.log(this.obj);
                if(this.obj.examination==3 || this.obj.examination=="3"){
                    this.$message.error("请审核");
                    return false;
                }
                if(!this.obj.opinion){
                    this.$message.error("请输入内容");
                    return false;
                }
                var _this=this;
                postAjax("week/checkWeek",this.obj).then(res => {
                    if (res.data.code == 200) {
                        this.$message({ type: "success", message: "提交成功!" });
                        _this.radioNoWork=[];//得到没有审核得按钮
                        _this.approvalNoWork=[];//得到没有审核得审核意见框
                        _this.getWeekAll();
                        _this.getWorkCompleted();
                        _this.getWorkNoCompleted();
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            },  //本周未完成工作提交审核
            getPlan(val){
                let data1=qs.stringify(val);
                postAjax("nextWeekPlan/queryNextWeekPlan",data1).then(res => {
                    if (res.data.code == 200) {
                        if(res.data.data.length==0){
                            this.lockPlan=true;
                            // this.$message.error("下周计划暂无数据");
                            this.plan=[];  //先清空，只要搜索到的
                            return;
                        }
                        this.lockPlan=false;
                        this.plan=[];  //先清空，只要搜索到的
                        this.plan=res.data.data;
                        // console.log(this.plan);
                    }else{
                        this.$message.error("服务器错误");
                    }
                });
            }   //下周计划
        }
    }
</script>

<style scoped>
    .f_tab .f_title{
        width: 20%;
        margin: 20px auto;
    }
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
        /*margin: 0 auto;*/
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
    .f_bei{
        width: 80%;
        height: 100%;
        margin-left: 12%;
    }
    .el-textarea{
        width: 350px;
        margin-right:  20px;
    }
    .f_allTime{
        width: 60%;
        margin: 10px auto;
    }
    .f_tab .f_bto{
        margin-left: 40%;
        margin-bottom: 30px;
    }
    .f_txt{
        width: 100%;
        text-align: center;
        color: #909399;
    }
    .f_txts{
        margin-top: 50px;
        margin-left: -45px;
    }
</style>