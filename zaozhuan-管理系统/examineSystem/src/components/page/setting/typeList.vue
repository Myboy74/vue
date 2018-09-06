<template>
<div>
   <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>任务类型管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<el-row style="margin-bottom:15px;">
  <el-button type="primary" size="small" @click="dialogVisible = true">添加类型</el-button>
  <el-button type="danger" size="small" @click="deleteDesk" :disabled="orgId==0">删除类型</el-button>
</el-row>
<!-- 添加类型弹层 -->
<el-dialog
  title="编辑任务类型"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-input v-model="typeName" placeholder="请输入内容"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="ret">取 消</el-button>
    <el-button type="primary" @click="addType">提 交</el-button>
  </span>
</el-dialog>
<!-- 添加类型弹层 -->
<hr style="border:none;border-bottom:1px solid #ccc;margin:20px 0;">
  <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="任务类型名称"
        width="260">
        <span slot-scope="scope">{{ scope.row.taskTypeName?scope.row.taskTypeName:' ' }}</span>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          type="primary"
          @click="addChild(scope.$index, scope.row)">新增子类型</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>   
</template>

<script>
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
import qs from "qs";
export default {
  data() {
    return {
      typeName:'',
      tableData:[],
      orgId:[],
      dialogVisible: false,
      multipleSelection:[],
      taskTypeId:[],
      taskTypeIdOne:''
    };
  },
  created() {
   this.getdesk();
  },

  methods: {
    //获取科室列表
    getdesk() {
      getAjax("taskType/queryTaskType",{parentId:'0'}).then(res => {
        if (res.data.code == 200) {
         this.tableData=res.data.data;
        }
      });
    },
    //新增科室
    addType(){
      // this.typeName==''
      if(this.typeName==''){
        this.$message.error("任务类型不可为空！");
        return 
      }
      let orgObj={taskTypeId:this.taskTypeIdOne?this.taskTypeIdOne:'',parentId:'0',taskTypeName:this.typeName}
               
        postAjax("taskType/save",orgObj).then(res => {
          if (res.data.code == 200) {
              this.$message.success('编辑任务类型成功！');
                this.dialogVisible = false;
                this.typeName='';
                this.taskTypeIdOne='';
                this.getdesk() ;

          }
      });
     

    },
    addChild(index, row){
      console.log(row)
      this.$router.push({
        name: "childList",
        query: {
        parentId: row.taskTypeId
        }
    });
    },
    ret(){
      this.dialogVisible = false;
       this.typeName='';
      this.taskTypeIdOne='';
    },
    //关闭弹层按钮
          handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.typeName='';
                this.taskTypeIdOne='';
            done();
          })
          .catch(_ => {});
      },
    //选中状态
     handleSelectionChange(val) {
       
        this.multipleSelection = val;
        let _this=this;
        this.orgId=[],
        this.multipleSelection.forEach(res => {
          _this.orgId.push(res.taskTypeId)
        });
console.log(this.orgId)
      },
      //修改
      handleEdit(index, row) {
        this.taskTypeIdOne=row.taskTypeId;
        if(this.taskTypeIdOne){
        getAjax("taskType/getTaskType",{taskTypeId:row.taskTypeId}).then(res => {
        if (res.data.code == 200) {
             this.dialogVisible = true;
            this.typeName=res.data.data.taskTypeName;
            this.getdesk()
            
        }
        // this.typeName=''
      });
        }
      },
      //单条删除
      handleDelete(index, row) {
             this.$confirm('此操作将删除该条数据以及该条数据存在的子数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           getAjax("taskType/delete",{ids:row.taskTypeId}).then(res => {
        if (res.data.code == 200) {
           this.$message.success('删除成功！');
           this.getdesk();
        }
      });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      },
      //多条删除
      deleteDesk(){
             this.$confirm('此操作将删除选中数据以及该条数据存在的子数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getAjax("taskType/delete",{ids:this.orgId.toString()}).then(res => {
        if (res.data.code == 200) {
           this.$message.success(res.data.msg);
           this.getdesk();
        }
      });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         
      }
  }
};
</script>

<style scoped>
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
.label-search {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item-select {
  display: inline-block;
}
</style>
<style>
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
</style>
