<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 任务承办</el-breadcrumb-item>
                <el-breadcrumb-item style="text-align:left">进度审核</el-breadcrumb-item>
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
   
        <!-- 计划周期 -->
        <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">任务负责人： </label>
            <p class="p_style">{{responsiblePerson}}</p>
        </div>
        <div class="periodBox" >
           
            <div class="clearfix" style="margin-bottom:10px">
                <div style="float:left;display:block;margin-bottom:10px">
                <label class="label-search" style="width:150px;">计划周期:</label>

                   <el-select v-model="value" placeholder="请选择"  style="margin-left:15px;" @change="changePeriod">
                        <el-option
                        
                        v-for="item in periodArray"
                        :key="item.value"
                        :label="item.label?item.label:''"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </div>
         
            </div>
        </div>
            <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">完成标准： </label>
            <p class="p_style">{{periodContent}}</p>
        </div>
         <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">计划详情： </label>
            <p style="" class="p_style">{{completionCriteria}}</p>
        </div>
        <hr style="border:none;border-bottom:1px solid #ccc;margin:20px 0;">
        <div v-for="(item,index) in progressInfo" :key="index+1">
            <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">进度上报时间： </label>
            <p style="" class="p_style">{{item.reportTime}}</p>
        </div>
        <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">最新进度： </label>
            <p style="" class="p_style">{{item.progressContent}}</p>
        </div>
        <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">任务整体进度： </label>
            <p style="" class="p_style">{{item.completionPercentage}}%</p>
        </div>
        <div v-if="item.evaluationResult!=null">
             <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">考核时间： </label>
            <p style="" class="p_style">{{item.evaluationTime}}</p>
        </div>
        <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">考核意见： </label>
            <p style="" class="p_style">{{item.evaluationOpinion}}</p>
        </div>
        <div style="margin-bottom:10px">
            <label class="label-search" style="width:150px;">考核结果： </label>
                <el-radio v-model="item.evaluationResult" label="0" disabled ><i class="circle"></i></el-radio>
                <el-radio v-model="item.evaluationResult" label="1" disabled ><i class="circle" style="background-color:#FF9800"></i></el-radio>
                <el-radio v-model="item.evaluationResult" label="2" disabled ><i class="circle" style="background-color:#259B24"></i></el-radio>
            <!-- <p style="" class="p_style">{{item.evaluationResult}}</p> -->
        </div>
        <!-- <div style="margin-bottom:20px">
                <el-radio v-model="circle" label="0" disabled ><i class="circle"></i></el-radio>
                <el-radio v-model="circle" label="1" disabled ><i class="circle" style="background-color:#FF9800"></i></el-radio>
                <el-radio v-model="circle" label="2" disabled ><i class="circle" style="background-color:#259B24"></i></el-radio>
            </div> -->
        </div>
       
        <hr style="border:none;border-bottom:1px solid #ccc;margin:20px 0;">
                <div  v-if="item.evaluationResult==null">
            <div >
            <div style="margin-bottom:20px">
                <el-radio v-model="circle" label="0"><i class="circle"></i></el-radio>
                <el-radio v-model="circle" label="1"><i class="circle" style="background-color:#FF9800"></i></el-radio>
                <el-radio v-model="circle" label="2"><i class="circle" style="background-color:#259B24"></i></el-radio>
            </div>
            <div>
                <el-input
                type="textarea"
                :rows="6"
                placeholder="考核意见"
                v-model="idea"
                style="width:60%;">
                </el-input>
            </div>
        </div>
        
        <el-row style="text-align:center;margin-top:30px;width:60%">
        <el-button type="primary" @click="sendProgress(item.progressId)">提交考核</el-button>

        </el-row>
            </div>
        </div>


        <el-button type="success"  style="margin:20px 0 0 40%" @click="onReturn">返回</el-button>
    </div>
</template>

