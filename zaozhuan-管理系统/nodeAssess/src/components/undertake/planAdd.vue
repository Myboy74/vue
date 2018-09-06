<template>
  <div class="y_list">
    <searchList @searchEvent="searchEvent" :my="true" ></searchList>
    <list :ySearch="searchList" :my="true"   ref="listFun"  @infoEvent="infoEvent" @shangbaoEvent="shangbaoEvent " @updateEvent="updateEvent"></list>
    <info :yInfo="select" v-if="select.infoModel"></info>
    <el-dialog
  title="上报计划"
  :visible.sync="centerDialogVisible"
  width="70%"
  center
  top="4vh">
   <div style="max-height:570px;overflow-y: auto; padding-right: 10px;" >
      <el-form >
        <el-form-item label="任务分类：" class="y_text_left" >
          <div>{{info.taskTypeName}}</div>
        </el-form-item>
        <el-form-item label="任务主题：" class="y_text_left" >
          <div>{{info.taskTitle}}</div>
        </el-form-item>
        <el-form-item label="责任单位：" class="y_text_left">
          <div>{{infoPlan.responsibleOrganizationName}}</div>
        </el-form-item>
        <el-col :span="24">
          <template>
            <el-col :span="12">
              <el-form-item label="下发日期：" class="y_text_left">
                <div>{{infoPlan.useTime}}</div>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="12">
            <el-form-item label="完成时限：" class="y_text_left">
              <div>{{info.missionDeadline}}</div>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item label="任务描述：" class="y_text_left y_ms" >
            <div>{{info.taskTarget}}
            </div>
          </el-form-item>
        </el-col>
        <el-form-item label="任务附件资料：" class="y_text_left">
          <div v-if="attachments.length">暂无</div>
        </el-form-item>
        <el-form-item  v-if="attachments.length">
          <div class="y_img" v-for="item in attachments" :key="item.id">
            <div class="y_img" v-html="fileType(item.attachmentName,item.id)"></div>
            <div class="y_down"><a :href="url+item.id">下载</a></div>
          </div>
        </el-form-item>
        <el-form-item label="备注：" class="y_text_left y_ms_xs" >
          <div>{{info.remark}}</div>
        </el-form-item>
        <h3>上报计划</h3>
         <div class="divStyle preson">
              <label>分管负责人:</label>
                <el-select v-model="fenguanId"  placeholder="请选择" style="width:130px" @change="changePreson">
                  <el-option
                  v-for="item in fenguanArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                  </el-option>
              </el-select>
              <label>责任科室:</label>
                <el-select v-model="zerenId"  placeholder="请选择" style="width:120px" @change="changezeren">
                  <el-option
                  v-for="item in zerenArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                  </el-option>
              </el-select>
              <label style="margin-left:10px;">科室负责人:</label>
                <el-select v-model="fuzerenId" placeholder="请选择" style="width:120px" @change="changefuzeren">
                <el-option
                  v-for="item in fuzerenArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
               <label style="margin-left:10px;">具体负责人:</label>
                <el-select v-model="jutiId" placeholder="请选择" style="width:120px" @change="changejuti">
                    <el-option
                    v-for="item in jutifuzerenArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
          </div>
                    <!-- 计划周期 -->
                  <div class="c_contentBox" style="margin-bottom:10px;position:relative"  :key="index" v-for="(elem,index) in newArray">
                    <el-button type="danger" @click="planDelete(index)" style="position:absolute;right:10px;padding:8px" icon="el-icon-delete" circle></el-button>
                    <div style="margin-bottom:10px;">
                        <label>计划周期:</label>
                        <el-date-picker style="margin-left:10px"
                        v-model="elem.dataTime"
                        type="datetimerange"
                        range-separator="至"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="timeList(index)">
                        </el-date-picker>
                    </div>
                    <el-input type="textarea" v-model="elem.periodContent" :autosize="{ minRows: 4, maxRows: 6}" style="width:100%"></el-input>
                    <div class="divStyle preson" >
                    <label>分管负责人:</label>
                      <el-select v-model="elem.responsiblePerson" placeholder="请选择" style="width:130px">
                        <el-option
                        v-for="item in fenguanArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                      <label style="margin-left:10px;">责任科室:</label>
                        <el-select v-model="elem.responsibleOfficeId " placeholder="选择科室" style="width:120px">
                        <el-option
                        v-for="item in zerenArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <label style="margin-left:10px;">科室负责人:</label>
                      <el-select v-model="elem.responsibleOfficePerson" placeholder="请选择" style="width:120px">
                        <el-option
                        v-for="item in fuzerenArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <label style="margin-left:10px;">具体负责人:</label>
                    <el-select v-model="elem.person" placeholder="请选择" style="width:120px">
                        <el-option
                        v-for="item in jutifuzerenArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                </div>
                <div class="divStyle" style="text-align:center" >
                    <el-button type="info" icon="el-icon-plus" @click="addPlan">新增计划</el-button>
                </div>
                <el-form-item label="上传附件:">
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
            </el-form-item>
           
            <label style="display:inline-blocck;height:50px;line-height:50px;">备注：</label>
            <el-input type="textarea" v-model=" planContent" :autosize="{ minRows: 4, maxRows: 6}" style="width:100%"></el-input>
             <div v-show="spare">
              <label style="display:inline-blocck;height:50px;line-height:50px;">未通过原因：</label>
              <p style="border:1px solid #ccc;height:100px;padding:5px 15px;border-radius:5px;">{{spare2}}</p>
            </div>
            <div style="text-align:center;margin-top:10px;">
                <el-button type="primary"     @click="saveTaskPlan">提交计划</el-button>
            </div>
      </el-form>
        </div>
