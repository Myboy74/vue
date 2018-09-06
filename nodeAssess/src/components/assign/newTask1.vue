<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>任务交办</el-breadcrumb-item>
                <el-breadcrumb-item>新建任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                 <el-form-item label="任务分类:">
                    <el-select v-model="form.typeListId" placeholder="请选择" @change="changeTask">
                        <el-option v-for="item in form.taskType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="form.typeListChildId" placeholder="请选择" v-if="form.taskTypeChild.length">
                        <el-option v-for="item in form.taskTypeChild" :key="item.id" :label="item.name"  :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重点工作:" prop="name">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
               <el-form-item label="任务目标:" prop="desc">
                    <el-input type="textarea" v-model="form.desc"  :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                </el-form-item>
                <el-form-item label="责任科室:">
                    <span style="color: #3a8ee6;cursor: pointer;" @click="selectUnits = true">选择下发单位</span>

                </el-form-item>
                <!-- 选择下发单位弹窗 -->
                    <el-dialog
                    title="提示"
                    :visible.sync="selectUnits"
                    width="30%"
                    :before-close="handleClose">
                  <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
                    </el-input>
                      <el-tree
                        empty-text="暂无数据"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :check-strictly="false"
                        highlight-current
                        :load="loadNode"
                        lazy
                        :default-expand-all="true"
                        :props="defaultProps"
                        @node-click="handleNodeClick"
                        @check-change="handleCheckChange"
                        >
                        </el-tree>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="selectUnits = false">取 消</el-button>
                        <el-button type="primary" @click="selectUnits = false">确 定</el-button>
                    </span>
                    </el-dialog>
                <!-- 选择下发单位弹窗 -->
                  <el-form-item label="">
                    <span style="display:inline-block;margin:0 10px;" :key="index" v-for="(item,index) in checkArray">{{item.label}}</span>

                </el-form-item>
                <el-form-item label="是否上报计划:">
                    <el-switch on-text="" off-text="" v-model="form.delivery" @change="delivery"></el-switch>
                </el-form-item>
                  <el-form-item label="" v-show="form.showStartTime">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                 <el-form-item label="任务截至时间:">
                    <el-switch on-text="" off-text="" v-model="form.enddelivery"  @change="enddelivery"></el-switch>
                </el-form-item>
                  <el-form-item label="" v-show="form.showEndTime">
                    <el-col :span="11">
                        <el-date-picker type="datetime" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="考核方式:">
                    <el-select v-model="form.assess" placeholder="请选择考核方式">
                        <el-option label="定性考核" value="1"></el-option>
                        <el-option label="定量考核" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传附件:">
                    <el-upload
                    class="upload-demo"
                    :action="uploadImg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="form.fileList"
                    :onSuccess="uploadSuccess"
                    :onError="uploadError"
                    list-type="picture"
                    :before-upload="beforeAvatarUpload">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">上传模板只能是doc、docx、PPT、pptx、xlsx、xls、pdf、jpg、png、bmp 格式!</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注说明:"  prop="descs">
                    <el-input type="textarea" v-model="form.descs"  :autosize="{ minRows: 6, maxRows: 8}"></el-input>
                </el-form-item>

                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="saveTask" id="save">保存</el-button>
                    <el-button type="primary" @click="addTask" id="save">下发</el-button>
                    <el-button type="danger" @click="returnback">取消</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