<script>
import { postAjax, getAjax, oUrl, uploadImg } from "../../../api/api.js";
import qs from "qs";
export default {
  data() {
    return {
      uploadImg: uploadImg(),
      planId: this.$route.query.planId, //获取计划id
      taskId: this.$route.query.taskId, //获取任务ID
      principal: "",
      dataTime: "",
      circle: "0",
      nopassTextarea: "", //审核不通过原因
      value: "",
      idea: "",
      periodContent: "",
      completionCriteria: "",
      urlImg: oUrl(),
      url: oUrl() + "attachment/download?attachmentId=",
      attachments: [], //任务附件
      plandetails: {
        //任务详情
        taskTypeName: "",
        taskEmphasisContent: "",
        taskDescription: "",
        reportTime: "",
        deadlineTime: "",
        evaluationMode: "",
        taskRemark: ""
      },
      progressInfo: [],

      periodArray: [] //周期详情
    };
  },
  created() {
    this.taskInfo();
    this.planInfo();

    this.planAttachmentLis();
  },

  methods: {
    taskInfo() {
      let obj = { taskId: this.taskId };
      let _this = this;
      getAjax("task/getTaskInfoById", obj).then(res => {
        if (res.data.code == 200) {
          this.plandetails.taskTypeName = res.data.data.taskTypeName;
          this.plandetails.taskEmphasisContent =
            res.data.data.taskEmphasisContent;
          this.plandetails.taskDescription = res.data.data.taskDescription;
          this.plandetails.reportTime = res.data.data.reportTime;
          this.plandetails.deadlineTime = res.data.data.deadlineTime;
          res.data.data.evaluationMode == "01"
            ? (this.plandetails.evaluationMode = "定性考核 ")
            : (this.plandetails.evaluationMode = "定量考核 ");
          this.plandetails.taskRemark = res.data.data.taskRemark;
        }
      });
    },
    //查询周期
    planInfo() {
      let planobj = qs.stringify({ planId: this.planId });
      let _this = this;
      postAjax("period/getPeriodInfoByPlanId", planobj).then(res => {
        if (res.data.code == 200) {
          let item = res.data.data;
          this.periodArray=[];
          item.forEach(function(item) {
            _this.periodArray.push({
              label: item.periodDate,
              value: item.periodId
            });
          });
          this.value = item[0].periodId;
          this.changePeriod();
        }
      });
    },
    //切换周期详情
    changePeriod() {
      console.log(this.value);
      let periodobj = qs.stringify({ periodId: this.value });
      let _this = this;
      postAjax("period/getPeriodByPeriodId", periodobj).then(res => {
        if (res.data.code == 200) {
          let item = res.data.data;
          this.periodContent = item.periodContent;
          this.completionCriteria = item.completionCriteria;
        }
        this.periodInfo();
      });
    },
    //查询计划周期进度
    periodInfo() {
      let periodId = qs.stringify({ periodId: this.value });
      let _this = this;
      postAjax("progress/getProgressInfoByPeriodId", periodId).then(res => {
        if (res.data.code == 200) {
          let item = res.data.data;
          this.progressInfo=[];
          item.forEach(function(item) {
            _this.progressInfo.push({
              reportTime: item.reportTime,
              progressContent: item.progressContent,
              completionPercentage: item.completionPercentage,
              evaluationTime: item.evaluationTime,
              evaluationOpinion: item.evaluationOpinion,
              evaluationResult: item.evaluationResult,
              progressId:item.progressId

            });
          });
        }
      });
    },
    //任务附件查询
    planAttachmentLis() {
      getAjax("attachment/queryAttachmentList", {
        moduleId: this.taskId
      }).then(res => {
        if (res.data.code == 200) {
          let _this = this;
          let ourl = localStorage.getItem("url");
          res.data.data.forEach(function(item) {
            _this.attachments.push({
              attachmentName: item.attachmentName,
              attachmentId: item.attachmentId
            });
          });
        }
      });
    },
    //提交进度审核
    sendProgress(data) {
      let content = {
        planId:  this.planId,
        progressId: data,
        methodId:'1',
        evaluationResult: this.circle,
        evaluationOpinion: this.idea
      };
      postAjax("evaluation/saveEvaluationResult", content).then(res => {
        if (res.data.code == 200) {
          this.$message.success("已成功审核");
          this.planInfo()
        }
      });
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
      onReturn(){
          this.$router.push({
              path:"progressAudit"
          })
      }
  }
};
</script>

<style scoped>
a,
span {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  display: inline-block;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
span {
  width: 130px;
  text-align: right;
}
.handle-box .firstLine a {
  width: 180px;
  margin-right: 20px;
}
.label-search {
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
.periodBox {
  width: 90%;
  border-radius: 5px;
  padding: 10px 15px 10px 0;
}
.el-icon-delete {
  position: absolute;
  right: 13%;
  padding: 8px;
  font-size: 22px;
  color: rgba(229, 28, 35, 1);
  cursor: pointer;
}
.p_style {
  display: inline-block;
  line-height: 40px;
  margin-left: 15px;
  font-size: 14px;
  height: 40px;
  color: #606266;
}
.circle {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e51c23;
  vertical-align: middle;
}
</style>
<style>
.clearfix:after {
  content: "\200B";
  display: block;
  height: 0;
  clear: both;
}
.el-textarea__inner {
  resize: none;
}
</style>