</el-dialog>
  </div>
</template>

<script>
import { postA, getA, oUrl, uploadImg } from "../../api/api.js";
import Schart from "vue-schart";
import searchList from "../common/search";
import list from "../common/list";
import info from "../common/info";
import qs from "qs";
export default {
  components: {
    Schart,
    list,
    info,
    searchList,
  },

  data() {
    return {
      select: {
        planId: "", //点击详情时选择的计划id
        taskId: "", //点击详情时选择的任务id
        infoModel: false, //详情弹窗
        newInfo: false //是否为新进展
      },
      uploadImg: uploadImg(),
      planContent: "", //备注
      fenguanId: "",
      zerenId:"",
      fuzerenId:"",
      jutiId:"",
      newArray:[{}],
      jihuaId:'',
      orgId: "",
      fileList: [],
      ramark: "",
      spare2:'',
      spare:false,
      attachmentsId: [], //上传附件的ID
      fenguanArray: [],
      zerenArray:[],
      fuzerenArray:[],
      jutifuzerenArray:[],
      searchList: {
        type: "", //任务类型
        typeChild: "", //任务子类型
        status: "01", // 任务状态   ''全部任务 00任务未下发 01计划未上报 02计划待审核 03计划未通过 04计划进行中 05任务已完成
        company: "", //单位
        time: "", //任务时间
        text: "" //关键字
      },
      //详情yyyyyyyyyyyyy
      data1: [], //图表数据
      options1: {
        title: "总体完成量",
        bgColor: "#607d8b",
        titleColor: "#ffffff",
        fillColor: "#e0f2f1",
        axisColor: "#ffffff",
        contentColor: "#999"
      },
      urlImg: oUrl(),
      url: oUrl() + "oa_attachment/download_attachment?id=",

      auditText: "", //审核说明

      info: {}, //详情内容
      infoPlan: {},
      attachments: {},
      newCycle: [], //最新周期
      allCycle: [], //全部周期
      markCycle: false, //周期显示标记 true：最新   false：全部
      selectId: [], //列表选中的id
      selectRow: [],
      del_list: [],
      is_search: false,
      innerVisible: false,
      centerDialogVisible: false
    };
  },
  created() {
    this.selectLists()
  },
  methods: {
    //点击搜索
    searchEvent(...data) {
      this.searchList.type = data[0].type;
      this.searchList.typeChild = data[0].typeChild;
      this.searchList.status = data[0].status;
      this.searchList.company = data[0].company;
      this.searchList.text = data[0].text;
      this.$refs.listFun.search();
    },
    //点击标题
    infoEvent(taskid,palnid){
      this.select.planId=palnid;
      this.select.taskId=taskid;
      this.select.infoModel=true;
    },
    shangbaoEvent(taskId, planId) {
      this.centerDialogVisible = true;
      this.taskId = taskId;
      this.planId = planId;
      this.getInfo(taskId, planId);
    },
    updateEvent(taskId, planId) {
      this.centerDialogVisible = true;
      this.taskId = taskId;
      this.planId = planId;
      this.getInfo(taskId, planId);

    },
    //获取详情 1
    getInfo(taskId, planId) {

      var _this = this;
      // _this.select.planId=planId;
      getA("oa_task_plan/fetchTaskById", {
        taskId: taskId,
        planId: planId
      }).then(res => {
        if (res.data.code == 200) {
          this.fenguanId="";
          this.info = res.data.data;
          this.infoPlan = res.data.data.taskPlanVOS[0];
          this.orgId = res.data.data.taskPlanVOS[0].responsibleOrganizationId;
          this.attachments = res.data.data.attachments;
           this.jihuaId = res.data.data.taskPlanVOS[0].id;
          this.marklist();
          var _this=this;
         if(res.data.data.taskPlanVOS[0].planState=="03"){
           this.spare=true,
          this.newArray=[],
          this.fenguanId= res.data.data.taskPlanVOS[0].responsibleOrganizationPerson,
          this.planContent= res.data.data.remark ,
          this.attachmentsId =res.data.data.attachments,
          this.spare2=res.data.data.taskPlanVOS[0].spare2,
              this.fileList=[];
              this.attachmentsId=[];
              res.data.data.attachments.forEach(function(res){
                _this.attachmentsId.push(res.id)
                 _this.fileList.push({name:res.attachmentName,url:`${uploadImg}?id=${res.id}`,id:res.id})
              });
          res.data.data.taskPlanVOS[0].periodVOS.forEach(function(res){
                var time=[];
                time.push(res.periodBeginTime);
                 time.push(res.periodEndTime);
                 _this.newArray.push({periodContent:res.periodContent,periodBeginTime:res.periodBeginTime,periodEndTime:res.periodEndTime,dataTime:time, responsiblePerson:res.ResponsiblePresonId,responsibleOfficeId:res.responsibleOfficeId,responsibleOfficePerson:res.responsibleOfficePerson,person:res.person,planId:res.planId})

            })
         }else if(res.data.data.taskPlanVOS[0].planState=="01"){
                this.spare=false,
                 this.newArray= [
              {
                periodContent: "",
                dataTime: [],
                periodBeginTime: "",
                periodEndTime: "",
                responsiblePerson: "",
                responsibleOfficeId:"",
                responsibleOfficePerson:"",
                person:"",
                planId:'',
              }
            ],
            this.fileList=[];
            this.attachmentsId=[];
            this.planContent='';
            this.newArray[0].responsiblePerson="";
            this.newArray[0].responsibleOfficeId="";
            this.newArray[0].responsibleOfficePerson="";
            this.newArray[0].person="";
            // this.newArray[0].planId=planId;
            this.newArray.forEach(function(res){
              res.planId=planId
            })
          
          // this.select.status = res.data.data.taskPlanVOS[0].planState;
          
          var obj = res.data.data.taskPlanVOS[0].periodVOS; //全部周期
          _this.newCycle = []; //最新周期
          _this.allCycle = obj;
          if (obj.length) {
            obj.forEach(function(item) {
              if (item.progressVOS.length) {
                if (item.progressVOS[0].progressState == "0") {
                  _this.newCycle.push(item);
                }
              }
            });
          }
          this.infoModel = true;
        }
         }
          else {
          this.$message.error("服务器错误，请重试");
        }
      });
      this.getEchart(planId);
    },
    edit() {
      this.$router.push({
        name: "editTask",
        params: {
          id: this.selectId.toString()
        }
      });
    },
    //分管负责人
    marklist() {
      getA("oa_person/query_person_all", {
        organizationId: this.orgId
      }).then(res => {
        if (res.data.code == 200) {
          //   console.log(res)
          var _this = this;
          this.fenguanArray = [];
          if(res.data.data.length){
          res.data.data.forEach(function(res) {
            _this.fenguanArray.push({ value: res.id, label: res.name });
          });
          this.fenguanId = res.data.data[0].id;
          this.newArray.forEach(function(item) {
            item.responsiblePerson = res.data.data[0].id;
          });
          this.selectLists()
          }
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
        //获取责任科室
    selectLists() {
      getA("oa_org/query_org", {
        parentId: this.orgId,
        rganizationType: "k"
      }).then(res => {
        if (res.data.code == 200) {
          var _this = this;
            this.zerenArray=[];
          res.data.data.forEach(function(res) {
            _this.zerenArray.push({ value: res.id, label: res.label });
          });
          this.zerenId = res.data.data[0].id;
          this.newArray.forEach(function(item) {
            item.responsibleOfficeId = res.data.data[0].id;
            // console.log(item)
          });
          // this.newArray[0].responsibleOfficeId = res.data.data[0].id;
          this.sectionList();
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    // 科室发生改变
    changezeren(){
        var _this = this
        this.newArray.forEach(function(item) {
        item.responsibleOfficeId = _this.zerenId;
      });
    },
    changefuzeren(){
        var _this = this
        this.newArray.forEach(function(item) {
        item.responsibleOfficePerson = _this.fuzerenId;
      });
    },
    changejuti(){
        var _this = this
        this.newArray.forEach(function(item) {
        item.person = _this.jutiId;
      });
    },
    // deskWork(){
    //     // console.log( this.checkPreson)
    //     this.sectionList()
    // },
    //获取科室负责人
    sectionList() {
      getA("oa_person/query_person", { organizationId: this.zerenId }).then(
        res => {
          if (res.data.code == 200) {
            var _this = this;
              this.fuzerenArray=[];
              this.jutifuzerenArray=[];
            res.data.data.forEach(function(res) {
                console.log(res)
              _this.fuzerenArray.push({ value: res.id, label: res.name });
              _this.jutifuzerenArray.push({ value: res.id, label: res.name });
            });
            this.fuzerenId = res.data.data[0].id;
            this.jutiId = res.data.data[0].id;
            this.newArray.forEach(function(item) {
            item.responsibleOfficePerson = res.data.data[0].id;
            item.person = res.data.data[0].id;
          });
          }else{
           this.$message.error('服务器错误');
        }
        }
      );
    },
    //分管负责人改变
    changePreson() {
      var _this = this;
      this.newArray.forEach(function(item) {
        item.responsiblePerson = _this.fenguanId;
      });
    },
    //提交计划时间拆分
    timeList(index) {
      this.newArray[index].periodBeginTime = this.newArray[index].dataTime[0];
      this.newArray[index].periodEndTime = this.newArray[index].dataTime[1];
    },
    //新增计划
    addPlan() {
      this.newArray.push({
        periodContent: "",
        dataTime: [],
        periodBeginTime: "",
        periodEndTime: "",
        responsiblePerson: "",
        responsibleOfficeId:"",
        responsibleOfficePerson:"",
        person:"",
        planId:this.planId,
      });
      var  _this=this;
      this.newArray.forEach(function(item) {
        item.responsiblePerson = _this.fenguanId ;
        item.responsibleOfficeId = _this.zerenId ;
        item.responsibleOfficePerson = _this.fuzerenId ;
        item.person = _this.jutiId ;
      });
    },
    //附件上传成功的返回值
    uploadSuccess(response, file, fileList) {
      this.attachmentsId.push(response.data.id);
    },
    //上传附件删除
    handleRemove(file, fileList) {
      console.log(file);
      getA("oa_attachment/delete_attachment", {
        id: file.response.data.id
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
    //提交计划
    saveTaskPlan() {
      var _this= this;
      let kai=true;
      this.newArray.forEach((item) => {
        delete item.dataTime;
        if(!item.periodContent){
          _this.$message.error("计划周期内容不能为空！");
          kai=false;
          return false;
        }
        if(item.periodContent.length>200){
          _this.$message.error("计划周期内容字符不能超过200！");
          kai=false;
          return false;
        }
        if(!item.periodBeginTime){
          _this.$message.error("计划开始时间不能为空！");
          kai=false;
          return false;
        }
        if(!item.periodEndTime){
          _this.$message.error("计划结束时间不能为空！");
          kai=false;
          return false;
        }
        
      });
      if(kai){ 
        if(this.planContent.length>200){
          _this.$message.error("备注内容字符不能超过200！");
          kai=false;
          return false;
        }
        var data = {
          id: this.jihuaId,
          responsibleOrganizationPerson: this.fenguanId,
          periodDTOS: this.newArray,
          planContent: this.planContent,
          attachments: this.attachmentsId.toString()
        };

        postA("oa_task_plan/report_task_plan", data).then(res => {
          if (res.data.code == 200) {
            this.$message({ type: "success", message: "保存成功!" });
            this.centerDialogVisible = false;
            this.$router.push({ path:'/myTask',});
          } else {
            this.$message.error("服务器错误");
          }
        });
      }
    },
    //点击完成任务 1
    finishList() {
      let obj = qs.stringify({
        ids: this.selectId.toString(),
        planState: "05"
      });
      postA("oa_task_plan/end_task_plan", obj).then(res => {
        if (res.data.code == 200) {
          this.$message({ type: "success", message: "操作成功!" });
          this.getList();
          this.getInfo(taskId, planId);
        } else {
          this.$message.error("操作失败，请重试");
        }
      });
    },
    //删除计划
    planDelete(index){
      this.newArray.splice(index,1);
      console.log(this.newArray)
    },
    //checked 复选框改变
    handleSelectionChange(val) {
      var _this = this;
      _this.selectId = [];
      _this.selectRow = val;
      // console.log(val)
      val.forEach(function(item) {
        _this.selectId.push(item.id);
        // _this.planId.push(item.id);
      });
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
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
              return `<img  src="${
                this.urlImg
              }oa_attachment/download_attachment?id=${id}">`;
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
    //  获取详情图表
    getEchart(id) {
      getA("oa_task_plan/queryPeriodLastPercentage", { planId: id }).then(
        res => {
          if (res.data.code == 200) {
            var _this = this;
            _this.data1 = [];
            for (var i = 0; i < res.data.data.length; i++) {
              _this.data1.push({
                name: i + 1,
                value: res.data.data[i].lastPercentage
              });
            }
            console.log(_this.data1);
          }
        }
      );
    },
    beforeAvatarUpload(file) {
        const isLt50M = file.size / 1024 / 1024 < 50;

        const extension = file.name.split(".")[1] === "xls";
        const extension2 = file.name.split(".")[1] === "xlsx";
        const extension3 = file.name.split(".")[1] === "doc";
        const extension4 = file.name.split(".")[1] === "docx";
        const extension5 = file.name.split(".")[1] === "pdf";
        const extension6 = file.name.split(".")[1] === "ppt";
        const extension7 = file.name.split(".")[1] === "pptx";
        const extension8 = file.name.split(".")[1] === "jpg";
        const extension9 = file.name.split(".")[1] === "jpeg";
        const extension10 = file.name.split(".")[1] === "png";
        const extension11 = file.name.split(".")[1] === "bmp";
         console.log(extension)
        if (!isLt50M) {
          this.$message.error('上传附件大小不能超过 50MB!');
        }
        else if (
            !extension &&
            !extension2 &&
            !extension3 &&
            !extension4 &&
            !extension5 &&
            !extension6 &&
            !extension7 &&
            !extension8 &&
            !extension9 &&
            !extension10&&
            !extension11
        ) {
            this.$message.error(
                "上传模板只能是doc、docx、PPT、pptx、xlsx、xls、pdf、jpg、jpeg、png、bmp 格式!"
            );
        }

        return (
            extension ||
            extension2 ||
            extension3 ||
            extension4 ||
            extension5 ||
            extension6 ||
            extension7 ||
            extension8 ||
            extension9 ||
            extension10||
            extension11&&
             isLt50M
        );
    }


  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.el-dialog__body {
  padding-top: 10px;
}
.box-card {
  margin-bottom: 10px;
}
.box-card > div {
  padding: 10px 20px !important;
}
.y_card_footer span {
  display: inline-block;
  width: 24%;
}
.y_color_red {
  color: #f56c6c;
}
.y_card_main {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  padding: 15px 20px;
  margin: 8px -20px;
}

.el-dialog__body > div::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.el-dialog__body > div::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.el-dialog__body > div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.el-form {
  margin-right: 10px;
}
.el-tabs {
  margin-right: 10px;
}
.echarts {
  float: left;
  width: 500px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.mix-echarts {
  width: 900px;
  height: 600px;
}
.y_un_m_b {
  margin-bottom: -9px;
}
.presonStyle li a {
  color: rgba(0, 102, 255, 0.6);
  cursor: pointer;
}
.presonStyle {
  clear: both;
}
.presonStyle li {
  float: left;
  list-style: none;
  margin-right: 20px;
}
.divStyle {
  margin: 10px 0;
}
.c_contentBox {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
}
</style>