import { postA, getA ,uploadImg} from "../../api/api.js";
import qs from "qs";
export default {
  data: function() {
    return {
      selectUnits: false,
      defaultProps: {
        children: "zones",
        label: "label"
      },
      uploadImg:uploadImg(),
      filterText: "",
      typeList: "",
      listArray: [],
      dataArray: [],
      checkArray: [],
      checkedId: [],
      attachmentsId:[],//上传成功获取的附件id
      count: 1,
      form: {
        taskType: [], //任务类型
        taskTypeChild: [], //任务类型
        typeListId: "",
        typeListChildId: "",
        parentList: [],
        name: "",
        assess:'1',
        region: "",
        endTime: "",
        startTime: "",
        delivery: true,
        enddelivery: true,
        type: [""],
        resource: "",
        desc: "",
        showStartTime: true,
        showEndTime: true,
        fileList: [],
      },
        rules: {
    name: [
            { required: true, message: '请输入重点工作', trigger: 'blur' },
            { min: 10, max: 100, message: '长度在 10 到 100 个字符', trigger: 'blur' }
          ],
    desc: [
            { required: true, message: '请输入任务目标', trigger: 'blur' },
            { min: 10, max: 100, message: '长度在 20 到 1000 个字符', trigger: 'blur' }
          ],
    descs: [
            
            { min: 0, max: 1000, message: '长度不得超过 1000 个字符', trigger: 'blur' }
          ],
  },
    }
    
  },

  created() {
    // this.getTaskType();
    this.selectLists();
  },
  //责任单位树搜索
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    //任务主分类改变时
    changeTask() {
      this.getTaskTypeChild();
    },
    // //获取分类
    // getTaskType() {
    //   getA("oa_data_dictionary/query_data_dictionary_list", {
    //     type: "task_type"
    //   }).then(res => {
    //     if (res.data.code == 200) {
    //       this.form.taskType = res.data.data;

    //       if (res.data.data.length) {
    //         this.form.typeListId = res.data.data[0].id;
    //         this.getTaskTypeChild();
    //       }
    //     }
    //   });
    // },
    // //获取子分类
    // getTaskTypeChild() {
    //   getA("oa_data_dictionary/query_data_dictionary_child", {
    //     parentId: this.form.typeListId
    //   }).then(res => {
    //     if (res.data.code == 200) {
    //       this.form.taskTypeChild = res.data.data;
    //       if (res.data.data.length) {
    //         this.form.typeListChildId = res.data.data[0].id;
    //       }
    //     }
    //   });
    // },
    //获取责任单位树
    selectLists() {
      getA("/oa_org/query_org_tree").then(res => {
        if (res.data.code == 200) {
          var _this = this;
          this.listArray = [];
          res.data.data.forEach(function(res) {
        
            _this.listArray.push({ label: res.label, id: res.id,parentId:res.parentId});
          });
          // console.log(this.listArray);
        }
      });
    },
    handleNodeClick(data, Node) {
      if (Node.parent.level === 0) {
        // 不会触发事件
      } else {
        // 关闭选择器
        this.isShowSelect = false;
      }
    },
    //判断第一级栏目
    loadNode(node, resolve) {
      if (node.level === 0) {
        
        return resolve(this.listArray);
      } else {
        this.getChildren(node.data.id, resolve);
      }
    },
    //获取子集栏目
    getChildren(id, resolve,) {
      getA("oa_org/query_org", { parentId: id,organizationType: "D" })
        .then(res => {
          let data = res.data.data; //改成tree需要的格式
          return resolve(data); //解决？
        })
        .catch(err => {
          console.log(err);
        });
    },
    //选择状态下
    handleCheckChange(data, checked, indeterminate) {
      // console.log(this.checkArray)
      this.checkArray = this.$refs.tree.getCheckedNodes();
      var _this = this;
      this.checkedId = [];
      this.checkArray.forEach(function(res,index) {
        if(res.parentId == 999999){
          _this.checkArray.splice(index,1)
          
        }
        _this.checkedId.push(res.id);
      });
      console.log(this.checkArray)
    },
    //附件上传成功的返回值
    uploadSuccess(response, file, fileList){
     this.attachmentsId.push(response.data.id)
    },
    //附件上传失败的返回值
    uploadError(err, file, fileList){

    },
    //上传附件删除
    handleRemove(file, fileList) {
      getA("oa_attachment/delete_attachment", {
        id: file.response.data.id
      }).then(res => {
        var _this = this;
        if (res.data.code == 200) {
          console.log(res);
        } else {
          this.$message.error("服务器错误");
        }
      });
    },
    //新建任务
    addTask() {
      if (this.form.delivery == true) {
        if( this.form.startTime.length == 0){
          this.$message({ type: "warning", message: "请选择任务开始时间!" });
          return false;
        }
        if( this.form.endTime.length == 0){
          this.$message({ type: "warning", message: "请选择任务结束时间!" });
          return false;
        }
        if( this.checkArray.length == 0){
          this.$message({ type: "warning", message: "请选则责任科室!" });
          return false;
        }
        this.form.showStartTime = true;
        this.form.delivery == true

       
          ? (this.form.delivery = 1)
          : (this.form.delivery = 0);
        this.form.enddelivery == true
          ? (this.form.enddelivery = 1)
          : (this.form.enddelivery = 0);
          document.getElementById('save').setAttribute("disabled", "disabled");
          var dataObj=qs.stringify({

          taskTypeId: this.form.typeListChildId!=''?this.form.typeListChildId:this.form.typeListId,
          taskTitle: this.form.name,
          taskTarget: this.form.desc,
          organizations: this.checkedId.toString(),
          reportPlan: this.form.delivery,
          reportTime: this.form.startTime,
          openTaskDeadline: this.form.delivery,
          missionDeadline: this.form.endTime,
          evaluationMode: this.form.assess,
          remark: this.form.descs,
          attachments:this.attachmentsId.toString(),
          taskPlanState: "01"});
          this.aaa=dataObj;
        postA("oa_task/save_task",dataObj)
        .then(res => {
          if (res.data.code == 200) {
            
            this.$message({ type: "success", message: "下发成功!" });
            this.$router.push({ path:'/taskManage',});
          }else{
           this.$message.error('服务器错误');
        }
        });
      } else {
        this.form.showStartTime = false;
        this.form.delivery == true
          ? (this.form.delivery = 1)
          : (this.form.delivery = 0);
        this.form.enddelivery == true
          ? (this.form.enddelivery = 1)
          : (this.form.enddelivery = 0);
          var dataObjs=qs.stringify({
          taskTypeId:this.form.typeListChildId!=''?this.form.typeListChildId:this.form.typeListId,
          taskTitle: this.form.name,
          taskTarget: this.form.desc,
          organizations: this.checkedId.toString(),
          reportPlan: this.form.delivery,
          reportTime: this.form.startTime,
          openTaskDeadline: this.form.delivery,
          missionDeadline: this.form.endTime,
          evaluationMode: this.form.assess,
          remark: this.form.descs,
           attachments:this.attachmentsId.toString(),
          taskPlanState: "04"});
          document.getElementById('save').setAttribute("disabled", "disabled");
        postA("oa_task/save_task", dataObjs).then(res => {
          if (res.data.code == 200) {
              
            this.$message({ type: "success", message: "下发成功!" });
            this.$router.push({ path:'/taskManage',});
          }else{
           this.$message.error('服务器错误');
        }
        });
      }
    },
    saveTask() {
      this.form.delivery == true
        ? (this.form.delivery = 1)
        : (this.form.delivery = 0);
      this.form.enddelivery == true
        ? (this.form.enddelivery = 1)
        : (this.form.enddelivery = 0);
        var data=qs.stringify({
        taskTypeId: this.form.typeListChildId!=''?this.form.typeListChildId:this.form.typeListId,
        taskTitle: this.form.name,
        taskTarget: this.form.desc,
        organizations: this.checkedId.toString(),
        reportPlan: this.form.delivery,
        reportTime: this.form.startTime,
        openTaskDeadline: this.form.delivery,
        missionDeadline: this.form.endTime,
        evaluationMode: this.form.assess,
        remark: this.form.descs,
         attachments:this.attachmentsId.toString(),
        taskPlanState: "00"
        })
        document.getElementById('save').setAttribute("disabled", "disabled");
      postA("oa_task/save_task",data).then(res => {
        if (res.data.code == 200) {
           
          this.$message({ type: "success", message: "保存成功!" });
          this.$router.push({ path:'/taskManage',});
        }else{
           this.$message.error('服务器错误');
        }
      });
    },
    //取消
    returnback(){
            this.$confirm('此操作将取消当前操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消成功'
          });
          this.$router.push({ path:'/taskManage'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '撤销取消'
          });          
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handlePreview(file) {
      console.log(file);
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
