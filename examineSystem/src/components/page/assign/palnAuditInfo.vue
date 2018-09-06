<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务承办</el-breadcrumb-item>
                <el-breadcrumb-item style="text-align:left">计划审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="firstLine"><span>任务分类：</span><a>{{plandetails.taskTypeName}}</a>
            <!-- <span style="text-align:left">责任单位：</span><a>111</a> -->
            </div>
            <div><span>重点任务：</span><a>{{plandetails.taskEmphasisContent}}</a></div>
            <div><span>任务详述：</span><a>{{plandetails.taskDescription}}</a></div>
            <div class="firstLine"><span>计划上报截止：</span><a>{{plandetails.reportTime}}</a><span style="text-align:left">任务截止时间：</span><a>{{plandetails.deadlineTime}}</a></div>
            <div><span>考核方式：</span><a>{{plandetails.evaluationMode}}</a></div>
                  <div><span>任务附件：</span><a v-if="!attachments.length">暂无</a></div>
            <div style="margin-left:30px;display:inline-block" v-for="item in attachments" :key="item.attachmentId" v-if="attachments.length">
                <div v-html="fileType(item.attachmentName,item.attachmentId)"></div>
                <!-- <div>{{item.attachmentName}}</div> -->
                <div ><a :href="url+item.attachmentId">下载</a></div>
            </div>
        </div>
        <hr style="border:none;border-bottom:1px solid #ccc;margin:20px 0;">
        <div class="clearfix" style="margin-bottom:10px;">
            <label class="label-search">任务总负责人:</label><span style="text-align:left">{{principal}}</span>
            <!-- <el-input v-model="principal" placeholder="请输入内容" @change="changeAll" style="width:200px;float:left"></el-input> -->
        </div>
        <!-- 计划周期 -->
        <div class="periodBox" :key="index" v-for="(elem,index) in periodArray">
           
            <div class="clearfix" style="margin-bottom:10px;">
                <div style="float:left">
                <label class="label-search">计划周期:</label>
                <!-- <el-date-picker style="margin-left:10px"
                v-model="elem.dataTime"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="timeList(index)">
                </el-date-picker> -->
                <span style="text-align:center">{{elem.periodBeginTime}}</span>--
                <span style="text-align:center">{{elem.periodEndTime}}</span>
            </div>
            
            <div style="float:left;margin-left:30px;">
                <label class="label-search">计划负责人:</label>
                <!-- <el-input v-model="elem.responsiblePerson" placeholder="请输入内容" style="width:200px;float:left"></el-input> -->
                <span style="text-align:left">{{elem.responsiblePerson}}</span>
            </div>
               
            </div>
             <label class="label-search">完成标准:</label>
             <el-input type="textarea" v-model="elem.completionCriteria" :autosize="{ minRows: 3, maxRows: 4}" style="width:100%;display:inline-block;margin-bottom:10px" disabled></el-input>
              <label class="label-search">周期内容:</label>
            <el-input type="textarea" v-model="elem.periodContent" :autosize="{ minRows: 5, maxRows: 6}" style="width:100%" disabled></el-input>
           
        </div>
        <div>
            <label class="label-search" style="width:100px;">附件详情： </label>
            <div><a v-if="!periodAttachments.length">暂无</a></div>
            <div style="margin-left:30px;display:inline-block" v-for="item in periodAttachments" :key="item.attachmentIds" v-if="periodAttachments.length">
                <div v-html="fileType(item.attachmentNames,item.attachmentIds)"></div>
                <!-- <div>{{item.attachmentName}}</div> -->
                <div ><a :href="url+item.attachmentIds">下载</a></div>
            </div>
        </div>
            
        
        <el-row style="text-align:center;margin-top:30px;">
        <el-button type="primary" @click="passPlan">审核通过</el-button>
        <el-button type="danger" @click="dialogVisible = true">审核不通过</el-button>
        <el-dialog
        title="请输入不通过原因"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="nopassTextarea">
        </el-input>
        <span slot="footer" class="dialog-footer" style="width:100%">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="notpassPlan">提 交</el-button>
        </span>
        </el-dialog>

        </el-row>
    </div>
</template>

