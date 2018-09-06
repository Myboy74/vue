<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 任务承办</el-breadcrumb-item>
                <el-breadcrumb-item style="text-align:left">上报计划</el-breadcrumb-item>
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


            <div><span>备注：</span><a>{{plandetails.taskRemark}}</a></div>
        </div>
        <hr style="border:none;border-bottom:1px solid #ccc;margin:20px 0;">
        <div class="clearfix" style="margin-bottom:10px;">
            <label class="label-search">任务总负责人:</label>
            <el-input v-model="principal" placeholder="请输入负责人姓名" @change="changeAll" style="width:200px;float:left"></el-input>
        </div>
        <!-- 计划周期 -->
        <div class="periodBox" :key="index" v-for="(elem,index) in periodArray">
            <i class="el-icon-delete" @click="planDelete(index)" v-if="periodArray.length!=1"></i>
           
            <div class="clearfix" style="margin-bottom:10px;">
                <div style="float:left">
                <label class="label-search">计划周期:</label>
                <el-date-picker style="margin-left:10px"
                v-model="elem.dataTime"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="timeList(index)">
                </el-date-picker>
            </div>
            
            <div style="float:left">
                <label class="label-search">计划负责人:</label>
                <el-input v-model="elem.responsiblePerson" placeholder="请输入负责人姓名" style="width:200px;float:left"></el-input>
            </div>
               
            </div>
             <el-input type="textarea" v-model="elem.completionCriteria" :autosize="{ minRows: 3, maxRows: 4}" style="width:100%;display:inline-block;margin-bottom:10px" placeholder="请输入完成标准！"></el-input>
            <el-input type="textarea" v-model="elem.periodContent" :autosize="{ minRows: 5, maxRows: 6}" style="width:100%"  placeholder="请输入计划详情！"></el-input>
           
        </div>
         <div class="divStyle" style="text-align:center" >
            <el-button type="primary" icon="el-icon-plus" @click="addPlan">新增计划</el-button>
        </div>
        <div>
            <label class="label-search" style="width:80px;">上传附件 </label>
            <el-upload
            class="upload-demo"
            :action="uploadImg"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :onSuccess="uploadSuccess"
            :onError="uploadError"
            :before-upload="beforeAvatarUpload"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传模板只能是doc、docx、PPT、pptx、xlsx、xls、pdf、jpg、png、bmp 格式!</div>
            </el-upload>
        </div>
        <div style="margin-top:10px;" v-if="data.planState=='03'">
            <label class="label-search" style="text-align:left">未通过原因:</label>
            <p style="font-size: 14px;color: #606266;line-height: 40px;">{{auditResult}}</p>
        </div>
           
        <el-row style="text-align:center;margin-top:30px;">
        <el-button type="primary" @click="saveTaskPlan" v-if="data.planState=='01'">提交计划</el-button>
        <el-button type="primary" @click="saveTaskPlan" v-if="data.planState=='03'">修改计划</el-button>
        <el-button type="danger" @clcik="onReturn">返回</el-button>
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
            planId:this.$route.params.id,
            taskId:this.$route.params.taskId,
            data:this.$route.params.data,
            principal:'',
            dataTime:'',
            urlImg:oUrl(),
             url:oUrl()+'attachment/download?attachmentId=',
            fileList:[],
            auditResult:'',//未通过原因
            attachmentsId:[],
            attachments:[],
            plandetails:{
                taskTypeName:'',
                taskEmphasisContent:'',
                taskDescription:'',
                reportTime:'',
                deadlineTime:'',
                evaluationMode:'',
                taskRemark:'',

            },
            periodArray:[{
                periodContent: "",
                dataTime: [],
                periodBeginTime: "",
                periodEndTime: "",
                responsiblePerson:"",
                planId:this.$route.params.id,
            }],
            }
        },
        created(){
           this.taskInfo();
           this.attachmentLis()
           this.periodInfo()
           this.planInfo()
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
                //附件查询
                attachmentLis() {
                getAjax("attachment/queryAttachmentList", {
                    moduleId:this.taskId
                }).then(res => {
                    if (res.data.code == 200) {
                    let _this=this;
                    let ourl= localStorage.getItem('url')
                    res.data.data.forEach(function(item){
                        _this.attachments.push({attachmentName:item.attachmentName,attachmentId:item.attachmentId});
                    })
                    console.log(this.attachments)
                    }
                });
                },

            //计划周期查询
             periodInfo(){
                let planobj=qs.stringify({planId:this.planId})
                let _this=this
                 postAjax("period/getPeriodInfoByPlanId",planobj).then(res => {
                    if (res.data.code == 200) {
                        if(this.data.planState=="03"){
                            let item=res.data.data;
                            this.periodArray=[];
                            item.forEach(function(item){
                            let time=[];
                            time.push(item.periodBeginTime);
                            time.push(item.periodEndTime);
                            console.log(time)
                            _this.periodArray.push({
                                periodBeginTime:item.periodBeginTime,
                                periodEndTime:item.periodEndTime,
                                responsiblePerson:item.responsiblePerson,
                                completionCriteria:item.completionCriteria,
                                periodContent:item.periodContent,
                                dataTime:time,
                            })
                        })

                        }
                        
                    }
                });
            },
             planInfo(){
                let periodobj=qs.stringify({planId:this.planId})
                let _this=this
                 postAjax("taskPlan/getTaskPlanInfoById",periodobj).then(res => {
                    if (res.data.code == 200) {
                        if(this.data.planState=="03"){
                        let item=res.data.data;
                        this.principal=item.responsiblePerson;
                        this.auditResult=item.auditResult
                        }
                    }
                });
            },
            periodAttachmentLis() {
            getAjax("attachment/queryAttachmentList", {
                moduleId:this.planId.toString()
            }).then(res => {
                if (res.data.code == 200&&this.data.planState=="03") {
                let _this=this;
                let ourl= localStorage.getItem('url')
                res.data.data.forEach(function(item){
                    _this.fileList.push({name:item.attachmentName,url:ourl+`attachment/download?attachmentId=`+item.attachmentId,attachmentId:item.attachmentId});
                })
                }
            });
            },
            //改变任务负责人
            changeAll(){
                this.periodArray[0].responsiblePerson=this.principal;
            },
         //提交计划时间拆分
            timeList(index) {
            this.periodArray[index].periodBeginTime = this.periodArray[index].dataTime[0];
            this.periodArray[index].periodEndTime = this.periodArray[index].dataTime[1];
            },
            //删除计划
            planDelete(index){
            this.periodArray.splice(index,1);
            },
            //新增计划
            addPlan() {
            this.periodArray.push({
                periodContent: "",
                completionCriteria:'',
                dataTime: [],
                periodBeginTime: "",
                periodEndTime: "",
                responsiblePerson: this.principal,
                planId:this.planInd,
            });
        },
    //上报计划

saveTaskPlan() {

    var _this=this;
    var returnBack=true;
     this.periodArray.forEach(item => {
         
  
         console.log(item.dataTime)
         if(item.dataTime.length==0){
             this.$message.error("请选择周期时间");
            //  debugger;
             return returnBack=false;
         }else{
            delete item.dataTime;
            
         }
       if(item.completionCriteria.length>1000){
             this.$message.error("完成标准不超出1000字符！");
             return false
         }
         if(item.periodContent.length>1000){
             this.$message.error("计划详情不超出1000字符！");
             return false
         }
         item.planId=_this.planId;
         
     });
     if(!returnBack){
         return
     }
    //  debugger;
      var data = {
          planId: this.planId,
          responsiblePerson: this.principal,
          periods: this.periodArray,
          attachmentIds: this.attachmentsId.toString()
        };
        postAjax("taskPlan/savePlan", data).then(res => {
          if (res.data.code == 200) {
            this.$message({ type: "success", message: "保存成功!" });
            this.$router.push({ path:'/planList',});
          } else {
            // this.$message.error("服务器错误");
          }
        })
},
            //附件上传成功的返回值
    uploadSuccess(response, file, fileList) {
      this.attachmentsId.push(response.data.attachmentId);
      console.log(this.attachmentsId)
    },
    //上传附件删除
    handleRemove(file, fileList) {
      console.log(file);
      getAjax("attachment/delete", {
        attachmentId: file.attachmentId
      }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    //附件上传失败的返回值
    uploadError(err, file, fileList) {},
    handlePreview(file) {
      console.log(file);
    },
    //  判断文件类型
    fileType(file, attachmentId) {
      if (file && attachmentId) {
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
              }attachment/download?attachmentId=${attachmentId}">`;
              break;
            case ".xls":
            case ".xlsx":
              return '<img style="width:40%"  src="../../../static/img/elx.png">';
              break;
            case ".doc":
            case ".docx":
              return '<img style="width:40%" src="../../../static/img/doc.png">';
              break;
            case ".pdf":
              return '<img style="width:40%" src="../../../static/img/pdf.png">';
              break;
            case ".ppt":
            case ".pptx":
              return '<img style="width:40%" src="../../../static/img/ppt.png">';
              break;
            default:
              return "";
          }
        }
      }
    },
        //上传附件限制
    beforeAvatarUpload(file) {
         var flag = false; //状态
                var arr = ["jpg","png","gif","doc","docx","ppt","pptx","xls","xlsx","pdf","txt"];
                //取出上传文件的扩展名
                var index = file.name.lastIndexOf(".");
                var ext = file.name.substr(index+1);
                //循环比较
                for(var i=0;i<arr.length;i++) {
                    if(ext == arr[i]) {
                        flag = true; //一旦找到合适的，立即退出循环
                        break;
                    }
                }
                var fileSize=file.size  / 1024 / 1024 < 50;
                //条件判断
                if (!fileSize) {
                    this.$message.error('上传附件大小不能超过 50MB!');
                    return false;
                }
                if(!flag) {
                    this.$message.error('文件只能上传  jpg , png , gif , doc ,' +
                        'docx , ppt , pptx , xls , xlsx , pdf , txt 格式');
                    return false;
                }
    },
            onReturn(){
                this.$router.push({
                    path:"planList"
                })
            }

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
    text-align: right;
    float: left;
    width: 130px;
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
img{
    width:40%
}
.periodBox{
    width: 90%;
    border-radius: 5px;
    background-color: #ccc;
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

