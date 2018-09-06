<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>编辑任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
          <el-form ref="form" :model="form" label-width="120px">
                 <el-form-item label="任务分类:">
                    <el-select v-model="form.typeListId" placeholder="请选择" @change="changeTask">
                        <el-option v-for="item in form.taskType" :key="item.taskTypeId" :label="item.taskTypeName" :value="item.taskTypeId"></el-option>
                    </el-select>
                    <el-select v-model="form.typeListChildId" placeholder="请选择" v-if="form.taskTypeChild.length">
                        <el-option v-for="item in form.taskTypeChild" :key="item.taskTypeId" :label="item.taskTypeName"  :value="item.taskTypeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重点任务:">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
               <el-form-item label="任务目标:">
                    <el-input type="textarea" v-model="form.desc"  :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                </el-form-item>
                <el-form-item label="责任科室:">
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="form.sectionOption" @change="handleCheckedCitiesChange">
                            <el-checkbox style="display:inline-block;float:left;width:200px" v-for="item in form.section" :label="item.orgId"  :key="item.orgId">{{item.orgName}}</el-checkbox>
                        </el-checkbox-group>

                </el-form-item>
                <el-form-item label="是否上报计划:">
                    <el-switch on-text="" off-text="" v-model="form.delivery" @change="delivery"></el-switch>
                </el-form-item>
                  <el-form-item label="" v-show="form.showStartTime">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                 <el-form-item label="任务截止时间:">
                    <el-switch on-text="" off-text="" v-model="form.enddelivery"  @change="enddelivery"></el-switch>
                </el-form-item>
                  <el-form-item label="" v-show="form.showEndTime">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="考核方式:">
                    <el-select v-model="form.assess" placeholder="请选择考核方式">
                        <el-option label="定性考核" value="01"></el-option>
                        <el-option label="定量考核" value="00"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传附件:">
                    <el-upload
                    :action="uploadImg"
                    class="upload-demo"
                    :on-preview="handlePreview"
                    :file-list="form.fileList"
                    :on-success="uploadSuccess"
                    :on-remove="handleRemove"
                    list-type="picture"
                    :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">上传模板只能是doc、docx、PPT、pptx、xlsx、xls、pdf、jpg、png、bmp 格式!</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注说明:">
                    <el-input type="textarea" v-model="form.remark"  :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                </el-form-item>

                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="saveTask" id="save">保存</el-button>
                     <el-button type="primary" @click="saveAndappend" >保存并添加</el-button>
                    <el-button type="primary" @click="addTask" >下发</el-button>
                    <el-button type="primary" @click="addAndappend" >下发并添加</el-button>
                    <el-button type="danger" @click="returnback">取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  data: function() {
    return {
      id:this.$route.query.id,
      uploadImg: uploadImg(),
      listArray: [],
      dataArray: [],
      checkArray: [],
      checkedId: [],
      count: 1,
      taskId:'',
      checkAll: false,
      isIndeterminate: true,
      responsible:[],//查询的集合
      form: {
        taskType: [], //任务类型父
        taskTypeChild: [], //任务类型子
        typeListId: "", //任务类型父ID
        typeListChildId: "", //任务类型子ID
        name: "", //重点工作
        desc:"",
        assess: "01", //考核方式
        endTime: "", //开启时间
        startTime: "", //结束时间
        delivery: true, //是否上报计划
        enddelivery: true, //是否开启任务结束时间
        remark: "", //备注说明
        showStartTime: true, //是否显示上报开始时间
        showEndTime: true, //是否显示上报结束时间
        fileList: [], //上传图片id
        attachmentsId: [], //上传成功获取的附件id
        sectionOption: [], //选中责任科室集合
        sectionOptionId: [], //选择责任科室Id
        section: [] //科室集合
        
      }
    };
  },
  created() {
    this.getTaskType();
    this.getSection();
    this.getupdataTask();
    this.attachmentLis()
  },
  methods: {
    //获取编辑详情
      getupdataTask() {
        let _this=this;
      getAjax("task/getTaskById", {
        taskId:this.id.toString()
      }).then(res => {
        if (res.data.code == 200) {
         
          let _this=this;
          if(res.data.data.taskTypeParentId=="0"){
          this.form.typeListId=res.data.data.taskTypeId;
          this.getTaskTypeChild()
          
          }else{
         this.form.typeListId=res.data.data.taskTypeParentId
         this.getTaskTypeChild();
          this.form.typeListChildId=res.data.data.taskTypeId;
            
        
          // this.form.typeListChildId=res.data.data.taskTypeId;
          
          }
          this.taskId=res.data.data.taskId;
          this.form.sectionOption=res.data.data.responsibleOrgIds;
          this.form.startTime=res.data.data.reportTime
          this.form.endTime=res.data.data.deadlineTime
          this.form.name=res.data.data.taskEmphasisContent;
          this.form.desc=res.data.data.taskDescription;
          this.form.assess=res.data.data.evaluationMode;
          this.form.remark=res.data.data.taskRemark;
          res.data.data.isReportPlan == 1 ? this.form.delivery = true : this.form.delivery = false;
          res.data.data.isOpenTaskDeadline == 1? this.form.enddelivery = true : this.form.enddelivery = false;  
          this.delivery()
          this.enddelivery()
        }else{
           this.$message.error("请返回重试");
        }
      });
    },
    //附件查询
    attachmentLis() {
      getAjax("attachment/queryAttachmentList", {
        moduleId:this.id.toString()
      }).then(res => {
        if (res.data.code == 200) {
          let _this=this;
          let ourl= localStorage.getItem('url')
          res.data.data.forEach(function(item){
            _this.form.fileList.push({name:item.attachmentName,url:ourl+`attachment/download?attachmentId=`+item.attachmentId,attachmentId:item.attachmentId});
          })
          console.log(this.form.fileList)
        }
      });
    },
    //获取任务分类
    getTaskType() {
      getAjax("taskType/queryTaskType", {
        parentId: "0"
      }).then(res => {
        if (res.data.code == 200) {
          this.form.taskType = res.data.data;
          if (res.data.data.length) {
            // this.form.typeListId = res.data.data[0].taskTypeId;
            this.getTaskTypeChild();
          }
        }
      });
    },
    //任务主分类改变时
    changeTask() {
      this.form.typeListChildId='';
      this.getTaskTypeChild();
    },

    //获取子分类
    getTaskTypeChild() {
      getAjax("taskType/queryTaskType", {
        parentId: this.form.typeListId
      }).then(res => {
        if (res.data.code == 200) {
          this.form.taskTypeChild = res.data.data;
          if (res.data.data.length) {
            // this.form.typeListChildId = res.data.data[0].taskTypeId;
          }
        }
      });
    },
    //获取责任科室
    getSection() {
      let _this = this;
      getAjax("org/queryOrgList").then(res => {
        if (res.data.code == 200) {
          res.data.data.forEach(item => {
            _this.form.section.push({
              orgName: item.orgName,
              orgId: item.orgId
            });
          });
        }
      });
    },

    //是否上报计划
    delivery() {
      if (this.form.delivery == true) {
        this.form.showStartTime = true;
      } else {
        this.form.showStartTime = false;
      }
    },

    enddelivery() {
      if (this.form.enddelivery == true) {
        this.form.showEndTime = true;
      } else {
        this.form.showEndTime = false;
      }
    },
    //全选
    handleCheckAllChange(val) {
      var _this=this;
      this.form.sectionOption=[];
      if(val){
      this.form.section.forEach(function(res){
          _this.form.sectionOption.push(res.orgId);
      })
      }
      this.isIndeterminate = false;
    },
    //单选
    handleCheckedCitiesChange(value) {
       console.log(this.form.sectionOption);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.form.section.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.form.section.length;
    },
    //附件上传成功的返回值
    uploadSuccess(response, file, fileList) {
      console.log(file);
      this.form.attachmentsId.push(response.data.attachmentId);
    },
    //上传附件删除提示
    //  beforeRemove(file, fileList) {
    //     return this.$confirm(`确定移除 ${ file.name }？`);
    //  },
    //上传附件删除
    handleRemove(file, fileList) {
      getAjax("attachment/delete", {
        attachmentId: file.attachmentId
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({ type: "success", message: "删除成功!" });
        }
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    //上传附件限制格式
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
    //保存任务
    saveTask() {
      let _this = this;
      // this.form.sectionOption.forEach(item => {
      //   _this.form.sectionOptionId.push(item.orgId);
      // });
      // console.log(this.form.sectionOptionId);
      this.form.delivery == true
        ? (this.form.delivery = 1)
        : (this.form.delivery = 0);
      this.form.enddelivery == true
        ? (this.form.enddelivery = 1)
        : (this.form.enddelivery = 0);
      var savedataObj = {
        taskTypeId:
          this.form.typeListChildId != ""
            ? this.form.typeListChildId
            : this.form.typeListId,
        taskId:this.taskId,
        taskEmphasisContent: this.form.name,
        taskDescription: this.form.desc,
        responsibleOrgIds: this.form.sectionOption.toString(),
        isReportPlan: this.form.delivery,
        reportTime: this.form.startTime,
        isOpenTaskDeadline: this.form.delivery,
        deadlineTime: this.form.endTime,
        evaluationMode: this.form.assess,
        taskRemark: this.form.remark,
        attachmentIds: this.form.attachmentsId.toString(),
        planState: "00"
      };
      postAjax("/task/saveTask", savedataObj).then(res => {
        if (res.data.code == 200) {
          this.$message({ type: "success", message: "保存成功!" });
          this.$router.push({ path:'/allAssign',});
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    //保存并添加
    saveAndappend() {
      let _this = this;
      // this.form.sectionOption.forEach(item => {
      //   _this.form.sectionOptionId.push(item.orgId);
      // });
      this.form.showStartTime = false;
      this.form.delivery == true
        ? (this.form.delivery = 1)
        : (this.form.delivery = 0);
      this.form.enddelivery == true
        ? (this.form.enddelivery = 1)
        : (this.form.enddelivery = 0);
      var savedataObj = {
        taskTypeId:
          this.form.typeListChildId != ""
            ? this.form.typeListChildId
            : this.form.typeListId,
            taskId:this.taskId,
        taskEmphasisContent: this.form.name,
        taskDescription: this.form.desc,
        responsibleOrgIds: this.form.sectionOption.toString(),
        isReportPlan: this.form.delivery,
        reportTime: this.form.startTime,
        isOpenTaskDeadline: this.form.delivery,
        deadlineTime: this.form.endTime,
        evaluationMode: this.form.assess,
        taskRemark: this.form.remark,
        attachmentIds: this.form.attachmentsId.toString(),
        planState: "00"
      };
      postAjax("/task/saveTask", savedataObj).then(res => {
        if (res.data.code == 200) {
          this.$message({ type: "success", message: "保存成功!" });
          this.form.name = "";
          this.form.desc = "";
          this.form.startTime = "";
          this.form.endTime = "";
          this.form.assess = "00";
          this.form.remark = "";
          this.form.fileList = [];
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    //下发任务
    addTask() {
      let _this = this;
      // this.form.sectionOption.forEach(item => {
      //   _this.form.sectionOptionId.push(item.orgId);
      // });
      // this.form.showStartTime = false;
      this.form.delivery == true
        ? (this.form.delivery = 1)
        : (this.form.delivery = 0);
      this.form.enddelivery == true
        ? (this.form.enddelivery = 1)
        : (this.form.enddelivery = 0);
      var adddataObj = {
        taskTypeId:
          this.form.typeListChildId != ""
            ? this.form.typeListChildId
            : this.form.typeListId,
            taskId:this.taskId,
        taskEmphasisContent: this.form.name,
        taskDescription: this.form.desc,
        responsibleOrgIds: this.form.sectionOption.toString(),
        isReportPlan: this.form.delivery,
        reportTime: this.form.startTime,
        isOpenTaskDeadline: this.form.delivery,
        deadlineTime: this.form.endTime,
        evaluationMode: this.form.assess,
        taskRemark: this.form.remark,
        attachmentIds: this.form.attachmentsId.toString(),
        planState: "01"
      };
      postAjax("/task/saveTask", adddataObj).then(res => {
        if (res.data.code == 200) {
          this.$message({ type: "success", message: "下发任务成功!" });
          this.$router.push({ path:'/allAssign',});
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    //下发并添加
    addAndappend() {
        let _this = this;
      // this.form.sectionOption.forEach(item => {
      //   _this.form.sectionOptionId.push(item.orgId);
      // });
      this.form.showStartTime = false;
      this.form.delivery == true
        ? (this.form.delivery = 1)
        : (this.form.delivery = 0);
      this.form.enddelivery == true
        ? (this.form.enddelivery = 1)
        : (this.form.enddelivery = 0);
      var savedataObj = {
        taskTypeId:
          this.form.typeListChildId != ""
            ? this.form.typeListChildId
            : this.form.typeListId,
            taskId:this.taskId,
        taskEmphasisContent: this.form.name,
        taskDescription: this.form.desc,
        responsibleOrgIds: this.form.sectionOption.toString(),
        isReportPlan: this.form.delivery,
        reportTime: this.form.startTime,
        isOpenTaskDeadline: this.form.delivery,
        deadlineTime: this.form.endTime,
        evaluationMode: this.form.assess,
        taskRemark: this.form.remark,
        attachmentIds: this.form.attachmentsId.toString(),
        planState: "01"
      };
      postAjax("/task/saveTask", savedataObj).then(res => {
        if (res.data.code == 200) {
          this.$message({ type: "success", message: "下发任务成功!" });
          this.form.name = "";
          this.form.desc = "";
          this.form.startTime = "";
          this.form.endTime = "";
          this.form.assess = "00";
          this.form.remark = "";
          this.form.fileList = [];
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    //取消任务
    returnback() {
      this.$confirm("此操作将取消当前操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取消成功"
          });
          this.$router.push({ path: "/taskManage" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "撤销取消"
          });
        });
    }
  }
};
</script>
<style>
.form-box {
  width: 900px;
}
.el-checkbox-group .el-checkbox:first-child{
  margin-left: 30px;
}
</style>