<script>
import { postAjax, getAjax, oUrl,uploadImg } from "../../../api/api.js";
import qs from "qs";
    export default {
        data() {
            return {
            uploadImg: uploadImg(),
            planId:this.$route.query.planId,//获取计划id
            taskId:this.$route.query.taskId,//获取任务ID
            principal:'',
            dataTime:'',
            dialogVisible: false,//审核不通过弹窗
            nopassTextarea:'',//审核不通过原因
            urlImg:oUrl(),
            url:oUrl()+'attachment/download?attachmentId=',
            attachments:[],//任务附件
            periodAttachments:[],//计划附件
            plandetails:{//任务详情
                taskTypeName:'',
                taskEmphasisContent:'',
                taskDescription:'',
                reportTime:'',
                deadlineTime:'',
                evaluationMode:'',
                taskRemark:'',

            },
            periodArray:[],//周期详情
            }
        },
        created(){
           this.taskInfo();
           this.planInfo();
           this.periodInfo();
           this.planAttachmentLis()
           this.periodAttachmentLis()
        },

        methods: {
            taskInfo(){
                let obj={taskId:this.taskId}
                let _this=this
                 getAjax("task/getTaskInfoById",obj).then(res => {
                    if (res.data.code == 200) {
                        this.plandetails.taskTypeName=res.data.data.taskTypeName;
                        this.plandetails.taskEmphasisContent=res.data.data.taskEmphasisContent;
                        this.plandetails.taskDescription=res.data.data.taskDescription;
                        this.plandetails.reportTime=res.data.data.reportTime;
                        this.plandetails.deadlineTime=res.data.data.deadlineTime;
                        res.data.data.evaluationMode=="01"?this.plandetails.evaluationMode="定性考核 ":this.plandetails.evaluationMode="定量考核 ";
                        this.plandetails.taskRemark=res.data.data.taskRemark;
                    }
                });
            },
            planInfo(){
                let planobj=qs.stringify({planId:this.planId})
                let _this=this
                 postAjax("period/getPeriodInfoByPlanId",planobj).then(res => {
                    if (res.data.code == 200) {
                        let item=res.data.data;
                        item.forEach(function(item){
                            _this.periodArray.push({
                                periodBeginTime:item.periodBeginTime,
                                periodEndTime:item.periodEndTime,
                                responsiblePerson:item.responsiblePerson,
                                completionCriteria:item.completionCriteria,
                                periodContent:item.periodContent
                            })
                        })
                    }
                });
            },
             periodInfo(){
                let periodobj=qs.stringify({planId:this.planId})
                let _this=this
                 postAjax("taskPlan/getTaskPlanInfoById",periodobj).then(res => {
                    if (res.data.code == 200) {
                        let item=res.data.data;
                        this.principal=item.responsiblePerson;

                    }
                });
            },
            //任务附件查询
            planAttachmentLis() {
            getAjax("attachment/queryAttachmentList", {
                moduleId:this.taskId
            }).then(res => {
                if (res.data.code == 200) {
                let _this=this;
                let ourl= localStorage.getItem('url')
                res.data.data.forEach(function(item){
                    _this.attachments.push({attachmentName:item.attachmentName,attachmentId:item.attachmentId});
                })
                // console.log(this.attachments)
                }
            });
            },
                //计划附件查询
            periodAttachmentLis() {
            getAjax("attachment/queryAttachmentList", {
                moduleId:this.planId
            }).then(res => {
                if (res.data.code == 200) {
                let _this=this;
                let ourl= localStorage.getItem('url')
                res.data.data.forEach(function(item){
                    _this.periodAttachments.push({attachmentNames:item.attachmentName,attachmentIds:item.attachmentId});
                })
                console.log(this.periodAttachments)
                }
            });
            },
            //审核通过
            passPlan(){
            let passPlanId=qs.stringify({planIds:this.planId})
                let _this=this
                 postAjax("taskPlan/auditPass",passPlanId).then(res => {
                    if (res.data.code == 200) {
                    this.$message.success("已成功审核");
                    this.$router.push({ path:'/planAudit',});
                    }
                });     
            },
            //审核不通过
            notpassPlan(){
            let passPlanId=qs.stringify({planId:this.planId,planAuditResult:this.nopassTextarea})
            //     let _this=this
                 postAjax("taskPlan/auditNotPass",passPlanId).then(res => {
                    if (res.data.code == 200) {
                    this.$message.success("提交成功");
                    this.dialogVisible = false
                    this.$router.push({ path:'/planAudit',});
                    }
                });     
            },
            //关闭弹窗提示
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
    //  判断文件类型
    fileType(file, id) {
      if (file && id) {
        let i = file.lastIndexOf(".");
        if (i > -1) {
          let type = file.substring(i);
          switch (type) {
            case ".png":
            case ".jpg":
            case ".jpeg":
            case ".gif":
            case ".bmp":
              return `<img  style="width:200px;height:150px;" src="${
                this.urlImg
              }attachment/download?attachmentId=${id}">`;
              break;
            case ".xls":
            case ".xlsx":
              return '<img  src="../../../static/img/elx.png">';
              break;
            case ".doc":
            case ".docx":
              return '<img  src="../../../static/img/doc.png">';
              break;
            case ".pdf":
              return '<img src="../../../static/img/pdf.png">';
              break;
            case ".ppt":
            case ".pptx":
              return '<img src="../../../static/img/ppt.png">';
              break;
            default:
              return "";
          }
        }
      }
    },

    }
    }
</script>

<style scoped>
a,span{
    
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    display: inline-block;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
span{
    width: 130px;
    text-align: right;
}
.handle-box .firstLine a{
    width: 180px;
    margin-right: 20px;
}
.label-search{
    text-align: left;
    float: left;
    /* width: 130px; */
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.divStyle {
  margin: 10px 0;
}
.periodBox{
    width: 90%;
    border-radius: 5px;
    border:1px solid #ccc;
    padding:10px 15px;
    margin-bottom: 20px;
}
.el-icon-delete{
    position:absolute;
    right:13%;
    padding:8px;
    font-size:22px;
    color:rgba(229, 28, 35, 1);
    cursor: pointer;
}
</style>
<style>
.clearfix:after{content: "\200B";display: block;height: 0;clear: both;}
.el-textarea__inner{
    resize : none;
}
</style>

