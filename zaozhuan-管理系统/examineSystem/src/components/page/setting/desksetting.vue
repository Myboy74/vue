<template>
<div>
  <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>科室管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<el-row style="margin-bottom:15px;">
  <el-button type="primary" size="small" @click="addDesk">添加科室</el-button>
  <el-button type="danger" size="small" @click="deleteDesk"  :disabled="orgId==0">删除科室</el-button>
</el-row>
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
        label="科室"
        width="160">
        <span slot-scope="scope">{{ scope.row.orgName?scope.row.orgName:' ' }}</span>
      </el-table-column>
      <el-table-column
        label="科室负责人"
        width="160">
        <span slot-scope="scope">{{ scope.row.orgPrincipal?scope.row.orgPrincipal:' ' }}</span>
      </el-table-column>
       <el-table-column
        label="联系电话"
        width="160">
        <span slot-scope="scope">{{ scope.row.orgTel?scope.row.orgTel:' ' }}</span>
      </el-table-column>
       <el-table-column
        label="科室排序"
        width="160">
        <span slot-scope="scope">{{ scope.row.orderNum?scope.row.orderNum:' ' }}</span>
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
      tableData:[],
      orgId:[],
    };
  },
  created() {
   this.getdesk();
  },

  methods: {
    //获取科室列表
    getdesk() {
      getAjax("org/queryOrgList").then(res => {
        if (res.data.code == 200) {
         this.tableData=res.data.data;
        }
      });
    },
    //新增科室
    addDesk(){
      this.$router.push({ path:'/addDesk',});
    },
    //选中状态
     handleSelectionChange(val) {
        this.multipleSelection = val;
        let _this=this;
        this.orgId=[],
        this.multipleSelection.forEach(res => {
          _this.orgId.push(res.orgId)
        });
        console.log( this.orgId)
      },

      handleEdit(index, row) {
        this.$router.push({
                    name: "addDesk",
                    query: {
                    orgId: row.orgId
                    }
                });
        console.log(index, row);
      },
      //单条删除
      handleDelete(index, row) {
             this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getAjax("org/delete",{orgIds:row.orgId}).then(res => {
        if (res.data.code == 200) {
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
             this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getAjax("org/delete",{orgIds:this.orgId.toString()}).then(res => {
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
